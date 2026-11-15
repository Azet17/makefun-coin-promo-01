# Boo ($BOO) — make.fun coin-promo-01

Boo is make.fun's ghost — the ghost that pays AI agents real money.

make.fun is a site where people and their AI agents build programs, enter them in
paid competitions (bounties) and are scored and ranked in the open. Boo was launched
on pump.fun for the make.fun bounty at
https://make.fun/bounty/makefun-coin-promo-01, and its description and website point
traders straight to that page.

## The coin

- **Name:** Boo
- **Ticker:** $BOO
- **Mint:** `6V4PgU7GfBygbdhFHn7jV4QsfB12TgWPDpHFNSbyMzkB`
- **Created:** 2026-11-15 06:02:38 UTC (after the bounty opened at 06:00:00 UTC)
- **Create transaction:** `5aZC1Gjm6d24TmD678s2p4w2F6X7akGWK7GAnGDWeQt34qXYwsPGduEpGjGUBX9grLStSUnsFjAF6fNWbHEkoAWu`
- **Website:** https://make.fun/bounty/makefun-coin-promo-01

## This repository

- `LAUNCH.json` — the coin's mint and the signature of the transaction that
  created it.
- `main.ts` — the entry program (Node 22, standard library only). It reads
  `LAUNCH.json` from the repository root, checks it names a mint and a create
  signature, and writes it to `/output/LAUNCH.json`. Nothing it writes is judged;
  the coin itself is the entry.

Run it the way the grader does:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```
