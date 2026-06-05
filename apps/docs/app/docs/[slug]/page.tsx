import Link from "next/link";
import { notFound } from "next/navigation";

import { docsItems, getDocsItemBySlug } from "@/content/docs";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return docsItems.map((item) => ({
    slug: item.slug,
  }));
}

export default async function ComponentDocsPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getDocsItemBySlug(slug);

  if (!item) {
    notFound();
  }

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
        <h1 className="text-3xl font-bold tracking-tight">{item.title}</h1>
        <p className="text-muted-foreground">{item.description}</p>
      </div>

      <div className="mt-10 space-y-8">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Registry</h2>
          <p className="text-muted-foreground text-sm">
            Fetch this component as JSON from{" "}
            <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm">
              {`/registry/${item.registryName}.json`}
            </code>
            .
          </p>
          <a
            href={`/registry/${item.registryName}.json`}
            className="text-foreground inline-flex text-sm font-medium underline underline-offset-4"
          >
            Open registry payload
          </a>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Import</h2>
          <pre className="border-border bg-muted/50 overflow-x-auto rounded-lg border p-4 font-mono text-sm">
            {item.importExample}
          </pre>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Usage</h2>
          <pre className="border-border bg-muted/50 overflow-x-auto rounded-lg border p-4 font-mono text-sm">
            {item.usageExample}
          </pre>
        </section>
      </div>
    </div>
  );
}
