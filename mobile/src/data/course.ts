import raw from './course.json';

export type Step = { kind: 'choice' | 'arrange'; question: string; options: string[]; correct?: number; answer?: string[]; note: string };
export type Lesson = { id: string; topic: number; title: string; foxLine: string; steps: Step[] };
export const lessons = raw as Lesson[];
export const topics = [
  { title: 'Знакомство и приветствия', place: 'Маньпупунёр', description: 'Отправьтесь в путешествие на Север' },
  { title: 'Еда и традиции', place: 'Шаньга', description: 'Вместе приготовим традиционные пирожки' },
];
export const lessonsForTopic = (topic: number) => lessons.filter(item => item.topic === topic);
export const topicOf = (id: string) => lessons.find(item => item.id === id)?.topic ?? 0;
