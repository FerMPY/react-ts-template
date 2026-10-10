# React TS Template

> A cutting-edge React template that ships as a **static SPA** or an **SSR server** from the same codebase.

[![CI](https://github.com/FerMPY/react-ts-template/actions/workflows/ci.yml/badge.svg)](https://github.com/FerMPY/react-ts-template/actions/workflows/ci.yml)

[Live SPA demo](https://fermpy.github.io/react-ts-template/)

## ✨ What's inside

| Area          | Tools                                                                                                                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Framework     | [React 19](https://react.dev/) + [React Compiler](https://react.dev/learn/react-compiler), [TanStack Start](https://tanstack.com/start) (Router + SSR)                                                       |
| Data          | [TanStack Query](https://tanstack.com/query), wired into route loaders and SSR hydration                                                                                                                     |
| Build         | [Vite 8](https://vite.dev/) (Rolldown), [Nitro](https://nitro.build/) for the server build                                                                                                                   |
| Language      | [TypeScript 7](https://www.typescriptlang.org/) (native compiler)                                                                                                                                            |
| UI            | [Tailwind CSS 4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) on [Base UI](https://base-ui.com/), [Lucide](https://lucide.dev/) icons                                                      |
| Lint & format | [Oxlint](https://oxc.rs/docs/guide/usage/linter) (type-aware) + [Oxfmt](https://oxc.rs/docs/guide/usage/formatter), [@shadcn/lint](https://github.com/shadcn-ui/lint), [React Doctor](https://react.doctor/) |
| Tests         | [Vitest 5](https://vitest.dev/), [Testing Library](https://testing-library.com/), jsdom                                                                                                                      |
| Tooling       | [pnpm](https://pnpm.io/), Husky + lint-staged, GitHub Actions, Dependabot                                                                                                                                    |

## ⚠️ Disclaimer

This template is meant to stay on the latest versions of everything, which means:

- It may not suit every workflow, since tools get swapped as better ones appear.
- Some pieces are still young: Oxlint's JS plugins (used for `@shadcn/lint` and the TanStack rules) are in alpha, and Nitro v3 is in beta.
- Every update is tested before landing here, but check the [known issues](#-known-issues) section.

## 🚀 Getting started

You need **Node.js 24** (see `.node-version`) and **pnpm** (`corepack enable` picks the version pinned in `package.json`).

Use GitHub's **Use this template** button, or clone it and let the setup script rename the project and reset the git history:

```bash
git clone https://github.com/FerMPY/react-ts-template.git my-app
cd my-app
pnpm install
node scripts/setup.ts   # optional: rename the package and start a fresh git history
pnpm dev                # http://localhost:3000
```

## 🔀 SPA or server

TanStack Start renders on the server by default. Run the same app as a pure client-side SPA with the `spa` mode:

|                  | SSR server (default)                                            | Static SPA                                   |
| ---------------- | --------------------------------------------------------------- | -------------------------------------------- |
| Dev              | `pnpm dev`                                                      | `pnpm dev:spa`                               |
| Build            | `pnpm build` → `.output/`                                       | `pnpm build:spa` → `dist/client/`            |
| Run / deploy     | `pnpm start`, or any [Nitro preset](https://nitro.build/deploy) | Any static host (GitHub Pages, S3, Netlify…) |
| Route loaders    | Server on first load, then client                               | Always in the browser                        |
| Server functions | ✅                                                              | ❌ (no server)                               |

- **Deploy the server** anywhere Nitro supports: `NITRO_PRESET=vercel pnpm build` (or `netlify`, `cloudflare`, `bun`, …). The default `node` preset runs with `pnpm start`.
- **Deploy the SPA** under a sub-path by setting `BASE_PATH`, e.g. `BASE_PATH=/my-repo/ pnpm build:spa`. The build writes `index.html` plus a `404.html` copy so static hosts fall back to the app for client-side routes.
- The included [`deploy-pages.yml`](.github/workflows/deploy-pages.yml) workflow publishes the SPA to GitHub Pages on every push to `main`. Enable it under **Settings → Pages → Source: GitHub Actions**.

## 📜 Scripts

| Command           | Description                                            |
| ----------------- | ------------------------------------------------------ |
| `pnpm dev`        | Start the dev server (SSR)                             |
| `pnpm dev:spa`    | Start the dev server in SPA mode                       |
| `pnpm build`      | Build the SSR server with Nitro                        |
| `pnpm build:spa`  | Build the static SPA                                   |
| `pnpm start`      | Run the SSR build                                      |
| `pnpm preview`    | Preview the SSR build (`pnpm preview:spa` for the SPA) |
| `pnpm test`       | Run tests once (`pnpm test:watch` to watch)            |
| `pnpm check`      | Format check + lint + typecheck, the same as CI        |
| `pnpm lint`       | Lint with Oxlint (`pnpm lint:fix` to auto-fix)         |
| `pnpm lint:react` | Scan for React issues with React Doctor                |
| `pnpm format`     | Format with Oxfmt (`pnpm format:check` to only check)  |
| `pnpm typecheck`  | Type-check with TypeScript 7                           |

## 🗂️ Project structure

```
.
├── .github/                # CI, GitHub Pages deploy, React Doctor, Dependabot
├── public/                 # Static files, served from BASE_PATH
├── scripts/setup.ts        # Turns a clone into your own project
├── src/
│   ├── components/
│   │   └── ui/             # shadcn/ui components (yours to edit)
│   ├── lib/utils.ts        # cn() class merging
│   ├── queries/            # TanStack Query options
│   ├── routes/             # File-based routes (__root.tsx is the HTML shell)
│   ├── test/               # Test setup and helpers
│   ├── router.tsx          # Router + QueryClient setup
│   ├── routeTree.gen.ts    # Generated by TanStack Router, don't edit
│   └── styles.css          # Tailwind + shadcn theme tokens
├── AGENTS.md               # Instructions for coding agents
├── components.json         # shadcn/ui config
├── doctor.config.ts        # React Doctor config
├── oxfmt.config.ts         # Formatter config
├── oxlint.config.ts        # Linter config
├── vite.config.ts          # Vite + Start + Nitro (SSR and SPA modes)
└── vitest.config.ts        # Test config
```

Import app code with the `#/` alias (`import { Button } from "#/components/ui/button"`). It's a standard [package.json `imports`](https://nodejs.org/api/packages.html#subpath-imports) entry, so Vite, Vitest and Node resolve it without plugins.

## 🧹 Linting and formatting

Everything runs on the [Oxc](https://oxc.rs/) toolchain, which is much faster than ESLint + Prettier:

- **Oxlint** with type-aware rules (via `oxlint-tsgolint`), React, React Compiler, jsx-a11y, import and Vitest rules. See [`oxlint.config.ts`](oxlint.config.ts).
- **[@shadcn/lint](https://github.com/shadcn-ui/lint)** keeps the design system consistent: it stops raw palette colors, arbitrary values and restyling of shadcn components, and its errors suggest the right variant, size or token. That makes it especially useful when coding agents write UI.
- **TanStack Query and Router** ESLint plugins run inside Oxlint as JS plugins.
- **Oxfmt** formats code with Prettier-compatible output, and also sorts imports, Tailwind classes and `package.json`.
- **React Doctor** checks for React anti-patterns, accessibility and security issues (`pnpm lint:react`), and comments on every PR through its GitHub Action.

A pre-commit hook (Husky + lint-staged) fixes and formats staged files. In VS Code, install the recommended extensions (Oxc, TypeScript 7 and Tailwind CSS IntelliSense) to get format-on-save and inline lint errors.

## 🧪 Testing

Vitest runs with jsdom and Testing Library. Test files sit next to the code as `*.test.tsx`.

`renderWithRouter` renders a component inside an in-memory TanStack Router, so `<Link>` and router hooks work. Add `withQueryClient` for components that use TanStack Query:

```tsx
import { screen } from "@testing-library/react";

import { renderWithRouter } from "#/test/render-with-router";

import { Counter } from "./counter";

it("increments", async () => {
  const { user } = await renderWithRouter(Counter, { withQueryClient: true });

  await user.click(screen.getByRole("button"));

  expect(screen.getByRole("button")).toHaveTextContent("1");
});
```

## 🤖 Working with coding agents

- [`AGENTS.md`](AGENTS.md) explains the commands and conventions to agents (`CLAUDE.md` imports it).
- `@shadcn/lint` and React Doctor are built for agents: they explain how to fix each problem, so agents can correct their own UI and React code by running `pnpm check` and `pnpm lint:react`.
- Optionally add React Doctor's agent skill with `pnpm dlx react-doctor@latest install`. It also adds a `doctor` script, which collides with pnpm's built-in `pnpm doctor`; use `pnpm lint:react` instead.

## 🐛 Known issues

- **SPA hydration**: in SPA mode, the root layout renders only after hydration to work around [TanStack/router#8473](https://github.com/TanStack/router/issues/8473). Remove the `ClientOnly` wrapper in `src/routes/__root.tsx` once it's fixed.
- **GitHub Pages deep links** are served from `404.html`, so they work in the browser but return HTTP 404 (not ideal for SEO). Use the SSR build if that matters.
- **TypeScript 7 has no JavaScript API yet.** Tools that need it (typescript-eslint, ts-morph…) won't run. If you add one, install TypeScript 6 next to it: `"typescript": "npm:@typescript/typescript6@^6.0.2"`.

## 🛠️ Going further

- State: [Zustand](https://zustand.docs.pmnd.rs/), [Jotai](https://jotai.org/), or [TanStack Store](https://tanstack.com/store)
- Forms: [TanStack Form](https://tanstack.com/form)
- Database: [Drizzle](https://orm.drizzle.team/) or [Prisma](https://www.prisma.io/) (SSR mode)
- Auth: [Better Auth](https://www.better-auth.com/) (SSR mode)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<div align="center">

Made with ❤️ by Fernando Mendoza

[⬆ Back to top](#react-ts-template)

</div>
