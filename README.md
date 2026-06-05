# ui-ecosystem

A monorepo for shared UI components and applications, powered by Turborepo and pnpm.

## Structure

```
ui-ecosystem/
├── apps/
│   ├── docs/          # Next.js documentation site with shadcn/ui registry
│   └── mobile/        # Expo React Native app
├── packages/
│   ├── ui-web/        # Shared React web components
│   ├── eslint-config/ # Shared ESLint configurations
│   └── typescript-config/ # Shared TypeScript configurations
├── package.json       # Root package with workspace scripts
├── pnpm-workspace.yaml
└── turbo.json
```

## Apps

| App | Description | Tech Stack |
|-----|-------------|------------|
| `docs` | Component documentation & registry | Next.js 16, React 19, Tailwind CSS 4, shadcn |
| `mobile` | Mobile application | Expo ~56, React Native 0.85 |

## Packages

| Package | Description |
|---------|-------------|
| `@repo/ui-web` | Shared React components for web |
| `@repo/eslint-config` | Shared ESLint configurations |
| `@repo/typescript-config` | Shared TypeScript configurations |

## Getting Started

```bash
# Install dependencies
pnpm install

# Run all dev servers
pnpm dev

# Build all packages and apps
pnpm build

# Run linting
pnpm lint

# Check types
pnpm check-types
```

## Tech Stack

- **Package Manager**: pnpm 9
- **Build System**: Turborepo
- **Web**: Next.js 16, React 19, Tailwind CSS 4
- **Mobile**: Expo ~56, React Native 0.85
- **Linting**: oxlint, oxfmt
- **TypeScript**: 5.9.2
