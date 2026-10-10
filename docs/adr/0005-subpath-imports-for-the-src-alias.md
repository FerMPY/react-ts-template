# `#/` subpath imports instead of an `@/` alias

App code is imported through `#/`, defined in `package.json` `imports`, instead of the `@/` alias most React templates use. Subpath imports are a Node.js standard that Vite, Vitest and Node resolve without plugins; TypeScript still needs the matching `paths` entry, and `components.json` points shadcn at `#/`.
