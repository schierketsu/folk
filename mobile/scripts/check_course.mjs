import fs from 'node:fs';
import path from 'node:path';
const lessons = JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, '../src/data/course.json'), 'utf8'));
if (lessons.length !== 12 || new Set(lessons.map(x => x.id)).size !== 12) throw new Error('Expected 12 unique lessons');
if (lessons.reduce((sum, lesson) => sum + lesson.steps.length, 0) !== 36) throw new Error('Expected 36 exercises');
for (const lesson of lessons) {
  if (lesson.steps.length !== 3) throw new Error(`${lesson.id}: expected 3 steps`);
  for (const step of lesson.steps) {
    if (step.kind === 'choice' && !step.options[step.correct]) throw new Error(`${lesson.id}: invalid answer index`);
    if (step.kind === 'arrange' && (!step.answer?.length || step.answer.some(word => !step.options.includes(word)))) throw new Error(`${lesson.id}: invalid phrase`);
  }
}
console.log('Course data OK: 2 topics, 12 lessons, 36 exercises.');
