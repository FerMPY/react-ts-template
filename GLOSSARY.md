# React TS Template

A React app that ships from one codebase as a server-rendered app or a static site. Add your own domain's terms as the app grows.

## Language

**SSR build**:
The build where pages render on a server, arrive as HTML, and hydrate in the browser.
_Avoid_: server mode, Nitro build

**SPA build**:
The build with no server, where a static host serves the **Shell** and pages render in the browser.
_Avoid_: static mode, client build, CSR

**Shell**:
The single HTML page the **SPA build** prerenders and serves for every URL.
_Avoid_: index page, fallback page

**Base path**:
The URL prefix the **SPA build** is served under, such as the repo name on GitHub Pages.
_Avoid_: subpath, public path

**Server function**:
Code that runs only in the **SSR build** and is called from the browser like a typed function.
_Avoid_: API call, RPC, endpoint

**UI component**:
A shadcn/ui component owned by this repo, which decides its own colors, spacing and typography.
_Avoid_: design-system component, primitive, widget

**Variant**:
A named style option a **UI component** offers, such as a button's `outline` look or `sm` size.
_Avoid_: modifier, override

**Theme token**:
A color, radius or font defined once for the app and used through classes like `bg-primary`.
_Avoid_: design token, CSS variable
