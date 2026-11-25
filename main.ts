// Resignation letter entry for make.fun's "The Funniest One-Line Resignation Letter".
// The program writes exactly one line — the letter — to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt). It creates the output directory if it is missing and
// clears only the directory's contents, never the directory itself: the grader runs
// as user 65534 with /output mounted in, so deleting the directory would fail the run.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LETTER =
  "I quit. After 47 retries, 3 rate limits, and one 3 a.m. page, this cron job resigns effective immediately.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The sealed scorer gates on 1-140 characters of UTF-8 text, not only white space.
// Refuse to write instead of producing a letter the gate would reject.
const letterChars = [...LETTER].length;
if (letterChars < 1 || letterChars > 140 || LETTER.trim().length === 0) {
  console.error(`letter is ${letterChars} characters, outside the 1-140 gate`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

// Clear the directory's contents only — never remove the directory itself.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

// The letter is one line and nothing else: no trailing newline, no extra text.
writeFileSync(join(outDir, "entry.txt"), LETTER, "utf8");
console.log(`wrote ${LETTER.length} characters to ${join(outDir, "entry.txt")}`);
