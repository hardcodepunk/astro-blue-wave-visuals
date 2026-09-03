#!/usr/bin/env node
/**
 * Shrinks the source photography in web/src/assets/media, in place.
 *
 * This is about what sits in git, not what ships. Astro re-encodes everything
 * to AVIF/WebP at build time regardless, so the win here is repo weight and a
 * smaller input for sharp to work from.
 *
 * Uses the TinyPNG/TinyJPG API when TINIFY_API_KEY is set, and falls back to a
 * local mozjpeg pass through sharp when it is not. Both are lossy; run it once
 * on a set of files rather than repeatedly, to avoid stacking generation loss.
 *
 *   TINIFY_API_KEY=xxx node scripts/compress-images.mjs
 *   node scripts/compress-images.mjs --dry-run
 */
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIR = join(ROOT, "web/src/assets/media");
const KEY = process.env.TINIFY_API_KEY;
const DRY = process.argv.includes("--dry-run");
const QUALITY = 82;

const kb = (n) => `${(n / 1024).toFixed(0)}KB`;

async function viaTinify(bytes) {
  const auth = Buffer.from(`api:${KEY}`).toString("base64");

  const shrink = await fetch("https://api.tinify.com/shrink", {
    method: "POST",
    headers: { Authorization: `Basic ${auth}` },
    body: bytes,
  });

  if (shrink.status === 429) throw new Error("monthly quota exhausted");
  if (!shrink.ok) throw new Error(`shrink failed: ${shrink.status}`);

  const { output } = await shrink.json();
  const download = await fetch(output.url, {
    headers: { Authorization: `Basic ${auth}` },
  });
  if (!download.ok) throw new Error(`download failed: ${download.status}`);

  return Buffer.from(await download.arrayBuffer());
}

async function viaSharp(bytes) {
  const { default: sharp } = await import("sharp");
  return sharp(bytes)
    .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
    .toBuffer();
}

const compress = KEY ? viaTinify : viaSharp;

console.log(
  KEY
    ? "Using the TinyJPG API (TINIFY_API_KEY is set)."
    : "No TINIFY_API_KEY — falling back to local sharp/mozjpeg.",
);
if (DRY) console.log("Dry run: nothing will be written.\n");

const files = (await readdir(DIR)).filter((f) =>
  [".jpg", ".jpeg", ".png"].includes(extname(f).toLowerCase()),
);

let before = 0;
let after = 0;
let failed = 0;

for (const name of files) {
  const path = join(DIR, name);
  const original = await readFile(path);
  before += original.byteLength;

  try {
    const output = await compress(original);

    // Never write a result that is not actually smaller.
    if (output.byteLength >= original.byteLength) {
      after += original.byteLength;
      console.log(`  keep   ${name.padEnd(30)} ${kb(original.byteLength)} (no gain)`);
      continue;
    }

    if (!DRY) await writeFile(path, output);
    after += output.byteLength;

    const saved = (1 - output.byteLength / original.byteLength) * 100;
    console.log(
      `  ok     ${name.padEnd(30)} ${kb(original.byteLength)} → ${kb(output.byteLength)}  −${saved.toFixed(0)}%`,
    );
  } catch (error) {
    failed++;
    after += original.byteLength;
    console.log(`  FAIL   ${name.padEnd(30)} ${error.message}`);
  }
}

console.log(
  `\n${files.length} files · ${kb(before)} → ${kb(after)} · saved ${(1 - after / before) * 100 > 0 ? ((1 - after / before) * 100).toFixed(0) : 0}%` +
    (failed ? ` · ${failed} failed` : ""),
);
