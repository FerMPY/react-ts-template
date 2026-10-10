# The SPA shell renders routes only after hydration

In the SPA build the root layout is wrapped in `<ClientOnly>`, because hydrating routes against the shell (prerendered once at `/` and served for every URL) throws React error #418 and leaves the wrong nav link active ([TanStack/router#8473](https://github.com/TanStack/router/issues/8473)). Remove the wrapper once that issue is fixed; the `e2e/` tests confirm whether it's still needed.
