import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Server } from "lucide-react";

import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { isSpa } from "#/lib/env";
import { serverInfoQueryOptions } from "#/queries/server-info";

export const Route = createFileRoute("/server")({
  // The static SPA has no server to call.
  loader: ({ context: { queryClient } }) =>
    isSpa ? undefined : queryClient.query(serverInfoQueryOptions),
  component: ServerFunctionDemo,
});

function ServerFunctionDemo() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-16">
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Server functions
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          <code className="font-mono text-sm">createServerFn</code> runs code on
          the server and calls it from the browser like a typed function. See{" "}
          <code className="font-mono text-sm">src/server/server-info.ts</code>.
        </p>
      </header>
      {isSpa ? <SpaNotice /> : <ServerInfo />}
    </div>
  );
}

function ServerInfo() {
  const { data, refetch, isFetching } = useSuspenseQuery(
    serverInfoQueryOptions,
  );

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>{data.message}</CardTitle>
        <CardDescription>
          Answered at <time dateTime={data.time}>{data.time}</time>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          variant="outline"
          disabled={isFetching}
          onClick={() => void refetch()}
        >
          {isFetching ? "Calling…" : "Call it again"}
        </Button>
      </CardFooter>
    </Card>
  );
}

function SpaNotice() {
  return (
    <Card className="max-w-xl">
      <CardHeader>
        <Server aria-hidden className="mb-2 size-5 text-muted-foreground" />
        <CardTitle>Server functions need the SSR build</CardTitle>
        <CardDescription>
          This is the static SPA build, so there is no server to call.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <code className="font-mono text-sm">pnpm build && pnpm start</code>
      </CardContent>
    </Card>
  );
}
