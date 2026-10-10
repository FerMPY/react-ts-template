# One codebase for both build targets

The template ships as an SSR build and an SPA build from the same code, using TanStack Start with its SPA mode switched on by `vite build --mode spa`, instead of maintaining two templates. One codebase keeps routes, data loading and UI identical across targets, at the cost of every change having to work in both (see `CODING_STANDARDS.md`).

## Considered Options

- **Two templates (a Vite SPA and a Start app)**: rejected, because they would drift apart and double the maintenance.
- **SSR only, with static prerendering for GitHub Pages**: rejected for now. Nitro's `github-pages` preset produced empty files under a base path, and prerendering pages next to the shell collides at `/`.

## Consequences

- Start reloads `vite.config.ts` without `--mode` when it prerenders the shell, so the config copies the flag into `process.env.SPA`.
- In the SPA build, deep links are served from `404.html`, so they work in the browser but return HTTP 404.
