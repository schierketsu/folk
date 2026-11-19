import {readFile, writeFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const scripts = path.dirname(fileURLToPath(import.meta.url));
const plugin = path.dirname(scripts);
const codePath = path.join(plugin, 'code.js');
const dartLauncher = execFileSync('where.exe', ['dart'], {encoding:'utf8'}).trim().split(/\r?\n/)[0];
const dartExecutable = path.resolve(path.dirname(dartLauncher), 'cache/dart-sdk/bin/dart.exe');
const content = JSON.parse(execFileSync(dartExecutable, [path.join(scripts, 'export-app-content.dart')], {encoding:'utf8'}));
const template = await readFile(path.join(scripts, 'app-frames-template.js'), 'utf8');
const block = template.replace('/*__CONTENT__*/', JSON.stringify(content));
const source = await readFile(codePath, 'utf8');
const existing = /\/\/ <generated:app-frames>[\s\S]*?\/\/ <\/generated:app-frames>/;
const mainAnchor = /\/\/ -+\r?\n\/\/ MAIN/;
const next = existing.test(source)
  ? source.replace(existing, block)
  : source.replace(mainAnchor, (anchor) => block + '\n\n' + anchor);
if (next === source) throw new Error('App frames insertion anchor was not found');
await writeFile(codePath, next);
console.log(`Merged app frames into ${codePath}: ${content.tasks.length} lessons, ${content.tasks.reduce((n,t)=>n+t.steps.length,0)} exercises`);
