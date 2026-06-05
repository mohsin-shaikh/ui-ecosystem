import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

type RegistryMetadata = {
  name: string;
  dependencies: string[];
};

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsRoot = path.resolve(__dirname, "..");
const webRegistryDir = path.join(docsRoot, "registry/web");
const outputDir = path.join(docsRoot, "public/registry");

const dependencyAllowList = new Set([
  "@base-ui/react",
  "lucide-react",
  "clsx",
  "tailwind-merge",
  "react",
  "react-dom",
]);

const defaultDependencyMap: Record<string, string[]> = {
  button: ["@base-ui/react"],
  dialog: ["@base-ui/react"],
  "dropdown-menu": ["@base-ui/react"],
  input: ["@base-ui/react"],
};

async function main() {
  await mkdir(outputDir, { recursive: true });

  const entries = await readdir(webRegistryDir, { withFileTypes: true });
  const componentFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx"))
    .map((entry) => entry.name)
    .sort();

  const generatedFiles: string[] = [];

  for (const fileName of componentFiles) {
    const absolutePath = path.join(webRegistryDir, fileName);
    const source = await readFile(absolutePath, "utf8");
    const fileStem = fileName.replace(/\.tsx$/, "");

    const metadata = parseRegistryMetadata(source) ?? {
      name: fileStem,
      dependencies: [],
    };

    const importDependencies = inferDependenciesFromImports(source);
    const fileDefaults = defaultDependencyMap[fileStem] ?? [];

    const dependencies = unique([
      ...metadata.dependencies,
      ...importDependencies,
      ...fileDefaults,
    ]).sort();

    const payload: RegistryItem = {
      name: metadata.name,
      type: "registry:component",
      dependencies,
      files: [
        {
          path: `src/components/${metadata.name}.tsx`,
          type: "registry:component",
          content: source,
        },
      ],
    };

    const outputPath = path.join(outputDir, `${metadata.name}.json`);
    await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
    generatedFiles.push(path.relative(docsRoot, outputPath));
  }

  console.log(`Built ${generatedFiles.length} registry component JSON file(s).`);
  for (const generatedFile of generatedFiles) {
    console.log(`- ${generatedFile}`);
  }
}

function parseRegistryMetadata(source: string): RegistryMetadata | null {
  const blockMatch = source.match(/\/\*\s*@registry([\s\S]*?)\*\//);
  if (!blockMatch) {
    return null;
  }

  const block = blockMatch[1];
  if (!block) {
    return null;
  }
  const nameMatch = block.match(/name:\s*([^\n\r]+)/);
  const dependenciesMatch = block.match(/dependencies:\s*([^\n\r]+)/);

  const name = nameMatch?.[1]?.trim();
  if (!name) {
    return null;
  }

  const dependencies = dependenciesMatch?.[1]
    ? dependenciesMatch[1]
        .split(",")
        .map((token) => token.trim())
        .filter(Boolean)
    : [];

  return { name, dependencies };
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

function unique<T>(values: T[]): T[] {
  return [...new Set(values)];
}

main().catch((error: unknown) => {
  console.error("Failed to build registry.", error);
  process.exit(1);
});
