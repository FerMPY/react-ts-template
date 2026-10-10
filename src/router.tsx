import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import { ErrorDisplay } from "#/components/error-display";
import { NotFound } from "#/components/not-found";
import { PendingComponent } from "#/components/pending-component";

import { routeTree } from "./routeTree.gen";

export function getRouter() {
  // A new QueryClient per router, so server requests never share a cache.
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 30_000 } },
  });

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreload: "intent",
    // Let TanStack Query decide when preloaded data is stale.
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: ErrorDisplay,
    defaultNotFoundComponent: NotFound,
    defaultPendingComponent: PendingComponent,
  });

  // Dehydrates queries on the server and hydrates them on the client.
  setupRouterSsrQueryIntegration({ router, queryClient });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
