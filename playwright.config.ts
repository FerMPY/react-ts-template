import { defineConfig, devices } from "@playwright/test";

// Both builds are served by e2e/serve.ts. Tests navigate with relative paths
// ("demo", not "/demo") so the SPA's sub-path is kept.
const ssrURL = "http://localhost:4173/";
const spaURL = "http://localhost:4174/react-ts-template/";

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    ...devices["Desktop Chrome"],
    trace: "retain-on-failure",
  },
  projects: [
    { name: "ssr", use: { baseURL: ssrURL } },
    { name: "spa", use: { baseURL: spaURL } },
  ],
  webServer: {
    command: "node e2e/serve.ts",
    url: spaURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
