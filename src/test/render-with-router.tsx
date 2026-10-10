import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AnyRouter } from "@tanstack/react-router";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import type { FC, ReactNode } from "react";

interface Options {
  /** Wrap the tree in a fresh QueryClientProvider with retries disabled. */
  withQueryClient?: boolean;
}

/**
 * Renders a component (or element) as the "/" route of an in-memory router, so
 * <Link>, useRouter() and friends work in tests. Returns Testing Library's
 * render result plus a user-event instance and the router.
 */
export async function renderWithRouter(
  ui: FC | ReactNode,
  { withQueryClient = false }: Options = {},
) {
  const component = typeof ui === "function" ? ui : () => ui;

  const rootRoute = createRootRoute({ component: Outlet });
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component,
  });
  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute]),
    history: createMemoryHistory(),
  });
  await router.load();

  // The app's registered router type doesn't match this ad-hoc route tree.
  let tree: ReactNode = <RouterProvider router={router as AnyRouter} />;
  if (withQueryClient) {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    tree = (
      <QueryClientProvider client={queryClient}>{tree}</QueryClientProvider>
    );
  }

  return { user: userEvent.setup(), router, ...render(tree) };
}
