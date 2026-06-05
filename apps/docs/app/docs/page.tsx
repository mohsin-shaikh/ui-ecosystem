import Link from "next/link";

import { docsSections } from "@/content/docs";

export default function DocsPage() {
  return (
    <main className="container">
      <p className="eyebrow">Documentation</p>
      <h1 className="heading">Components</h1>
      <p className="subtle">Install, copy, and adapt UI primitives from the generated registry.</p>

      <div className="section-stack">
        {docsSections.map((section) => (
          <section key={section.title}>
            <h2 className="section-heading">{section.title}</h2>
            <div className="docs-grid">
              {section.items.map((item) => (
                <article key={item.slug} className="card">
                  <h3>{item.title}</h3>
                  <p className="subtle">{item.description}</p>
                  <Link className="inline-link" href={`/docs/${item.slug}`}>
                    Read docs →
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
