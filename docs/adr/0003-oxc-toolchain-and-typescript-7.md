# Oxc toolchain and TypeScript 7 instead of ESLint and Prettier

Linting runs on Oxlint (type-aware through `oxlint-tsgolint`) and formatting on Oxfmt, with `@shadcn/lint` and the TanStack ESLint plugins loaded as Oxlint JS plugins. Type checking uses TypeScript 7, the native compiler. Both are much faster, and TypeScript 7 has no JavaScript API yet, so typescript-eslint and other tools built on that API can't run anyway.

## Consequences

- Oxlint's JS plugins are alpha. Plugin rules that need type information (like `@tanstack/query/no-void-query-fn`) don't work under them.
- Adding a tool that needs the TypeScript API means installing TypeScript 6 next to it (`npm:@typescript/typescript6`).
