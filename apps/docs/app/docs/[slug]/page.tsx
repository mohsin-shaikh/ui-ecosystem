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
    <main className="container">
      <Link className="inline-link" href="/docs">
        ← All components
      </Link>
      <p className="eyebrow">Component</p>
      <h1 className="heading">{item.title}</h1>
      <p className="subtle">{item.description}</p>

      <section className="card">
        <h2 className="section-heading">Registry</h2>
        <p className="subtle">
          Fetch this component as JSON from{" "}
          <code className="code-inline">{`/registry/${item.registryName}.json`}</code>.
        </p>
        <a className="inline-link" href={`/registry/${item.registryName}.json`}>
          Open registry payload
        </a>
      </section>

      <section className="card">
        <h2 className="section-heading">Import</h2>
        <pre className="code-block">{item.importExample}</pre>
      </section>

      <section className="card">
        <h2 className="section-heading">Usage</h2>
        <pre className="code-block">{item.usageExample}</pre>
      </section>
    </main>
  );
}
