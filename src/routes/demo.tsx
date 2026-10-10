import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { postsQueryOptions } from "#/queries/posts";

export const Route = createFileRoute("/demo")({
  // Runs on the server for the first SSR request and on the client after that.
  // Hovering a link to this page preloads it (defaultPreload: "intent").
  loader: ({ context: { queryClient } }) =>
    queryClient.query(postsQueryOptions),
  component: Demo,
});

function Demo() {
  const { data: posts } = useSuspenseQuery(postsQueryOptions);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-16">
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          TanStack Router + Query
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          The route loader fills the query cache before the page renders, and{" "}
          <code className="font-mono text-sm">useSuspenseQuery</code> reads from
          it. With SSR the data arrives in the HTML.
        </p>
      </header>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.id}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.body}</CardDescription>
              </CardHeader>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
