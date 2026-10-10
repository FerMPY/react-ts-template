import { createServerFn } from "@tanstack/react-start";

// Runs only on the server: the client bundle gets a small RPC stub instead, so
// server-only code, env vars and secrets never reach the browser. Chain
// `.validator()` before `.handler()` to accept typed input.
export const getServerInfo = createServerFn({ method: "GET" }).handler(() => ({
  message: process.env.SERVER_GREETING ?? "Hello from the server!",
  time: new Date().toISOString(),
}));
