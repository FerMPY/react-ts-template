import { screen } from "@testing-library/react";

import { renderWithRouter } from "#/test/render-with-router";

import { NotFound } from "./not-found";

describe("NotFound", () => {
  it("links back home", async () => {
    await renderWithRouter(NotFound);

    expect(
      screen.getByRole("heading", { name: "Page not found" }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "Go home" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
