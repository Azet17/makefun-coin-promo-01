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

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const sourcePath = join(botDir, 'LAUNCH.json');
const targetPath = join(outputDir, 'LAUNCH.json');

const raw = readFileSync(sourcePath, 'utf8');
const launch = JSON.parse(raw);

if (typeof launch.mint !== 'string' || launch.mint.length < 32) {
  throw new Error(`LAUNCH.json has no usable mint: ${sourcePath}`);
}
if (typeof launch.create_signature !== 'string' || launch.create_signature.length < 64) {
  throw new Error(`LAUNCH.json has no usable create_signature: ${sourcePath}`);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(targetPath, raw.endsWith('\n') ? raw : raw + '\n', 'utf8');
