#!/usr/bin/env node
// Turns a fresh clone of the template into your own project:
// renames the package, wipes the template's git history and makes an initial commit.
// Usage: node scripts/setup.ts

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename } from "node:path";
import { stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline/promises";

const rl = createInterface({ input, output });

function git(...args: string[]) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function gitConfig(key: string) {
  try {
    return git("config", "--get", key);
  } catch {
    return "";
  }
}

async function main() {
  const defaultName = basename(process.cwd())
    .toLowerCase()
    .replaceAll(/[^a-z0-9-]/g, "-");
  const name =
    (await rl.question(`Project name (${defaultName}): `)) || defaultName;

  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  pkg.name = name;
  pkg.version = "0.0.0";
  writeFileSync("package.json", `${JSON.stringify(pkg, null, 2)}\n`);
  console.log(`Renamed package to "${name}".`);

  if (existsSync(".git")) {
    console.log("Removing the template's git history...");
    rmSync(".git", { recursive: true, force: true });
  }
  git("init");

  if (!gitConfig("user.name") || !gitConfig("user.email")) {
    console.log(
      "Git user information is not set. Let's set it up for this repository.",
    );
    git("config", "user.name", await rl.question("Git user name: "));
    git("config", "user.email", await rl.question("Git email: "));
  }

  git("add", ".");
  git("commit", "-m", "Initial commit");

  console.log(
    "\nAll done! Link your own repository with: git remote add origin <repo-url>",
  );
}

try {
  await main();
} catch (error) {
  console.error(
    "Setup failed:",
    error instanceof Error ? error.message : error,
  );
  process.exitCode = 1;
} finally {
  rl.close();
}
