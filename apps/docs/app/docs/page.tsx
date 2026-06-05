import Link from "next/link";

import { docsSections } from "@/content/docs";

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm font-medium">Documentation</p>
        <h1 className="text-3xl font-bold tracking-tight">Components</h1>
        <p className="text-muted-foreground">
          Install, copy, and adapt UI primitives from the generated registry.
        </p>
      </div>

      <div className="mt-10 space-y-10">
        {docsSections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-4 text-lg font-semibold">{section.title}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {section.items.map((item) => (
                <Link
                  key={item.slug}
                  href={`/docs/${item.slug}`}
                  className="group border-border bg-card text-card-foreground hover:bg-accent/50 rounded-xl border p-5 transition-colors"
                >
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
