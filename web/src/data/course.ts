import raw from './course.json'

export type ArtId = 'wave' | 'sun' | 'day' | 'tag' | 'person' | 'speech'
export type Word = { komi: string; russian: string; art: ArtId }
export type Lesson = {
  id: string
  topic: number
  title: string
  words: [Word, Word, Word]
  phrase: { komi: string; russian: string; tokens: [string, string]; distractor: string }
}

export const lessons = raw as Lesson[]

export const topics = [
  { title: 'Знакомство и приветствия', place: 'Маньпупунёр', description: 'Отправьтесь в путешествие на Север' },
  { title: 'Новые слова и фразы' },
] as const
