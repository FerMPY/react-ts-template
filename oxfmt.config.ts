import { defineConfig } from "oxfmt";

export default defineConfig({
  // Prettier-compatible style (oxfmt's own default printWidth is 100).
  printWidth: 80,
  semi: true,
  singleQuote: false,
  trailingComma: "all",

  // Lockfiles and .gitignore'd files are skipped automatically.
  ignorePatterns: ["src/routeTree.gen.ts"],

  // Side-effect imports first, then node: builtins, packages, `#/` aliases and relative paths.
  sortImports: {
    groups: [
      "side_effect_style",
      "side_effect",
      "builtin",
      "external",
      ["internal", "subpath"],
      ["parent", "sibling", "index"],
      "style",
      "unknown",
    ],
  },

  // Same ordering as prettier-plugin-tailwindcss, including inside cn()/cva().
  sortTailwindcss: {
    stylesheet: "./src/styles.css",
    functions: ["cn", "cva", "clsx"],
  },

  sortPackageJson: { sortScripts: false },
});
