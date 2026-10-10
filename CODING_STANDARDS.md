# Coding standards

Judgement calls for writing and reviewing changes. Anything a tool can check lives in that tool instead: formatting (Oxfmt), lint and design-system rules (Oxlint with `@shadcn/lint`), types (TypeScript), unused code (Knip) and React anti-patterns (React Doctor). When a rule here turns out to be mechanical, move it into one of those tools.

## Language

- Name variables, functions, files, tests, commits and PRs with the terms in `GLOSSARY.md`. When a concept has no term yet, add one to the glossary in the same change.
- A change that goes against an ADR in `docs/adr/` says so in the PR and adds a new ADR that supersedes it.

## Both build targets

- Every route works in the SSR build and the SPA build. Server-only code lives in server functions in `src/server/`. Code that needs them checks `isSpa` from `#/lib/env` and renders a fallback in the SPA build, like `src/routes/server.tsx`.
- Render the same output on the server and in the browser. Compute values like the current time, random IDs and locale-formatted text once (in a loader or a server function) and pass them down, so hydration matches.

## Data

- Server state goes through TanStack Query: define `queryOptions` in `src/queries/`, start the request in the route `loader` with `queryClient.query(options)`, and read it in the component with `useSuspenseQuery(options)`.
- Keep state next to the component that uses it, and derive values during render instead of copying them into state.

## React

- The React Compiler memoizes components and hooks, so write plain React. Use `useMemo`, `useCallback` or `memo` only where an external API needs a stable reference, with a comment naming it.
- Workarounds for upstream bugs link the upstream issue in a comment, so they can be removed once it's fixed.

## UI

- Pages compose UI components and add only layout classes to them. When a design needs a new look, add a variant to the component in `src/components/ui/` and use that.
- Each page has one `h1`, headings follow in order, and every interactive element has a visible label or an `aria-label`.

## Tests

- Test behavior the way a user sees it: query by role, label or text, and assert on what's rendered. Components that use the router render through `renderWithRouter`.
- Unit tests sit next to the code as `*.test.tsx`. A change that behaves differently in the two build targets gets a case in `e2e/`.

## Dependencies

- Use what the stack already has (TanStack, shadcn/ui, Base UI, web platform APIs) before adding a package. When you add one, say why in the PR.
