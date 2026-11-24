import raw from './course.json';
import type { WordArt } from '../components/WordIllustration';

export type Word = { komi: string; russian: string; art: WordArt };
export type Phrase = { komi: string; russian: string; tokens: string[]; distractor: string };
export type Lesson = { id: string; topic: number; title: string; words: [Word, Word, Word]; phrase: Phrase };
export const lessons = raw as Lesson[];
export const topics = [
  { title: 'Знакомство и приветствия', place: 'Маньпупунёр', description: 'Отправьтесь в путешествие на Север' },
  { title: 'Еда и традиции', place: 'Шаньга', description: 'Вместе приготовим традиционные пирожки' },
];
export const lessonsForTopic = (topic: number) => lessons.filter(item => item.topic === topic);
export const topicOf = (id: string) => lessons.find(item => item.id === id)?.topic ?? 0;
