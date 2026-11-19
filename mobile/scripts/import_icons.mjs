import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const source = path.join(root, 'app/assets/images');
const target = path.join(root, 'mobile/src/assets/icons.ts');
const names = [
  'nav-home',
  'nav-tasks',
  'nav-ranking',
  'nav-feed',
  'step-star',
  'step-book',
];
const icons = Object.fromEntries(
  names.map((name) => [name, fs.readFileSync(path.join(source, `${name}.svg`), 'utf8')]),
);
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, `export const icons = ${JSON.stringify(icons, null, 2)} as const;\n`);
console.log(`Imported ${names.length} SVG icons into ${target}`);
