import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { renderWithRouter } from ".";

afterEach(() => {
  vi.restoreAllMocks();
});

const TestComponent = () => {
  const _router = useRouter({ warn: true });

  return <div>TestComponent</div>;
};

describe("renderWithRouter", () => {
  it("should render with router", async () => {
    const spy = vi.spyOn(console, "warn");

    // Test that rendering without router provider shows warning
    const { unmount } = render(<TestComponent />);

    expect(spy).toHaveBeenCalledWith(
      "Warning: useRouter must be used inside a <RouterProvider> component!",
    );

    unmount();
    spy.mockReset();

    // Test that renderWithRouter works properly
    await act(async () => {
      renderWithRouter(TestComponent);
    });

    expect(screen.getByText(/TestComponent/i)).toBeVisible();
    expect(spy).not.toHaveBeenCalled();
  });

  describe("withQueryClient", () => {
    const TestQueryComponent = () => {
      const _query = useQuery({
        queryKey: ["test"],
        queryFn: () => Promise.resolve("test data"),
      });

      return <div>TestComponent</div>;
    };

    it("should render with query client", async () => {
      expect(() => render(<TestQueryComponent />)).toThrow();

      await act(async () => {
        expect(() =>
          renderWithRouter(<TestQueryComponent />, { withQueryClient: true }),
        ).not.toThrow();
      });
    });
  });

  describe("withUser", () => {
    it("should not return an user if withUser is false", async () => {
      vi.spyOn(userEvent, "setup");

      await act(async () => {
        const output = renderWithRouter(TestComponent, { withUser: false });

        expect(output).not.toHaveProperty("user");
        expect(userEvent.setup).not.toHaveBeenCalled();
      });
    });

    it("should return an user if withUser is true", async () => {
      vi.spyOn(userEvent, "setup");

      await act(async () => {
        const output = renderWithRouter(TestComponent, { withUser: true });

        expect(output).toHaveProperty("user");
        expect(userEvent.setup).toHaveBeenCalledOnce();
      });
    });
  });
});
