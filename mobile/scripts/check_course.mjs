import fs from 'node:fs';
import path from 'node:path';

const lessons = JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, '../src/data/course.json'), 'utf8'));
const artIds = new Set(['wave', 'sun', 'day', 'tag', 'person', 'speech']);
if (lessons.length !== 2 || new Set(lessons.map(item => item.id)).size !== 2) throw new Error('Expected two unique lessons');
for (const lesson of lessons) {
  if (lesson.topic !== 0) throw new Error(`${lesson.id}: only the first topic is available`);
  if (lesson.words?.length !== 3) throw new Error(`${lesson.id}: expected three words`);
  if (new Set(lesson.words.map(word => word.komi)).size !== 3) throw new Error(`${lesson.id}: duplicate Komi word`);
  for (const word of lesson.words) {
    if (!word.komi || !word.russian || !artIds.has(word.art)) throw new Error(`${lesson.id}: incomplete word or unknown illustration`);
  }
  if (!lesson.phrase?.komi || !lesson.phrase?.russian || lesson.phrase.tokens?.length !== 2 || !lesson.phrase.distractor) throw new Error(`${lesson.id}: incomplete phrase`);
  if (lesson.phrase.tokens.join(' ') !== lesson.phrase.komi) throw new Error(`${lesson.id}: phrase tokens do not match`);
  if (lesson.phrase.tokens.includes(lesson.phrase.distractor)) throw new Error(`${lesson.id}: distractor repeats an answer`);
}
console.log('Course data OK: 2 lessons, 6 words, 12 lesson screens.');
