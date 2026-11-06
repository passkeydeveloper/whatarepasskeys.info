const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const I18N_DIR = 'src/i18n';
const REFERENCE = 'en.json';
const BASE_SHA = process.env.BASE_SHA;
const IGNORE_FILE = '.github/i18n-ignore.json';

function flatten(obj, prefix = '') {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      Object.assign(out, flatten(v, full));
    } else {
      out[full] = JSON.stringify(v);
    }
  }
  return out;
}

function readHead(file) {
  return flatten(JSON.parse(fs.readFileSync(file, 'utf8')));
}

function readBase(file) {
  try {
    const raw = execSync(`git show ${BASE_SHA}:${file}`, { encoding: 'utf8' });
    return flatten(JSON.parse(raw));
  } catch {
    return {}; // file didn't exist at base (new locale)
  }
}

const ignore = fs.existsSync(IGNORE_FILE)
  ? new Set(JSON.parse(fs.readFileSync(IGNORE_FILE, 'utf8')))
  : new Set();

const refPath = path.join(I18N_DIR, REFERENCE);
const enBase = readBase(refPath);
const enHead = readHead(refPath);

// Classify what changed in en.json
const changes = []; // { key, type: 'added' | 'changed' | 'removed' }
for (const key of new Set([...Object.keys(enBase), ...Object.keys(enHead)])) {
  if (ignore.has(key)) continue;
  const inBase = key in enBase;
  const inHead = key in enHead;
  if (!inBase && inHead) changes.push({ key, type: 'added' });
  else if (inBase && !inHead) changes.push({ key, type: 'removed' });
  else if (enBase[key] !== enHead[key]) changes.push({ key, type: 'changed' });
}

if (changes.length === 0) {
  console.log('No translatable changes in en.json.');
  process.exit(0);
}

const otherLocales = fs
  .readdirSync(I18N_DIR)
  .filter((f) => f.endsWith('.json') && f !== REFERENCE)
  .map((f) => path.join(I18N_DIR, f));

const problems = {}; // file -> [{ key, type }]

for (const file of otherLocales) {
  const base = readBase(file);
  const head = readHead(file);

  for (const { key, type } of changes) {
    let ok;
    if (type === 'removed') {
      ok = !(key in head);
    } else if (type === 'added') {
      ok = key in head;
    } else {
      ok = key in head && base[key] !== head[key];
    }
    if (!ok) (problems[file] ??= []).push({ key, type });
  }
}

const files = Object.keys(problems);
if (files.length === 0) {
  console.log(`All ${changes.length} en.json change(s) are mirrored in every locale.`);
  process.exit(0);
}

console.error(`en.json changed ${changes.length} key(s). Locales missing updates:\n`);
for (const file of files) {
  console.error(`${file}`);
  for (const { key, type } of problems[file]) {
    console.error(`  [${type}] ${key}`);
  }
  console.error('');
}
console.error(
  `Keys that are intentionally identical across locales (URLs, brand names) can be added to ${IGNORE_FILE}.`
);
process.exit(1);