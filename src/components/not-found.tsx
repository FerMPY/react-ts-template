import { Link } from "@tanstack/react-router";
import { SearchX } from "lucide-react";

import { buttonVariants } from "#/components/ui/button";

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-start gap-4 px-4 py-24">
      <SearchX aria-hidden className="size-8 text-muted-foreground" />
      <h1 className="font-heading text-2xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className={buttonVariants()}>
        Go home
      </Link>
    </div>
  );
}
