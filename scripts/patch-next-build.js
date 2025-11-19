#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const directories = [
  path.join(root, 'node_modules'),
  path.join(root, 'frontend/node_modules'),
  path.join(root, 'backend/node_modules')
];

const targets = directories.flatMap((dir) => [
  path.join(dir, 'next/dist/build/generate-build-id.js'),
  path.join(dir, 'next/dist/esm/build/generate-build-id.js')
]);

const pattern = /async function generateBuildId\(generate, fallback\) {\s+let buildId = await generate\(\);/;
const snippet = `async function generateBuildId(generate, fallback) {
    const generator = typeof generate === "function" ? generate : fallback;
    if (typeof generator !== "function") {
        throw new Error("No valid generateBuildId function available.");
    }
    let buildId = await generator();`;

let patchedAny = false;

for (const target of targets) {
  if (!fs.existsSync(target)) continue;
  let source = fs.readFileSync(target, 'utf8');
  let changed = false;

  if (!source.includes('const generator = typeof generate') && pattern.test(source)) {
    source = source.replace(pattern, snippet);
    changed = true;
  }

  if (source.includes('    let buildId = await generate();')) {
    source = source.replace('    let buildId = await generate();', '');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(target, source, 'utf8');
    patchedAny = true;
  }
}

if (patchedAny) {
  console.log('Applied Next.js build-id patch');
} else {
  console.log('Next.js build-id patch not applied (files missing or already patched)');
}
