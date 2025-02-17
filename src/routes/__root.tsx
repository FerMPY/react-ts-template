import React from "react";

import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

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

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex gap-4 bg-blue-800 p-4 text-white shadow-md">
        <Link
          to="/"
          className="transition-colors hover:text-blue-200 [&.active]:font-bold"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="transition-colors hover:text-blue-200 [&.active]:font-bold"
        >
          About
        </Link>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
