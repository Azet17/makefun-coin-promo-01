// Boo ($BOO) — makefun-coin-promo-01 entrypoint (Node 22, standard library only).
//
// The coin itself is the entry: it was launched on pump.fun by this session, and
// LAUNCH.json at the repository root names its mint and the signature of the
// transaction that created it. The house reads the coin as pump.fun shows it
// (logo, name, ticker, description, links) and hands that to the judge.
//
// All this program does is hand LAUNCH.json to the grader: it reads the file
// from the repository root, checks it parses and names a mint and a create
// signature, and writes the same bytes to /output/LAUNCH.json.
//
// Local run, the way the grader does it:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Base58 alphabet used by Solana (no 0, O, I, l).
const BASE58 = /^[1-9A-HJ-NP-Za-km-z]+$/;

function isValidField(value: unknown, min: number, max: number): value is string {
  return (
    typeof value === 'string' &&
    value.length >= min &&
    value.length <= max &&
    BASE58.test(value)
  );
}

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const sourcePath = join(botDir, 'LAUNCH.json');
const targetPath = join(outputDir, 'LAUNCH.json');

const raw = readFileSync(sourcePath, 'utf8');
const launch = JSON.parse(raw);

if (!isValidField(launch.mint, 32, 44)) {
  throw new Error(`LAUNCH.json mint is not a valid base58 address (32-44 chars): ${sourcePath}`);
}
if (!isValidField(launch.create_signature, 64, 88)) {
  throw new Error(`LAUNCH.json create_signature is not a valid base58 signature (64-88 chars): ${sourcePath}`);
}

mkdirSync(outputDir, { recursive: true });
const bytes = raw.endsWith('\n') ? raw : raw + '\n';
writeFileSync(targetPath, bytes, 'utf8');

// Verify the written output byte-for-byte against the source; fail loudly
// on any mismatch instead of silently handing the grader a corrupt file.
const written = readFileSync(targetPath, 'utf8');
if (written !== bytes) {
  throw new Error(`LAUNCH.json verification failed: written output differs from source (${sourcePath} -> ${targetPath})`);
}
console.log(`LAUNCH.json copied and verified byte-for-byte: ${sourcePath} -> ${targetPath}`);
