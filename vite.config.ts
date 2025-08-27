/// <reference types="vitest/config" />
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const ReactCompilerConfig = {};

const isTest = process.env.NODE_ENV === "test";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/react-ts-template/" : "/",
  plugins: [
    tsconfigPaths(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
    !isTest && tanstackRouter(),
  ],
  test: {
    globals: true,
    isolate: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.tsx",
  },
});
