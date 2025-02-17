import React from "react";

import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => (
    <>
      <div className="flex h-[60px] gap-4 bg-blue-800 p-4 text-white shadow-md">
        <Link
          to="/"
          className="transition-colors hover:text-blue-200 [&.active]:font-bold"
        >
          Home
        </Link>
        <Link
          to="/demo"
          className="transition-colors hover:text-blue-200 [&.active]:font-bold"
        >
          Demo
        </Link>
      </div>
      <main className="h-[calc(100vh-60px)] w-screen bg-gray-900 text-white">
        <Outlet />
      </main>
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  ),
});
