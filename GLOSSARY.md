# React TS Template

A React app that ships from one codebase as either a server-rendered app or a static site. Add your own domain's terms here as the app grows.

## Language

### Shipping

**Build target**:
One of the two ways the app is built and deployed: the **SSR build** or the **SPA build**.
_Avoid_: mode, flavor, variant

**SSR build**:
The build target where pages render on a server, arrive as HTML, and then hydrate in the browser.
_Avoid_: server mode, Nitro build, Node build

**SPA build**:
The build target with no server, where a static host serves the **Shell** and every page renders in the browser.
_Avoid_: static mode, client build, CSR build

**Shell**:
The single HTML document the **SPA build** prerenders and serves for every URL.
_Avoid_: index page, fallback page, app shell

**Base path**:
The URL prefix the **SPA build** is served under, such as the repository name on GitHub Pages.
_Avoid_: subpath, public path, base URL

**Server function**:
Code that runs only in the **SSR build** and is called from the browser like a typed function.
_Avoid_: API call, RPC, endpoint, action

### Design system

**UI component**:
A shadcn/ui component owned by this repo, which decides its own colors, spacing and typography.
_Avoid_: design-system component, primitive (reserved for Base UI's unstyled parts), widget

**Variant**:
A named style option a **UI component** offers, such as a button's `outline` look or `sm` size.
_Avoid_: modifier, theme, override

**Theme token**:
A named color, radius or font defined once for the whole app and used through Tailwind classes like `bg-primary`.
_Avoid_: design token, CSS variable, theme color

## Relationships

- A **Build target** is either the **SSR build** or the **SPA build**
- The **SPA build** serves one **Shell** under its **Base path**
- A **Server function** only exists in the **SSR build**
- A **UI component** is styled with **Theme tokens** and exposes **Variants**
