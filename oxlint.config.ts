import { defineConfig } from "oxlint";

export default defineConfig({
  options: {
    // Type-aware rules via oxlint-tsgolint (same as `--type-aware`).
    typeAware: true,
    reportUnusedDisableDirectives: "warn",
  },
  // Setting `plugins` replaces the defaults, so the defaults are listed too.
  // react-perf is left out on purpose: the React Compiler memoizes for us.
  plugins: [
    "eslint",
    "typescript",
    "unicorn",
    "oxc",
    "react",
    "jsx-a11y",
    "import",
    "promise",
  ],
  // ESLint plugins running inside oxlint.
  jsPlugins: [
    "@shadcn/lint",
    "@tanstack/eslint-plugin-query",
    "@tanstack/eslint-plugin-router",
  ],
  categories: {
    correctness: "error",
    suspicious: "warn",
    perf: "warn",
  },
  env: {
    builtin: true,
    browser: true,
    node: true, // TanStack Start code also runs on the server
  },
  ignorePatterns: ["src/routeTree.gen.ts"],
  settings: {
    react: {
      linkComponents: [{ name: "Link", attribute: "to" }],
    },
    "jsx-a11y": {
      components: { Button: "button" },
    },
  },
  rules: {
    // React. The correctness category already enables oxlint's native ports of the
    // React Compiler rules from eslint-plugin-react-hooks (purity, refs,
    // set-state-in-effect, static-components, immutability, ...).
    "react/rules-of-hooks": "error",
    "react/exhaustive-deps": "warn",
    "react/only-export-components": ["warn", { allowConstantExport: true }],
    "react/jsx-no-target-blank": "error",
    "react/react-in-jsx-scope": "off",
    // These duplicate the compiler rules above.
    "react/hooks": "off",
    "react/exhaustive-effect-dependencies": "off",
    "react/no-unstable-nested-components": "off",
    "react/no-deriving-state-in-effects": "off",

    // TypeScript
    "typescript/consistent-type-imports": "error",
    "typescript/no-explicit-any": "warn",
    "typescript/no-misused-promises": "error",
    "typescript/switch-exhaustiveness-check": "error",
    "typescript/no-deprecated": "warn", // the message names the replacement API

    // General
    "eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "eslint/no-console": ["warn", { allow: ["warn", "error", "info"] }],
    "eslint/eqeqeq": ["error", "smart"],
    "eslint/no-var": "error",
    "eslint/prefer-const": "error",
    "unicorn/filename-case": ["error", { case: "kebabCase" }],
    "import/no-duplicates": "error",
    "import/no-cycle": "error",
    "import/no-unassigned-import": "off", // CSS and polyfill imports
    "eslint/no-shadow": "off",
    "unicorn/consistent-function-scoping": "off", // noisy for handlers inside components

    // TanStack Query and Router
    "@tanstack/query/exhaustive-deps": "error",
    "@tanstack/query/no-rest-destructuring": "warn",
    "@tanstack/query/stable-query-client": "error",
    "@tanstack/query/no-unstable-deps": "error",
    "@tanstack/query/infinite-query-property-order": "error",
    "@tanstack/query/mutation-property-order": "error",
    "@tanstack/router/create-route-property-order": "warn",
    "@tanstack/router/route-param-names": "error",

    // Design system rules from @shadcn/lint. Errors explain the fix using your
    // components, variants and theme: https://github.com/shadcn-ui/lint
    "shadcn/no-restyle": ["error", { allow: ["layout"] }],
    "shadcn/no-raw-colors": "error",
    "shadcn/no-arbitrary-values": ["error", { allow: ["layout"] }],
    "shadcn/no-inline-styles": "error",
    "shadcn/require-static-classes": "error",
    "shadcn/no-unknown-classes": "warn",
  },
  overrides: [
    {
      // shadcn/ui components own their styling and export variants next to components.
      files: ["src/components/ui/**"],
      rules: {
        "shadcn/no-restyle": "off",
        "shadcn/no-arbitrary-values": "off",
        "shadcn/require-static-classes": "off",
        "react/only-export-components": "off",
      },
    },
    {
      // File routes export `Route` alongside their components.
      files: ["src/routes/**"],
      rules: {
        "react/only-export-components": "off",
      },
    },
    {
      files: ["src/**/*.test.{ts,tsx}", "src/test/**"],
      // `plugins` in an override is added to the root list.
      plugins: ["vitest"],
      rules: {
        "typescript/no-explicit-any": "off",
        "typescript/unbound-method": "off",
        "react/only-export-components": "off",
        "vitest/no-disabled-tests": "warn",
        "vitest/no-identical-title": "error",
        "vitest/prefer-to-be": "warn",
        "vitest/no-import-node-test": "error",
      },
    },
    {
      files: ["scripts/**"],
      rules: {
        "eslint/no-console": "off",
      },
    },
  ],
});
