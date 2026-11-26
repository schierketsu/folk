import raw from './course.json'

export type ArtId = 'wave' | 'sun' | 'day' | 'tag' | 'person' | 'speech' | 'good' | 'morning' | 'evening' | 'thanks' | 'farewell' | 'goodwill'
export type Word = { komi: string; russian: string; art: ArtId }
export type MatchWord = Pick<Word, 'komi' | 'russian'>
export type Lesson = {
  id: string
  topic: number
  title: string
  words: [Word, Word, Word]
  extraMatches: [MatchWord, MatchWord]
  phrase: { komi: string; russian: string; tokens: [string, string]; distractor: string }
}

export const lessons = raw as Lesson[]

export const topics = [
  { title: 'Здоровайтесь и представляйтесь', place: 'Маньпупунёр', description: 'Отправьтесь в путешествие на Север' },
  { title: 'Расскажите о своей семье' },
  { title: 'Описывайте личные качества' },
  { title: 'Покупайте одежду' },
  { title: 'Говорите о языках' },
  { title: 'Найдите свои вещи' },
] as const
