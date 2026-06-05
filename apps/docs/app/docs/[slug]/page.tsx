import { readFile } from "node:fs/promises";
import path from "node:path";

import type { MDXComponents } from "mdx/types";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";

import { docsItems, getDocsItemBySlug } from "@/content/docs";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type Frontmatter = {
  title?: string;
  description?: string;
};

const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-10 mb-4 text-xl font-semibold tracking-tight" {...props} />,
  h3: (props) => <h3 className="mt-8 mb-3 text-lg font-semibold tracking-tight" {...props} />,
  p: (props) => <p className="text-muted-foreground mb-4 leading-7" {...props} />,
  ul: (props) => <ul className="text-muted-foreground mb-4 ml-6 list-disc space-y-1" {...props} />,
  ol: (props) => (
    <ol className="text-muted-foreground mb-4 ml-6 list-decimal space-y-1" {...props} />
  ),
  a: (props) => (
    <a className="text-foreground font-medium underline underline-offset-4" {...props} />
  ),
  pre: (props) => (
    <pre
      className="border-border bg-muted/50 mb-4 overflow-x-auto rounded-lg border p-4 font-mono text-sm [&_code]:bg-transparent [&_code]:p-0"
      {...props}
    />
  ),
  code: (props) => <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm" {...props} />,
  table: (props) => (
    <div className="mb-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="border-border border px-3 py-2 text-left font-semibold" {...props} />
  ),
  td: (props) => <td className="border-border border px-3 py-2 align-top" {...props} />,
};

export function generateStaticParams() {
  return docsItems.map((item) => ({
    slug: item.slug,
  }));
}

async function readDoc(slug: string) {
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return null;
  }

  const filePath = path.join(process.cwd(), "content/docs/components/base", `${slug}.mdx`);
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

export default async function ComponentDocsPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getDocsItemBySlug(slug);
  const source = await readDoc(slug);

  if (!item || !source) {
    notFound();
  }

  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source,
    options: { parseFrontmatter: true },
    components: mdxComponents,
  });

  const title = frontmatter.title ?? item.title;
  const description = frontmatter.description ?? item.description;

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/docs"
        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
      >
        ← All components
      </Link>

      <div className="mt-4 space-y-2">
        <p className="text-muted-foreground text-sm font-medium">Component</p>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <article className="mt-8">{content}</article>
    </div>
  );
}
