# Docs Workspace

This app hosts the Zuupee UI documentation website and the component registry JSON files.

## Structure

```txt
app/
  page.tsx                 # Landing page
  docs/page.tsx            # Docs index
  docs/[slug]/page.tsx     # Component docs pages
src/
content/
  docs.ts                  # Docs metadata and route source
registry/
  web/*.tsx                # Registry component source files
lib/
  utils.ts                 # Shared utility helpers
public/
  registry/*.json          # Generated registry payloads
scripts/
  build-registry.ts        # Registry JSON generator
```

## Scripts

```bash
pnpm --filter docs dev
pnpm --filter docs build:registry
pnpm --filter docs build
```

`build` runs `build:registry` before `next build`, so docs routes and registry files stay in sync.

## Registry Flow

1. Add or update a component in `registry/web`.
2. Run `pnpm --filter docs build:registry`.
3. A matching payload is generated at `public/registry/<component>.json`.
4. Link to that payload from docs pages under `/docs`.
