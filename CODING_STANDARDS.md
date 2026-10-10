# Coding standards

Judgement calls for review. Anything mechanical is enforced by Oxfmt, Oxlint, TypeScript, Knip or React Doctor instead.

- **Vocabulary**: name things with the terms in `GLOSSARY.md`, and add a term when a new concept appears. A change that goes against an ADR in `docs/adr/` adds a new ADR replacing it.
- **Both builds**: every route works in the SSR build and the SPA build. Server-only code lives in server functions in `src/server/`; code that calls them checks `isSpa` from `#/lib/env` and renders a fallback, like `src/routes/server.tsx`.
- **Hydration**: compute values that differ between server and browser (current time, random IDs, locale formatting) once, in a loader or server function, and pass them down.
- **Data**: define `queryOptions` in `src/queries/`, start the request in the route `loader` with `queryClient.query(options)`, and read it with `useSuspenseQuery(options)`.
- **React**: the React Compiler memoizes, so write plain React. Use `useMemo`, `useCallback` or `memo` only when an external API needs a stable reference, with a comment naming it.
- **UI**: compose UI components with layout classes only. A new look is a new variant in `src/components/ui/`.
- **Workarounds**: link the upstream issue in a comment, so they can be removed later.
- **Tests**: query by role, label or text and assert on what's rendered. A change that behaves differently in the two builds gets a case in `e2e/`.
