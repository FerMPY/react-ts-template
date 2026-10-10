import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Atom,
  Component,
  DatabaseZap,
  FileCode,
  FlaskConical,
  Globe,
  Route as RouteIcon,
  Server,
  ShieldCheck,
  Stethoscope,
  Wind,
  Zap,
} from "lucide-react";

import { TechCard } from "#/components/tech-card";
import { Badge } from "#/components/ui/badge";
import { buttonVariants } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";

export const Route = createFileRoute("/")({
  component: Home,
});

const stack = [
  {
    icon: Atom,
    title: "React 19",
    description: "With the React Compiler, so no manual memoization.",
    link: "https://react.dev/",
  },
  {
    icon: RouteIcon,
    title: "TanStack Start",
    description: "Type-safe file routing, SSR, or a static SPA.",
    link: "https://tanstack.com/start",
  },
  {
    icon: DatabaseZap,
    title: "TanStack Query",
    description: "Server state, wired into route loaders and SSR.",
    link: "https://tanstack.com/query",
  },
  {
    icon: Zap,
    title: "Vite 8",
    description: "Rolldown-powered dev server and builds.",
    link: "https://vite.dev/",
  },
  {
    icon: FileCode,
    title: "TypeScript 7",
    description: "The native compiler, for much faster type checks.",
    link: "https://www.typescriptlang.org/",
  },
  {
    icon: Wind,
    title: "Tailwind CSS 4",
    description: "CSS-first config with design tokens.",
    link: "https://tailwindcss.com/",
  },
  {
    icon: Component,
    title: "shadcn/ui",
    description: "Base UI components you own, linted by @shadcn/lint.",
    link: "https://ui.shadcn.com/",
  },
  {
    icon: ShieldCheck,
    title: "Oxlint + Oxfmt",
    description: "Type-aware linting and formatting from the Oxc toolchain.",
    link: "https://oxc.rs/",
  },
  {
    icon: Stethoscope,
    title: "React Doctor",
    description: "Catches React anti-patterns locally and on every PR.",
    link: "https://react.doctor/",
  },
  {
    icon: FlaskConical,
    title: "Vitest 5",
    description: "Fast tests with Testing Library and jsdom.",
    link: "https://vitest.dev/",
  },
];

const isSpa = import.meta.env.MODE === "spa";

function Home() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 px-4 py-16">
      <section className="flex flex-col items-start gap-6">
        <Badge variant="secondary">
          Rendering as {isSpa ? "a static SPA" : "server-side (SSR)"}
        </Badge>
        <h1 className="max-w-2xl font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          A React template that ships as an SPA or a server.
        </h1>
        <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
          One codebase, two build targets, and a toolchain that keeps you (and
          your coding agents) honest. Edit{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            src/routes/index.tsx
          </code>{" "}
          to get started.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link to="/demo" className={buttonVariants({ size: "lg" })}>
            Try the data demo
            <ArrowRight data-icon="inline-end" />
          </Link>
          <a
            href="https://github.com/FerMPY/react-ts-template#readme"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Read the docs
          </a>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <Globe aria-hidden className="mb-2 size-5 text-muted-foreground" />
            <CardTitle>Static SPA</CardTitle>
            <CardDescription>
              Client-rendered shell for any static host, like GitHub Pages.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <code className="font-mono text-sm">pnpm build:spa</code>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Server aria-hidden className="mb-2 size-5 text-muted-foreground" />
            <CardTitle>SSR server</CardTitle>
            <CardDescription>
              Server rendering, server functions and API routes via Nitro.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <code className="font-mono text-sm">pnpm build && pnpm start</code>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Built with
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((tech) => (
            <TechCard key={tech.title} {...tech} />
          ))}
        </div>
      </section>
    </div>
  );
}
