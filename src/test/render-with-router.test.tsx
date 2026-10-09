import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { useState } from "react";

import { renderWithRouter } from "./render-with-router";

function HomeLink() {
  return <Link to="/">Home</Link>;
}

function Greeting() {
  const { data } = useQuery({
    queryKey: ["greeting"],
    queryFn: () => Promise.resolve("Hello from Query"),
  });
  return <p>{data ?? "Loading"}</p>;
}

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button type="button" onClick={() => setCount((c) => c + 1)}>
      Clicked {count}
    </button>
  );
}

describe("renderWithRouter", () => {
  it("renders a component inside a router", async () => {
    await renderWithRouter(HomeLink);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("renders an element", async () => {
    await renderWithRouter(<p>Hello</p>);

    expect(screen.getByText("Hello")).toBeVisible();
  });

  it("returns a user-event instance", async () => {
    const { user } = await renderWithRouter(Counter);

    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("button")).toHaveTextContent("Clicked 1");
  });

  describe("withQueryClient", () => {
    it("is needed for components that use TanStack Query", () => {
      expect(() => render(<Greeting />)).toThrow(/No QueryClient set/);
    });

    it("provides a fresh QueryClient", async () => {
      await renderWithRouter(Greeting, { withQueryClient: true });

      expect(await screen.findByText("Hello from Query")).toBeVisible();
    });
  });
});
