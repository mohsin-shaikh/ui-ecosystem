# Docs Workspace

This app hosts the ui-ecosystem documentation website and the component registry JSON files.

## Structure

```txt
app/
  layout.tsx               # App shell: site header + theme provider
  theme-provider.tsx       # next-themes provider
  mode-toggle.tsx          # Light/dark toggle
  page.tsx                 # Landing page
  docs/layout.tsx          # Docs shell with sidebar
  docs/page.tsx            # Docs index
  docs/[slug]/page.tsx     # Component docs pages
styles/
  base-nova/ui/*.tsx       # shadcn base-nova components (Base UI primitives)
  style-nova.css           # Nova style layer (.cn-* utilities)
hooks/
  use-mobile.ts            # Shared hooks used by components
content/
  docs.ts                  # Docs types + helpers
  components.generated.ts  # AUTO-GENERATED docs manifest (do not edit)
  docs/components/base/    # MDX docs, one per component (rendered at /docs/<slug>)
lib/
  utils.ts                 # cn() helper
components.json            # shadcn config (style, aliases) for the registry
registry.json              # AUTO-GENERATED registry index (shadcn schema)
public/
  r/*.json                 # Built registry payloads (gitignored; `shadcn build` output)
scripts/
  build-registry.ts        # registry.json + docs manifest + MDX generator
```

## Scripts

```bash
pnpm --filter docs dev
pnpm --filter docs registry:gen     # generate registry.json, docs manifest, baseline MDX
pnpm --filter docs registry:build   # shadcn build -> public/r/*.json
pnpm --filter docs build            # registry:gen + registry:build + next build
```

## Registry (`ui-ecosystem`)

This app publishes a shadcn-compatible registry named **ui-ecosystem**. Components are
distributed as code via the shadcn CLI, not as an npm package.

1. Add or update a component in `styles/base-nova/ui`.
2. Run `pnpm --filter docs registry:gen`. This regenerates:
   - `registry.json` — the registry index (one item per component, with `dependencies`
     and cross-component `registryDependencies` inferred from imports, plus a `use-mobile`
     hook item).
   - `content/components.generated.ts` — the docs sidebar/manifest.
   - `content/docs/components/base/<component>.mdx` — a baseline MDX doc if missing
     (existing files are never overwritten, so manual edits are safe).
3. Run `pnpm --filter docs registry:build` (`shadcn build`) to emit spec-compliant payloads
   at `public/r/<component>.json`.
4. Consumers install a component with:

   ```bash
   npx shadcn@latest add https://ui-ecosystem.dev/r/<component>.json
   ```

Update `name`/`homepage` in `scripts/build-registry.ts` to your real registry host.
