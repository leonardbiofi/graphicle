import { createRouter as createTanstackRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const createRouter = () => {
  const queryClient = new QueryClient();

  const router = createTanstackRouter({
    context: { queryClient },
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });
  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });
  return router;
};

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
