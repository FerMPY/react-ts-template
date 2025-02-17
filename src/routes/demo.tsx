import { createFileRoute } from "@tanstack/react-router";

import { postsQueryOptions } from "../queries/fetchPosts";

export const Route = createFileRoute("/demo")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(postsQueryOptions),
});
