import Link from "next/link";

import { docsSections } from "@/content/docs";

const componentCount = docsSections.reduce((count, section) => count + section.items.length, 0);

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="flex max-w-3xl flex-col items-start gap-4">
        <span className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
          ui-ecosystem
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          Build your UI from reusable building blocks.
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg text-balance">
          A docs workspace inspired by shadcn&apos;s monorepo setup with content pages plus a
          generated component registry.
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Link
            href="/docs"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-5 text-sm font-medium transition-colors"
          >
            Browse docs
          </Link>
          <a
            href="/registry/button.json"
            className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-5 text-sm font-medium transition-colors"
          >
            Open registry JSON
          </a>
        </div>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:max-w-3xl">
        <article className="border-border bg-card text-card-foreground rounded-xl border p-5">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            Components
          </p>
          <p className="mt-1 text-2xl font-bold">{componentCount}</p>
          <p className="text-muted-foreground mt-1 text-sm">
            Published as <code className="font-mono">registry:component</code> JSON payloads.
          </p>
        </article>
        <article className="border-border bg-card text-card-foreground rounded-xl border p-5">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            Docs routes
          </p>
          <p className="mt-1 text-2xl font-bold">/docs/*</p>
          <p className="text-muted-foreground mt-1 text-sm">
            Each component has a dedicated, linkable docs page.
          </p>
        </article>
      </div>
    </main>
  );
}
