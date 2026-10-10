# The SPA shell renders routes only after hydration

In the SPA build the root layout (header and routes) is wrapped in `<ClientOnly>`, so the shell renders it only in the browser. The shell is prerendered once at `/` and served for every URL, so hydrating route content against it throws React error #418 ([TanStack/router#8473](https://github.com/TanStack/router/issues/8473)) and leaves `/`'s nav link marked active on deep links.

## Consequences

- The SPA build shows an empty page until JavaScript loads. The SSR build is unaffected.
- The browser tests in `e2e/` fail if the wrapper is removed while the bug exists. Revisit once #8473 is fixed.
