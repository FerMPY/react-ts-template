// Builds both targets and serves them for the browser tests (started by playwright.config.ts):
//   SSR: the Nitro server from .output/
//   SPA: dist/client/ under a sub-path, hosted like GitHub Pages (files first,
//        then directory index.html, then 404.html with a 404 status)
// Pass --no-build to serve the existing build output.

import { execFileSync, spawn } from "node:child_process";
import { readFile, stat } from "node:fs/promises";
import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
} from "node:http";
import { extname, join, resolve } from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

const ssrPort = process.env.SSR_PORT ?? "4173";
const spaPort = process.env.SPA_PORT ?? "4174";
const basePath = process.env.SPA_BASE_PATH ?? "/react-ts-template/";

const vite = resolve("node_modules/vite/bin/vite.js");

if (!process.argv.includes("--no-build")) {
  const { BASE_PATH: _, ...env } = process.env;
  execFileSync(process.execPath, [vite, "build"], { stdio: "inherit", env });
  execFileSync(process.execPath, [vite, "build", "--mode", "spa"], {
    stdio: "inherit",
    env: { ...env, BASE_PATH: basePath },
  });
}

const ssr = spawn(process.execPath, [".output/server/index.mjs"], {
  stdio: "inherit",
  env: { ...process.env, PORT: ssrPort },
});
for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    ssr.kill();
    process.exit();
  });
}

async function waitForServer(url: string, attemptsLeft = 100): Promise<void> {
  try {
    await fetch(url);
  } catch (error) {
    if (attemptsLeft === 0) throw error;
    await sleep(100);
    return waitForServer(url, attemptsLeft - 1);
  }
}

// Playwright waits for the SPA URL, so only start that server once SSR is up.
await waitForServer(`http://localhost:${ssrPort}/`);

const contentTypes: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

async function isFile(path: string) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

const root = resolve("dist/client");

async function serveSpa(request: IncomingMessage, response: ServerResponse) {
  const { pathname } = new URL(request.url ?? "/", "http://localhost");
  if (!pathname.startsWith(basePath)) {
    response.writeHead(404).end();
    return;
  }

  let file = join(root, decodeURIComponent(pathname.slice(basePath.length)));
  if (!file.startsWith(root)) {
    response.writeHead(400).end();
    return;
  }

  let status = 200;
  if (!(await isFile(file))) {
    if (await isFile(join(file, "index.html"))) {
      file = join(file, "index.html");
    } else {
      status = 404;
      file = join(root, "404.html");
    }
  }

  response.writeHead(status, {
    "content-type": contentTypes[extname(file)] ?? "application/octet-stream",
  });
  response.end(await readFile(file));
}

createServer((request, response) => {
  serveSpa(request, response).catch((error: unknown) => {
    console.error(error);
    response.writeHead(500).end();
  });
}).listen(Number(spaPort), () => {
  console.info(`SPA: http://localhost:${spaPort}${basePath}`);
});
