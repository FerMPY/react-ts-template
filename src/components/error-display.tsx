import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link, useRouter } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

import { Button, buttonVariants } from "#/components/ui/button";

export function ErrorDisplay({ error, reset }: ErrorComponentProps) {
  const router = useRouter();

  function retry() {
    reset();
    // Re-run loaders so a failed fetch gets another chance.
    void router.invalidate();
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col items-start gap-4 px-4 py-24">
      <TriangleAlert aria-hidden className="size-8 text-destructive" />
      <h1 className="font-heading text-2xl font-semibold">
        Something went wrong
      </h1>
      <pre className="w-full overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm">
        {error instanceof Error ? error.message : "Unknown error"}
      </pre>
      <div className="flex gap-2">
        <Button onClick={retry}>Try again</Button>
        <Link to="/" className={buttonVariants({ variant: "outline" })}>
          Go home
        </Link>
      </div>
    </div>
  );
}
