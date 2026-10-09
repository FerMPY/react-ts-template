// Adds jest-dom matchers like toBeVisible() and toHaveTextContent() to expect.
import "@testing-library/jest-dom/vitest";

// jsdom doesn't implement scrolling, which the router's scroll restoration calls.
window.scrollTo = () => {};
