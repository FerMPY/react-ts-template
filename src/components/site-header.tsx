import { Link } from "@tanstack/react-router";

import { buttonVariants } from "#/components/ui/button";
import { cn } from "#/lib/utils";

// <Link> sets data-status="active" on the current route.
const navLinkClass = cn(
  buttonVariants({ variant: "ghost", size: "sm" }),
  "data-[status=active]:bg-muted",
);

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-5xl items-center gap-1 px-4">
        <Link to="/" className="mr-4 font-heading font-semibold">
          react-ts-template
        </Link>
        <Link to="/" className={navLinkClass} activeOptions={{ exact: true }}>
          Home
        </Link>
        <Link to="/demo" className={navLinkClass}>
          Demo
        </Link>
        <Link to="/server" className={navLinkClass}>
          Server
        </Link>
        <a
          href="https://github.com/FerMPY/react-ts-template"
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "ml-auto",
          )}
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
