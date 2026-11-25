// The Moon Finally Answers Back — make.fun bounty entry.
// Reads the single entry line from entry.txt (repo root) and writes it,
// unchanged, to the output directory given by the environment.
//
// Environment:
//   MAKEFUN_BOT_DIR     — preferred output directory
//   MAKEFUN_OUTPUT_DIR  — fallback output directory
//
// Stdlib only: no network, no wall clock, no dependencies.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the output directory: MAKEFUN_BOT_DIR wins, MAKEFUN_OUTPUT_DIR
// is the fallback. A blank value counts as unset, so a stray empty export
// cannot silently point the write at the repo root.
function resolveOutDir(): string {
  for (const name of ["MAKEFUN_BOT_DIR", "MAKEFUN_OUTPUT_DIR"] as const) {
    const value = process.env[name]?.trim();
    if (value) return value;
  }
  throw new Error("Set MAKEFUN_BOT_DIR or MAKEFUN_OUTPUT_DIR to the output directory.");
}

const repoRoot = dirname(fileURLToPath(import.meta.url));
const entryPath = join(repoRoot, "entry.txt");

const outDir = resolveOutDir();

const line = readFileSync(entryPath, "utf8");

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "output.txt"), line, "utf8");
