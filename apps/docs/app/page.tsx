import Link from "next/link";

import { docsSections } from "@/content/docs";

const componentCount = docsSections.reduce((count, section) => count + section.items.length, 0);

export default function Home() {
  return (
    <main className="container">
      <p className="eyebrow">Zuupee UI</p>
      <h1 className="heading">Build your UI from reusable building blocks.</h1>
      <p className="subtle">
        A docs workspace inspired by shadcn&apos;s monorepo setup with content pages plus a generated
        component registry.
      </p>
      <div className="hero-actions">
        <Link className="button-link primary" href="/docs">
          Browse docs
        </Link>
        <a className="button-link" href="/registry/button.json">
          Open registry JSON
        </a>
      </div>
      <div className="stats-grid">
        <article className="card">
          <p className="card-kicker">Components</p>
          <p className="card-value">{componentCount}</p>
          <p className="subtle">Published as `registry:component` JSON payloads.</p>
        </article>
        <article className="card">
          <p className="card-kicker">Docs routes</p>
          <p className="card-value">/docs/*</p>
          <p className="subtle">Each component has a dedicated, linkable docs page.</p>
        </article>
      </div>
    </main>
  );
}
