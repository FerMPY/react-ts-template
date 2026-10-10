import { expect, test } from "@playwright/test";

// Every test also fails on uncaught errors and console errors, which is how
// React reports hydration mismatches.
let errors: string[] = [];

test.beforeEach(({ page }) => {
  errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    // Not-found pages and SPA deep links (served from 404.html) load with a 404 status.
    const isDocument404 =
      message.text().includes("404") && message.location().url === page.url();
    if (!isDocument404) errors.push(message.text());
  });
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test("renders the home page", async ({ page }, testInfo) => {
  await page.goto("./");

  await expect(
    page.getByRole("heading", { name: "ships as an SPA or a server" }),
  ).toBeVisible();
  await expect(
    page.getByText(
      testInfo.project.name === "spa"
        ? "Rendering as a static SPA"
        : "Rendering as server-side (SSR)",
    ),
  ).toBeVisible();
});

test("navigates to the demo and loads posts", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("link", { name: "Try the data demo" }).click();

  await expect(
    page.getByRole("heading", { name: "TanStack Router + Query" }),
  ).toBeVisible();
  await expect(page.getByRole("listitem").first()).toBeVisible();
});

test("opens a deep link with the right nav link active", async ({ page }) => {
  await page.goto("demo");

  await expect(
    page.getByRole("heading", { name: "TanStack Router + Query" }),
  ).toBeVisible();
  const nav = page.getByRole("navigation");
  await expect(nav.getByRole("link", { name: "Demo" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(nav.getByRole("link", { name: "Home" })).not.toHaveAttribute(
    "aria-current",
  );
});

test("shows the not found page", async ({ page }) => {
  await page.goto("this-page-does-not-exist");

  await expect(
    page.getByRole("heading", { name: "Page not found" }),
  ).toBeVisible();
});

test("calls a server function, or explains why it can't", async ({
  page,
}, testInfo) => {
  await page.goto("server");

  if (testInfo.project.name === "spa") {
    await expect(
      page.getByText("Server functions need the SSR build"),
    ).toBeVisible();
    return;
  }

  await expect(page.getByText("Hello from the server!")).toBeVisible();
  const time = page.locator("time");
  const firstAnswer = await time.getAttribute("datetime");
  await page.getByRole("button", { name: "Call it again" }).click();
  await expect(time).not.toHaveAttribute("datetime", firstAnswer ?? "");
});

test.describe("dark mode", () => {
  test.use({ colorScheme: "dark" });

  test("follows the system color scheme", async ({ page }) => {
    await page.goto("./");

    await expect(page.locator("html")).toHaveClass(/\bdark\b/);
  });
});
