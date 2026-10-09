import { defineConfig } from "react-doctor/api";

export default defineConfig({
  ignore: {
    files: [
      "src/routeTree.gen.ts",
      // shadcn/ui components are vendored; update them with `shadcn add --diff`.
      "src/components/ui/**",
      // Build output (its security scan walks build artifacts too).
      ".output/**",
      "dist/**",
    ],
  },
});
