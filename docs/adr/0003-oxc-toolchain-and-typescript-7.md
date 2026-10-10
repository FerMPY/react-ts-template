# Oxc toolchain and TypeScript 7 instead of ESLint and Prettier

Linting runs on Oxlint (type-aware, with `@shadcn/lint` and the TanStack plugins as JS plugins), formatting on Oxfmt and type checking on TypeScript 7, because they are much faster. TypeScript 7 has no JavaScript API yet, so tools built on it, like typescript-eslint, need TypeScript 6 installed next to them.
