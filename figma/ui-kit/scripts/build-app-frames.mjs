import {readFile, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const scripts = path.dirname(fileURLToPath(import.meta.url));
const plugin = path.dirname(scripts);
const codePath = path.join(plugin, 'code.js');
const content = JSON.parse(await readFile(path.join(scripts, 'app-content.json'), 'utf8'));
const template = await readFile(path.join(scripts, 'app-frames-template.js'), 'utf8');
const block = template.replace('/*__CONTENT__*/', JSON.stringify(content));
const source = await readFile(codePath, 'utf8');
const existing = /\/\/ <generated:app-frames>[\s\S]*?\/\/ <\/generated:app-frames>\s*(?=\/\/ -+\r?\n\/\/ MAIN)/;
const mainAnchor = /\/\/ -+\r?\n\/\/ MAIN/;
const hasExisting = existing.test(source);
if (!hasExisting && !mainAnchor.test(source)) throw new Error('App frames insertion anchor was not found');
const next = hasExisting
  ? source.replace(existing, block + '\n\n')
  : source.replace(mainAnchor, (anchor) => block + '\n\n' + anchor);
if (next !== source) await writeFile(codePath, next);
console.log(`Merged app frames into ${codePath}: ${content.tasks.length} lessons, ${content.tasks.reduce((n,t)=>n+t.steps.length,0)} exercises`);
