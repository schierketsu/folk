import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const toolDir = path.dirname(fileURLToPath(import.meta.url));
const source = await readFile(path.resolve(toolDir, '../../figma/ui-kit/code.js'), 'utf8');
const definitions = source.split('// <generated:mascot-images>')[0];
const context = {};
vm.runInNewContext(`${definitions}\nglobalThis.icons = ICONS;`, context);

const names = {
  'Нора': 'nav-home',
  'Сундук': 'nav-tasks',
  'Рейтинг': 'nav-ranking',
  'Лента': 'nav-feed',
  'Профиль': 'nav-profile',
};

for (const [name, body] of context.icons) {
  const filename = names[name];
  if (!filename) continue;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">${body}</svg>`;
  await writeFile(path.resolve(toolDir, `../assets/images/${filename}.svg`), svg);
}

const stepStart = source.indexOf('const NODE_GLYPHS =');
const stepEnd = source.indexOf('// <generated:chest-images>', stepStart);
const stepContext = {};
vm.runInNewContext(`${source.slice(stepStart, stepEnd)}\nglobalThis.glyphs = NODE_GLYPHS;`, stepContext);
for (const [name, filename] of [
  ['Звезда', 'step-star.svg'],
  ['Книга', 'step-book.svg'],
]) {
  await writeFile(path.resolve(toolDir, `../assets/images/${filename}`), stepContext.glyphs[name]);
}

const notebookStart = source.indexOf('const GLYPH =');
const notebookEnd = source.indexOf('const TAIL_SVG', notebookStart);
const notebookContext = {};
vm.runInNewContext(`${source.slice(notebookStart, notebookEnd)}\nglobalThis.glyph = GLYPH;`, notebookContext);
await writeFile(path.resolve(toolDir, '../assets/images/banner-notebook.svg'), notebookContext.glyph.notebook);

const glareStart = source.indexOf('const NODE_GLARE =');
const glareEnd = source.indexOf('const GLYPH =', glareStart);
const glareContext = {};
vm.runInNewContext(`${source.slice(glareStart, glareEnd)}\nglobalThis.glare = NODE_GLARE;`, glareContext);
await writeFile(path.resolve(toolDir, '../assets/images/node-glare.svg'), glareContext.glare);
