import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
  ClientOnly,
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  ScriptOnce,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";

import { SiteHeader } from "#/components/site-header";
import { isSpa } from "#/lib/env";

import appCss from "#/styles.css?url";

// Follow the OS color scheme before first paint (no flash of the wrong theme).
const themeScript = `document.documentElement.classList.toggle("dark", matchMedia("(prefers-color-scheme: dark)").matches)`;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "React TS Template" },
        {
          name: "description",
          content:
            "React 19 + TanStack Start template with SPA and SSR builds, shadcn/ui and the Oxc toolchain.",
        },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        {
          rel: "icon",
          type: "image/svg+xml",
          href: `${import.meta.env.BASE_URL}favicon.svg`,
        },
      ],
    }),
    shellComponent: RootDocument,
    component: RootComponent,
  },
);

function RootComponent() {
  const layout = (
    <>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
    </>
  );

  // The SPA shell is prerendered once at "/" and served for every URL, so render
  // location-dependent UI only after hydration (see TanStack/router#8473).
  if (isSpa) {
    return <ClientOnly>{layout}</ClientOnly>;
  }
  return layout;
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ScriptOnce>{themeScript}</ScriptOnce>
        <HeadContent />
      </head>
      <body className="min-h-svh">
        {children}
        <TanStackDevtools
          config={{ position: "bottom-right" }}
          plugins={[
            {
              name: "TanStack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            { name: "TanStack Query", render: <ReactQueryDevtoolsPanel /> },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
