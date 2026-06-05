import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

type RegistryItem = {
  name: string;
  type: "registry:component";
  dependencies: string[];
  files: Array<{
    path: string;
    type: "registry:component";
    content: string;
  }>;
};

type DocsItem = {
  slug: string;
  title: string;
  description: string;
  registryName: string;
  importExample: string;
  usageExample: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsRoot = path.resolve(__dirname, "..");
const webRegistryDir = path.join(docsRoot, "styles/base-nova/ui");
const outputDir = path.join(docsRoot, "public/registry");
const contentOutputFile = path.join(docsRoot, "content/components.generated.ts");

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
  await mkdir(outputDir, { recursive: true });

  const entries = await readdir(webRegistryDir, { withFileTypes: true });
  const componentFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx"))
    .map((entry) => entry.name)
    .sort();

  const generatedFiles: string[] = [];
  const docsItems: DocsItem[] = [];

  for (const fileName of componentFiles) {
    const absolutePath = path.join(webRegistryDir, fileName);
    const source = await readFile(absolutePath, "utf8");
    const name = fileName.replace(/\.tsx$/, "");

    const dependencies = inferDependenciesFromImports(source).sort();

    const payload: RegistryItem = {
      name,
      type: "registry:component",
      dependencies,
      files: [
        {
          path: `src/components/ui/${name}.tsx`,
          type: "registry:component",
          content: source,
        },
      ],
    };

    const outputPath = path.join(outputDir, `${name}.json`);
    await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
    generatedFiles.push(path.relative(docsRoot, outputPath));

    docsItems.push(buildDocsItem(name, source));
  }

  await writeContentManifest(docsItems);

  console.log(`Built ${generatedFiles.length} registry component JSON file(s).`);
  console.log(`Generated docs manifest: ${path.relative(docsRoot, contentOutputFile)}`);
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
