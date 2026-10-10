import { copyFile } from "node:fs/promises";

import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

// Two build targets from one codebase:
//   pnpm build      -> SSR server via Nitro (.output/), run with `pnpm start`
//   pnpm build:spa  -> static SPA (dist/client/), deploy to any static host
export default defineConfig(({ mode }) => {
  // Start prerenders the SPA shell by reloading this file without `--mode`,
  // so carry the flag over in an env var.
  if (mode === "spa") process.env.SPA = "true";
  const isSpa = process.env.SPA === "true";

  return {
    // e.g. BASE_PATH=/react-ts-template/ for GitHub Pages. The router basepath is derived from it.
    base: process.env.BASE_PATH ?? "/",
    server: { port: 3000 },
    plugins: [
      devtools(),
      !isSpa &&
        nitro({
          rolldownConfig: {
            onLog(level, log, handler) {
              if (log.code === "MODULE_LEVEL_DIRECTIVE") return;
              handler(level, log);
            },
          },
        }),
      tailwindcss(),
      tanstackStart({
        spa: {
          enabled: isSpa,
          prerender: {
            // Emit the shell as index.html, and as 404.html so static hosts fall back to it.
            outputPath: "/index",
            onSuccess: () =>
              copyFile("dist/client/index.html", "dist/client/404.html"),
          },
        },
      }),
      // React Compiler via Oxc's native port (oxc-transform-react), no Babel needed.
      // To use the Babel version instead, see "React Compiler" in the README.
      react({ compiler: true }),
    ],
  };
});
