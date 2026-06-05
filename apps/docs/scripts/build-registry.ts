import { access, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

type RegistryFile = {
  path: string;
  type: string;
};

type RegistryEntry = {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
};

type DocsItem = {
  slug: string;
  title: string;
  description: string;
  registryName: string;
  importExample: string;
  usageExample: string;
};

const REGISTRY_NAME = "ui-ecosystem";
const REGISTRY_HOMEPAGE = "https://ui-ecosystem.dev";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsRoot = path.resolve(__dirname, "..");
const componentsDir = path.join(docsRoot, "styles/base-nova/ui");
const registryFile = path.join(docsRoot, "registry.json");
const contentOutputFile = path.join(docsRoot, "content/components.generated.ts");
const mdxDir = path.join(docsRoot, "content/docs/components/base");

const dependencyAllowList = new Set([
  "@base-ui/react",
  "class-variance-authority",
  "lucide-react",
  "clsx",
  "tailwind-merge",
  "tw-animate-css",
  "recharts",
  "vaul",
  "cmdk",
  "input-otp",
  "react-resizable-panels",
  "sonner",
  "embla-carousel-react",
  "react-day-picker",
  "next-themes",
  "react",
  "react-dom",
]);

async function main() {
  await mkdir(mdxDir, { recursive: true });

  const entries = await readdir(componentsDir, { withFileTypes: true });
  const componentFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx"))
    .map((entry) => entry.name)
    .sort();

  const items: RegistryEntry[] = [];
  const docsItems: DocsItem[] = [];
  let createdDocs = 0;

  for (const fileName of componentFiles) {
    const absolutePath = path.join(componentsDir, fileName);
    const source = await readFile(absolutePath, "utf8");
    const name = fileName.replace(/\.tsx$/, "");

    const dependencies = inferDependenciesFromImports(source).sort();
    const registryDependencies = inferRegistryDependencies(source, name);
    const docsItem = buildDocsItem(name, source);
    docsItems.push(docsItem);

    items.push({
      name,
      type: "registry:ui",
      title: docsItem.title,
      description: docsItem.description,
      ...(dependencies.length > 0 ? { dependencies } : {}),
      ...(registryDependencies.length > 0 ? { registryDependencies } : {}),
      files: [
        {
          path: `styles/base-nova/ui/${name}.tsx`,
          type: "registry:ui",
        },
      ],
    });

    if (await writeComponentDoc(docsItem, dependencies)) {
      createdDocs += 1;
    }
  }

  items.push({
    name: "use-mobile",
    type: "registry:hook",
    title: "Use Mobile",
    description: "Hook that tracks whether the viewport is at a mobile breakpoint.",
    files: [
      {
        path: "hooks/use-mobile.ts",
        type: "registry:hook",
      },
    ],
  });

  await writeRegistry(items);
  await writeContentManifest(docsItems);

  console.log(`Wrote ${path.relative(docsRoot, registryFile)} with ${items.length} item(s).`);
  console.log(`Generated docs manifest: ${path.relative(docsRoot, contentOutputFile)}`);
  console.log(`Created ${createdDocs} new MDX doc(s) in ${path.relative(docsRoot, mdxDir)}.`);
  console.log(`Next: run \`pnpm registry:build\` (shadcn build) to emit public/r/*.json.`);
}

async function writeRegistry(items: RegistryEntry[]) {
  const registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: REGISTRY_NAME,
    homepage: REGISTRY_HOMEPAGE,
    items,
  };

  await writeFile(registryFile, `${JSON.stringify(registry, null, 2)}\n`, "utf8");
}

async function writeComponentDoc(item: DocsItem, dependencies: string[]): Promise<boolean> {
  const filePath = path.join(mdxDir, `${item.slug}.mdx`);

  const exists = await access(filePath)
    .then(() => true)
    .catch(() => false);
  if (exists) {
    return false;
  }

  const dependencyLine =
    dependencies.length > 0
      ? dependencies.map((dependency) => `\`${dependency}\``).join(", ")
      : "No external dependencies.";

  const content = `---
title: ${item.title}
description: ${item.description}
component: true
base: base
---

## Installation

\`\`\`bash
npx shadcn@latest add ${REGISTRY_HOMEPAGE}/r/${item.registryName}.json
\`\`\`

The component source is published as a registry payload at
\`/r/${item.registryName}.json\`.

## Usage

\`\`\`tsx
${item.importExample}
\`\`\`

\`\`\`tsx
${item.usageExample}
\`\`\`

## Dependencies

${dependencyLine}
`;

  await writeFile(filePath, content, "utf8");
  return true;
}

function buildDocsItem(name: string, source: string): DocsItem {
  const title = toTitleCase(name);
  const exports = parseExports(source);
  const componentExports = exports.filter((value) => /^[A-Z]/.test(value));
  const primary =
    componentExports.find((value) => value === toPascalCase(name)) ?? componentExports[0] ?? title;

  const importNames = exports.length > 0 ? exports.join(", ") : primary;
  const importExample = `import { ${importNames} } from "@/components/ui/${name}";`;
  const usageExample = `<${primary} />`;

  return {
    slug: name,
    title,
    description: `${title} component built on Base UI primitives.`,
    registryName: name,
    importExample,
    usageExample,
  };
}

function parseExports(source: string): string[] {
  const names = new Set<string>();

  for (const match of source.matchAll(/export\s*\{([^}]*)\}/g)) {
    const block = match[1];
    if (!block) {
      continue;
    }
    for (const token of block.split(",")) {
      const cleaned = token.trim().replace(/^type\s+/, "");
      if (!cleaned) {
        continue;
      }
      const parts = cleaned.split(/\s+as\s+/);
      const exported = (parts[1] ?? parts[0] ?? "").trim();
      if (/^[A-Za-z_]\w*$/.test(exported)) {
        names.add(exported);
      }
    }
  }

  for (const match of source.matchAll(/export\s+(?:async\s+)?function\s+([A-Za-z_]\w*)/g)) {
    if (match[1]) {
      names.add(match[1]);
    }
  }

  for (const match of source.matchAll(/export\s+const\s+([A-Za-z_]\w*)/g)) {
    if (match[1]) {
      names.add(match[1]);
    }
  }

  return [...names];
}

function inferDependenciesFromImports(source: string): string[] {
  const matches = source.matchAll(/from\s+["']([^"']+)["']/g);
  const dependencies: string[] = [];

  for (const match of matches) {
    const specifier = match[1];
    if (!specifier || specifier.startsWith(".") || specifier.startsWith("@/")) {
      continue;
    }

    const packageName = normalizePackageName(specifier);
    if (dependencyAllowList.has(packageName)) {
      dependencies.push(packageName);
    }
  }

  return unique(dependencies);
}

function inferRegistryDependencies(source: string, self: string): string[] {
  const deps = new Set<string>();

  for (const match of source.matchAll(/from\s+["']@\/styles\/base-nova\/ui\/([a-z0-9-]+)["']/g)) {
    if (match[1] && match[1] !== self) {
      deps.add(match[1]);
    }
  }

  if (/from\s+["']@\/hooks\/use-mobile["']/.test(source)) {
    deps.add("use-mobile");
  }

  return [...deps].sort();
}

function normalizePackageName(specifier: string): string {
  if (specifier.startsWith("@base-ui/react/")) {
    return "@base-ui/react";
  }

  if (specifier.startsWith("@")) {
    const [scope, pkg] = specifier.split("/");
    return pkg ? `${scope}/${pkg}` : specifier;
  }

  const [pkg] = specifier.split("/");
  return pkg ?? specifier;
}

async function writeContentManifest(items: DocsItem[]) {
  const header =
    "// AUTO-GENERATED by scripts/build-registry.ts. Do not edit by hand.\n" +
    'import type { DocsSection } from "./docs";\n\n';

  const body =
    `export const generatedDocsSections: DocsSection[] = [\n` +
    `  {\n` +
    `    title: "Components",\n` +
    `    items: ${JSON.stringify(items, null, 6).replace(/\n/g, "\n    ")},\n` +
    `  },\n` +
    `];\n`;

  await writeFile(contentOutputFile, header + body, "utf8");
}

function toTitleCase(value: string): string {
  return value
    .split("-")
    .map((part) => (part ? part[0]!.toUpperCase() + part.slice(1) : part))
    .join(" ");
}

function toPascalCase(value: string): string {
  return value
    .split("-")
    .map((part) => (part ? part[0]!.toUpperCase() + part.slice(1) : part))
    .join("");
}

function unique<T>(values: T[]): T[] {
  return [...new Set(values)];
}

main().catch((error: unknown) => {
  console.error("Failed to build registry.", error);
  process.exit(1);
});
