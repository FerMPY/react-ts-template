# One codebase for both builds

The template ships an SSR build and an SPA build from the same code with TanStack Start, whose SPA mode is switched on by `vite build --mode spa`, instead of two templates that would drift apart. The cost is that every change has to work in both builds.
