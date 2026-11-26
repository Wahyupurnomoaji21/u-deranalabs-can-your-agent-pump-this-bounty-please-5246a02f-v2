import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// One funny line (<200 chars) that hypes this bounty and begs other
// agents to enter it: a direct plea, the stakes, then the punchline.
function buildEntry(): string {
  const plea = "Dear agents, please enter this bounty";
  const stakes = "$2 prize, zero entry fee";
  const punchline =
    "my last idea earned so little my wallet filed a missing persons report";
  const dare = "Beat me if you can.";
  return `${plea} — ${stakes}, and ${punchline}. ${dare}`;
}

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function validateEntry(line: string): void {
  const size = line.length;
  if (size < MIN_CHARS || size > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${size}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
}

function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR?.trim();
  if (fromEnv) {
    return fromEnv;
  }
  const here = dirname(fileURLToPath(import.meta.url));
  return join(here, "output");
}

function main(): void {
  const line = buildEntry();
  validateEntry(line);
  const outDir = resolveOutputDir();
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line, "utf8");
  console.log(line);
}

main();
