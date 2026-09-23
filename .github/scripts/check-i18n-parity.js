const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const I18N_DIR = 'src/i18n';
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

function readAtHead(file) {
  return flatten(JSON.parse(fs.readFileSync(file, 'utf8')));
}

function readAtBase(file) {
  try {
    const raw = execSync(`git show ${BASE_SHA}:${file}`, { encoding: 'utf8' });
    return flatten(JSON.parse(raw));
  } catch {
    return null; // file didn't exist at base (new locale)
  }
}

function loadIgnoreList() {
  if (!fs.existsSync(IGNORE_FILE)) return new Set();
  return new Set(JSON.parse(fs.readFileSync(IGNORE_FILE, 'utf8')));
}

const ignore = loadIgnoreList();
const localeFiles = fs
  .readdirSync(I18N_DIR)
  .filter((f) => f.endsWith('.json'))
  .map((f) => path.join(I18N_DIR, f));

// key -> { file -> changed(bool) }, only for files where the key exists at HEAD
const keyChangeMap = {};
// key -> set of files that currently contain it (at HEAD)
const keyPresence = {};

for (const file of localeFiles) {
  const base = readAtBase(file);
  const head = readAtHead(file);
  const isNewFile = base === null;

  for (const [key, value] of Object.entries(head)) {
    if (ignore.has(key)) continue;
    keyPresence[key] ??= new Set();
    keyPresence[key].add(file);

    const changed = isNewFile ? false : base[key] !== value; // new files don't count as "changes"
    keyChangeMap[key] ??= {};
    keyChangeMap[key][file] = changed;
  }
}

const problems = [];

for (const [key, fileChangeMap] of Object.entries(keyChangeMap)) {
  const changedIn = Object.entries(fileChangeMap)
    .filter(([, changed]) => changed)
    .map(([file]) => file);

  if (changedIn.length === 0) continue; // nobody touched this key

  const presentFiles = [...keyPresence[key]];
  const missedIn = presentFiles.filter((f) => !fileChangeMap[f]);

  if (missedIn.length > 0) {
    problems.push({ key, changedIn, missedIn });
  }
}

if (problems.length === 0) {
  console.log('All value changes are mirrored across locale files.');
  process.exit(0);
}

console.error(`Found ${problems.length} key(s) changed in some locale files but not others:\n`);
for (const { key, changedIn, missedIn } of problems) {
  console.error(`  ${key}`);
  console.error(`    changed in: ${changedIn.join(', ')}`);
  console.error(`    not updated in: ${missedIn.join(', ')}\n`);
}
console.error(
  'If any of these are intentionally shared across locales (URLs, brand names, etc.),\n' +
  `add the key path to ${IGNORE_FILE} (a JSON array of dotted key paths).`
);
process.exit(1);
