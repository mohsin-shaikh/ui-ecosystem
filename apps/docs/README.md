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
lib/
  utils.ts                 # cn() helper
public/
  registry/*.json          # Generated registry payloads
scripts/
  build-registry.ts        # Registry JSON + docs manifest generator
```

## Scripts

```bash
pnpm --filter docs dev
pnpm --filter docs build:registry
pnpm --filter docs build
```

`build` runs `build:registry` before `next build`, so docs routes and registry files stay in sync.

## Registry Flow

1. Add or update a component in `styles/base-nova/ui`.
2. Run `pnpm --filter docs build:registry`.
3. A matching payload is generated at `public/registry/<component>.json` and the docs
   manifest at `content/components.generated.ts` is regenerated (one docs page + sidebar
   entry per component).
4. Link to that payload from docs pages under `/docs`.
