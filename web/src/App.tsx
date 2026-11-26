import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { lessons, topics } from './data/course'
import type { ArtId, Lesson } from './data/course'
import './App.css'

const image = (name: string) => `/images/${name}.png`
const cardLabel = (value: string) => value.replace(/\p{P}/gu, '').toLocaleLowerCase('ru-RU')
const stagesPerTopic = 5
const stageOffset = (index: number) => -Math.round(98 * Math.sin(index * Math.PI / 4))
const answerOrder = [2, 4, 0, 3, 1]
const scenariosPerStage = 4
const artEmoji: Record<ArtId, string> = { wave: '👋', sun: '☀️', day: '🌤️', tag: '🏷️', person: '🧍', speech: '💬', good: '👍', morning: '🌅', evening: '🌆', thanks: '🙏', farewell: '👋', goodwill: '✨' }
type WordDrag = { source: 'bank' | 'answer'; bankIndex: number; answerPosition: number; pointerId: number; startX: number; startY: number; x: number; y: number; active: boolean }
type MatchFlash = { id: number; left: number; right: number; correct: boolean }

type Progress = { languageSelected: boolean; completed: string[]; chests: number[] }
const initialProgress: Progress = { languageSelected: false, completed: [], chests: [] }
const progressKey = 'folk-web-progress-v1'
const devRunKey = 'folk-web-dev-run-id'
function readProgress(): Progress {
  try {
    if (import.meta.env.DEV && localStorage.getItem(devRunKey) !== import.meta.env.VITE_DEV_RUN_ID) {
      localStorage.removeItem(progressKey)
      localStorage.setItem(devRunKey, import.meta.env.VITE_DEV_RUN_ID)
    }
    const saved = JSON.parse(localStorage.getItem(progressKey) || '{}') as Partial<Progress>
    return {
      languageSelected: saved.languageSelected === true,
      completed: Array.isArray(saved.completed) ? saved.completed : [],
      chests: Array.isArray(saved.chests) ? saved.chests : [],
    }
  } catch {
    return initialProgress
  }
}

function PrimaryButton({ children, onClick, disabled = false, tone = 'green' }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; tone?: 'green' | 'blue' | 'yellow' }) {
  return <button className={`primaryButton ${tone}`} onClick={onClick} disabled={disabled}>{children}</button>
}

function StarRing({ completed }: { completed: number }) {
  const circumference = 2 * Math.PI * 48
  const segmentLength = circumference / scenariosPerStage
  const gapLength = 15
  const gapAngle = gapLength / circumference * 360
  return <div className="starRing">
    <svg className="ringArcs" viewBox="0 0 118 108" aria-hidden="true">
      {Array.from({ length: scenariosPerStage }, (_, index) =>
        <circle key={index} cx="59" cy="54" r="48" fill="none" stroke={index < completed ? 'var(--node-color)' : '#E5E5E5'} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${segmentLength - gapLength} ${circumference}`} transform={`rotate(${-90 + index * 360 / scenariosPerStage + gapAngle / 2} 59 54)`} />
      )}
    </svg>
    <span className="starFace"><img className="starShadow" src={image('map-star')} alt="" /><span className="starMover"><img className="starGlyph" src={image('map-star')} alt="" /></span></span>
  </div>
}

function LockedNode() {
  return <div className="lockedNode" aria-hidden="true"><span className="lockShadow" /><span className="lockFace"><img src={image('map-star')} alt="" /></span></div>
}

function Modal({ title, body, onClose, primaryLabel = 'ПОНЯТНО', onPrimary = onClose, showIcon = true }: { title: string; body: string; onClose: () => void; primaryLabel?: string; onPrimary?: () => void; showIcon?: boolean }) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])
  return <div className="modalBackdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
    <div className={`modalCard ${showIcon ? '' : 'exitModal'}`} role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      {showIcon && <div className="modalGlyph"><img src={image('map-star')} alt="" /></div>}
      <h2 id="modalTitle">{title}</h2><p>{body}</p>
      <PrimaryButton tone="blue" onClick={onPrimary}>{primaryLabel}</PrimaryButton>
    </div>
  </div>
}

function NewWordCardsIcon() {
  return <svg viewBox="0 0 36 36" width="34" height="34" aria-hidden="true">
    <g className="cardIconBack"><rect x="8" y="7" width="23" height="26" rx="5" fill="#ac65d4" /></g>
    <g className="cardIconFront"><rect x="2" y="3" width="23" height="26" rx="5" fill="#edc5fa" /><path d="m13.5 8.5 2.1 4.5 4.9.7-3.5 3.4.8 4.8-4.3-2.3-4.4 2.3.9-4.8-3.5-3.4 4.8-.7Z" fill="#fff" /></g>
  </svg>
}

function MapScreen({ progress, navigate }: { progress: Progress; navigate: (path: string) => void }) {
  const [selected, setSelected] = useState<number | null>(null)
  const [futureNotice, setFutureNotice] = useState(false)
  const [currentTopic, setCurrentTopic] = useState(0)
  const mapScrollRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const scroll = mapScrollRef.current
    if (!scroll) return
    const updateTopic = () => {
      const threshold = scroll.getBoundingClientRect().top + 70
      let active = 0
      scroll.querySelectorAll<HTMLElement>('.topic').forEach((section, index) => {
        if (section.getBoundingClientRect().top <= threshold) active = index
      })
      setCurrentTopic(active)
    }
    updateTopic()
    scroll.addEventListener('scroll', updateTopic, { passive: true })
    window.addEventListener('resize', updateTopic)
    return () => { scroll.removeEventListener('scroll', updateTopic); window.removeEventListener('resize', updateTopic) }
  }, [])

  return <div className="mapScreen">
    <div className={`mapFixed topic${currentTopic}`}>
      <div className="statsBar">
        <button className="avatar" aria-label="Открыть профиль" onClick={() => navigate('/profile')} />
      </div>
      <div className="topicBanner"><span>МОДУЛЬ 1, РАЗДЕЛ {currentTopic + 1}</span><h2>{topics[currentTopic].title}</h2></div>
      <div className="mapFixedShortcuts"><button className="mapShortcut cardShortcut" aria-label="Открыть карточки" onClick={() => navigate('/cards')}><NewWordCardsIcon /></button></div>
    </div>
    <div className="mapScroll" ref={mapScrollRef}>
      {topics.map((topic, topicIndex) => <section className={`topic topic${topicIndex} ${topicIndex > 0 ? 'laterTopic' : ''}`} key={topic.title}>
        {topicIndex > 0 && <div className="topicDivider"><span>{topic.title}</span></div>}
        <div className="mapPath">
          {Array.from({ length: stagesPerTopic }, (_, stageIndex) => topicIndex * stagesPerTopic + stageIndex).map(index => {
            const stageLessons = lessons.slice(index * scenariosPerStage, (index + 1) * scenariosPerStage)
            const previousStageLessons = lessons.slice((index - 1) * scenariosPerStage, index * scenariosPerStage)
            const completed = stageLessons.filter(lesson => progress.completed.includes(lesson.id)).length
            const unlocked = index === 0 || previousStageLessons.length === scenariosPerStage && previousStageLessons.every(lesson => progress.completed.includes(lesson.id))
            const futureStage = index === 1 && stageLessons.length === 0
            const nextLesson = stageLessons.find(lesson => !progress.completed.includes(lesson.id))
            return <div className={`mapStageSlot ${selected === index ? 'active' : ''}`} key={index}>
              <div className="mapStage">
                <button className="mapNode" style={{ '--offset': `${stageOffset(index)}px` } as CSSProperties} aria-label={futureStage ? 'Этап 2: ожидается в будущем' : completed === scenariosPerStage ? `Этап ${index + 1} пройден` : unlocked && stageLessons.length ? `Этап ${index + 1}: ${completed} из ${scenariosPerStage} сценариев` : `Раздел ${topicIndex + 1}, пункт ${index % stagesPerTopic + 1}: закрыто`} disabled={!futureStage && (!unlocked || !stageLessons.length || completed === scenariosPerStage)} onClick={() => futureStage ? setFutureNotice(true) : setSelected(selected === index ? null : index)}>{unlocked && stageLessons.length ? <StarRing completed={completed} /> : <LockedNode />}</button>
                {index === 2 && <button className="mapPlace" aria-label="Открыть карточку Маньпупунёра" onClick={() => navigate('/place/0')}>
                  <img className="mapPlaceImage" src={image('place-manpupuner-map')} alt="" />
                  <span className="placeStars"><img className="dim" src={image('map-star')} alt="" /><img className="dim raised" src={image('map-star')} alt="" /><img className="dim" src={image('map-star')} alt="" /></span>
                </button>}
              </div>
              {selected === index && unlocked && nextLesson && <div className="lessonPopover"><h3>{nextLesson.title}</h3><button onClick={() => navigate(`/lesson/${nextLesson.id}`)}>УЧИТЬСЯ</button></div>}
            </div>
          })}
        </div>
      </section>)}
    </div>
    {futureNotice && <Modal title="Ожидается в будущем" body="Новые сценарии появятся позже." onClose={() => setFutureNotice(false)} showIcon={false} />}
  </div>
}

function CloseIcon() {
  return <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true"><path d="M5 5 29 29M29 5 5 29" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>
}

function PageHeader({ title, onClose, lessonStyle = false }: { title?: string; onClose: () => void; lessonStyle?: boolean }) {
  return <header className={`pageHeader ${lessonStyle ? 'lessonStyleHeader' : ''}`}><button aria-label="Назад" onClick={onClose}>{lessonStyle ? <CloseIcon /> : '×'}</button>{title && <><h2>{title}</h2><span className="headerSpacer" /></>}</header>
}

function LanguageScreen({ navigate, selectLanguage }: { navigate: (path: string) => void; selectLanguage: () => void }) {
  const [selected, setSelected] = useState(false)
  const chooseLanguage = () => { selectLanguage(); navigate('/home') }
  return <div className="fullScreen">
    <div className="screenBody languageBody">
      <h1>Какой язык будем изучать?</h1>
      <button className={`languageOption ${selected ? 'selected' : ''}`} onClick={() => setSelected(true)} aria-pressed={selected}><span className="komiFlag" aria-hidden="true"><i /><i /><i /></span><strong>Коми</strong></button>
      <div className="unavailableLanguage" aria-disabled="true"><span className="languagePlaceholder" aria-hidden="true" /><strong>Новые языки</strong><small>СКОРО</small></div>
    </div>
    <div className="screenFooter languageFooter"><PrimaryButton tone="blue" onClick={chooseLanguage} disabled={!selected}>ПРОДОЛЖИТЬ</PrimaryButton></div>
  </div>
}

function LessonScreen({ lesson, navigate, progress, complete }: { lesson: Lesson; navigate: (path: string) => void; progress: Progress; complete: (id: string) => void }) {
  const [stepQueue, setStepQueue] = useState<number[]>([1, 2, 3, 4, 5])
  const [solvedSteps, setSolvedSteps] = useState<number[]>([])
  const step = stepQueue[0]
  const [selected, setSelected] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [left, setLeft] = useState<number | null>(null)
  const [right, setRight] = useState<number | null>(null)
  const [matchFlashes, setMatchFlashes] = useState<MatchFlash[]>([])
  const matchTimersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set())
  const nextMatchFlashId = useRef(0)
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [exitModal, setExitModal] = useState(false)
  const [wordHintOpen, setWordHintOpen] = useState(false)
  const [soundAnimation, setSoundAnimation] = useState(0)
  const newWordBlockRef = useRef<HTMLDivElement | null>(null)
  const wordDrag = useRef<WordDrag | null>(null)
  const ignoreClickUntil = useRef(0)
  const [dragPreview, setDragPreview] = useState<WordDrag | null>(null)
  const [dropZone, setDropZone] = useState<'bank' | 'answer' | null>(null)
  useEffect(() => () => {
    matchTimersRef.current.forEach(clearTimeout)
  }, [])
  useEffect(() => {
    if (!wordHintOpen) return
    const closeHint = (event: PointerEvent) => {
      if (!newWordBlockRef.current?.contains(event.target as Node)) setWordHintOpen(false)
    }
    document.addEventListener('pointerdown', closeHint)
    return () => document.removeEventListener('pointerdown', closeHint)
  }, [wordHintOpen])
  const words = lesson.words
  const matchWords = [...words, ...lesson.extraMatches]
  const phrase = lesson.phrase
  const other = lessons.find(item => item.id !== lesson.id)?.words[0] || words[0]
  const pictureWords = [...words, other]
  const bank = [phrase.tokens[1], phrase.distractor, phrase.tokens[0]]
  const response = selected.map(index => bank[index])
  const titles = ['Выберите верную картинку', 'Что значит слово?', 'Соберите фразу', 'Нажмите на пары', 'Выберите слово']
  const correctAnswer = step === 1 ? words[0].russian : step === 2 ? words[1].russian : step === 3 ? phrase.komi : words[2].komi
  const fail = () => { setCorrect(false); setChecked(true) }
  const evaluate = () => {
    const success = step === 1 ? selected[0] === 0 : step === 2 ? selected[0] === 1 : step === 3 ? JSON.stringify(response) === JSON.stringify(phrase.tokens) : selected[0] === 2
    if (success) { setCorrect(true); setChecked(true) } else fail()
  }
  const next = () => {
    if (!checked) return
    if (correct && stepQueue.length === 1) {
      const first = !progress.completed.includes(lesson.id)
      complete(lesson.id)
      navigate(`/result/${lesson.id}?first=${first ? 1 : 0}`)
      return
    }
    if (correct) setSolvedSteps(value => [...value, step])
    setStepQueue(value => correct ? value.slice(1) : [...value.slice(1), value[0]])
    matchTimersRef.current.forEach(clearTimeout)
    matchTimersRef.current.clear()
    setSelected([]); setMatched([]); setLeft(null); setRight(null); setMatchFlashes([]); setChecked(false); setCorrect(false); setWordHintOpen(false); setSoundAnimation(0)
  }
  const chooseMatch = (side: 'left' | 'right', index: number) => {
    if (checked || matched.includes(index) || matchFlashes.some(flash => flash[side] === index)) return
    const newLeft = side === 'left' ? index : left
    const newRight = side === 'right' ? index : right
    if (newLeft !== null && newRight !== null) {
      setLeft(null); setRight(null)
      const isCorrect = newLeft === newRight
      const flash = { id: nextMatchFlashId.current++, left: newLeft, right: newRight, correct: isCorrect }
      setMatchFlashes(value => [...value, flash])
      const timer = setTimeout(() => {
        setMatchFlashes(value => value.filter(item => item.id !== flash.id))
        matchTimersRef.current.delete(timer)
      }, 1000)
      matchTimersRef.current.add(timer)
      if (isCorrect) {
        const updated = [...matched, newLeft]
        setMatched(updated)
        if (updated.length === matchWords.length) { setCorrect(true); setChecked(true) }
      }
    } else { setLeft(newLeft); setRight(newRight) }
  }
  const startWordDrag = (event: React.PointerEvent<HTMLButtonElement>, source: WordDrag['source'], bankIndex: number, answerPosition = -1) => {
    if (checked || event.button !== 0) return
    wordDrag.current = { source, bankIndex, answerPosition, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, x: event.clientX, y: event.clientY, active: false }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const moveWordDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = wordDrag.current
    if (!drag || drag.pointerId !== event.pointerId) return
    if (!drag.active && Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) < 6) return
    drag.active = true
    drag.x = event.clientX
    drag.y = event.clientY
    setDragPreview({ ...drag })
    const target = document.elementFromPoint(drag.x, drag.y)?.closest<HTMLElement>('[data-answer-position], [data-bank-index], [data-word-drop]')
    setDropZone(target?.dataset.answerPosition !== undefined || target?.dataset.wordDrop === 'answer' ? 'answer' : target?.dataset.bankIndex !== undefined || target?.dataset.wordDrop === 'bank' ? 'bank' : null)
  }
  const endWordDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = wordDrag.current
    if (!drag || drag.pointerId !== event.pointerId) return
    if (drag.active) {
      ignoreClickUntil.current = performance.now() + 400
      const target = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>('[data-answer-position], [data-bank-index], [data-word-drop]')
      const answerPosition = target?.dataset.answerPosition
      const toAnswer = answerPosition !== undefined || target?.dataset.wordDrop === 'answer'
      const toBank = target?.dataset.bankIndex !== undefined || target?.dataset.wordDrop === 'bank'
      setSelected(current => {
        const next = [...current]
        if (drag.source === 'bank' && toAnswer) {
          if (answerPosition !== undefined) next[Number(answerPosition)] = drag.bankIndex
          else next.push(drag.bankIndex)
        } else if (drag.source === 'answer' && toAnswer) {
          if (answerPosition !== undefined) [next[drag.answerPosition], next[Number(answerPosition)]] = [next[Number(answerPosition)], next[drag.answerPosition]]
          else { next.splice(drag.answerPosition, 1); next.push(drag.bankIndex) }
        } else if (drag.source === 'answer' && toBank) next.splice(drag.answerPosition, 1)
        return next
      })
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    wordDrag.current = null
    setDragPreview(null)
    setDropZone(null)
  }
  const cancelWordDrag = () => { wordDrag.current = null; setDragPreview(null); setDropZone(null) }
  const wordPointerHandlers = { onPointerMove: moveWordDrag, onPointerUp: endWordDrag, onPointerCancel: cancelWordDrag }
  const ignoreDraggedClick = () => performance.now() < ignoreClickUntil.current
  const revealWord = () => setWordHintOpen(value => !value)
  const newWordPrompt = (word: Lesson['words'][number]) => <div className="newWordBlock" ref={newWordBlockRef}>
    <div className="wordPrompt"><button className="soundButton" aria-label="Озвучить слово" onClick={() => setSoundAnimation(value => value + 1)}><span className={`soundIcon ${soundAnimation ? 'playing' : ''}`} key={soundAnimation} aria-hidden="true"><img className="soundSpeaker" src={image('sound-icon')} alt="" /><img className="soundWaveInner" src={image('sound-icon')} alt="" /><img className="soundWaveOuter" src={image('sound-icon')} alt="" /></span></button><button className="newWord" onClick={revealWord} aria-expanded={wordHintOpen} aria-label={`Показать перевод слова ${word.komi}`}>{word.komi}</button></div>
    {wordHintOpen && <div className="wordHint" role="status"><strong>{word.russian}</strong></div>}
  </div>
  return <div className={`fullScreen lessonScreen ${step <= 2 ? 'newWordLesson' : ''} ${step === 1 ? 'pictureLesson' : ''} ${checked ? correct ? 'answerCorrect' : 'answerWrong' : ''}`}>
    <header className="lessonHeader"><button aria-label="Закрыть урок" onClick={() => setExitModal(true)}><CloseIcon /></button><div className="progressTrack"><span style={{ width: `${(solvedSteps.length + (checked && correct ? 1 : 0)) / 5 * 100}%` }} /></div></header>
    <div className="screenBody lessonBody">
      {step <= 2 && <div className="newWordEyebrow"><span className="bookBadge" aria-hidden="true"><NewWordCardsIcon /></span><span>Новое слово</span></div>}
      <div className="lessonTitleRow"><h1>{titles[step - 1]}</h1></div>
      {step === 1 && <>
        {newWordPrompt(words[0])}
        <div className="pictureGrid">{pictureWords.map((word, index) => {
          const greetingChoice = (lesson.id === 'hello_words' && index === 0) || (lesson.id === 'name_words' && index === 3)
          const placeholderChoice = lesson.id === 'name_words' && index < 3
          const sunChoice = lesson.id === 'hello_words' && index === 1
          const breadChoice = lesson.id === 'hello_words' && index === 2
          const forestChoice = lesson.id === 'hello_words' && index === 3
          const artName = greetingChoice ? 'greeting-choice' : sunChoice ? 'sun-choice' : breadChoice ? 'bread-choice' : forestChoice ? 'forest-choice' : null
          return <button key={index} className={`pictureChoice ${selected[0] === index ? 'chosen' : ''}`} onClick={() => !checked && setSelected([index])} aria-pressed={selected[0] === index}>
            {placeholderChoice ? <span className="picturePlaceholder" aria-hidden="true" /> : artName ? <img className={`pictureArt ${greetingChoice ? 'greetingArt' : ''} ${breadChoice ? 'breadArt' : ''}`} src={image(artName)} alt="" /> : <span className="pictureEmoji" aria-hidden="true">{artEmoji[word.art]}</span>}
            <span className="pictureLabel">{cardLabel(greetingChoice ? 'Привет' : sunChoice ? 'Солнце' : breadChoice ? 'Хлеб' : forestChoice ? 'Лес' : word.russian)}</span>
          </button>
        })}</div>
      </>}
      {step === 2 && <>
        {newWordPrompt(words[1])}
        <div className="choiceList">{words.map((word, index) => <button key={index} className={`textChoice ${selected[0] === index ? 'chosen' : ''}`} onClick={() => !checked && setSelected([index])} aria-pressed={selected[0] === index}>{cardLabel(word.russian)}</button>)}</div>
      </>}
      {step === 3 && <>
        <h2 className="phrasePrompt">{phrase.russian}</h2>
        <div className={`answerArea ${dropZone === 'answer' ? 'dropActive' : ''}`} data-word-drop="answer">{selected.map((index, position) => <button className={`wordChip chosen ${dragPreview?.source === 'answer' && dragPreview.answerPosition === position ? 'dragSource' : ''}`} key={position} data-answer-position={position} onPointerDown={event => startWordDrag(event, 'answer', index, position)} {...wordPointerHandlers} onClick={() => { if (!checked && !ignoreDraggedClick()) setSelected(old => old.filter((_, at) => at !== position)) }}>{cardLabel(bank[index])}</button>)}</div>
        <div className={`wordBank ${dropZone === 'bank' ? 'dropActive' : ''}`} data-word-drop="bank">{bank.map((word, index) => <button className={`wordChip ${selected.includes(index) ? 'used' : ''} ${dragPreview?.source === 'bank' && dragPreview.bankIndex === index ? 'dragSource' : ''}`} key={index} data-bank-index={index} disabled={selected.includes(index) || checked} onPointerDown={event => startWordDrag(event, 'bank', index)} {...wordPointerHandlers} onClick={() => { if (!ignoreDraggedClick()) setSelected(old => [...old, index]) }}><span>{cardLabel(word)}</span></button>)}</div>
      </>}
      {step === 4 && <>
        <div className="matchGrid"><div>{matchWords.map((word, index) => { const flash = matchFlashes.find(item => item.left === index); return <button key={index} className={`matchChoice ${matched.includes(index) ? 'matched' : ''} ${left === index ? 'chosen' : ''} ${flash ? flash.correct ? 'correctFlash' : 'wrongFlash' : ''}`} disabled={matched.includes(index) || checked || !!flash} onClick={() => chooseMatch('left', index)}>{cardLabel(word.komi)}</button> })}</div><div>{answerOrder.map(index => { const flash = matchFlashes.find(item => item.right === index); return <button key={index} className={`matchChoice ${matched.includes(index) ? 'matched' : ''} ${right === index ? 'chosen' : ''} ${flash ? flash.correct ? 'correctFlash' : 'wrongFlash' : ''}`} disabled={matched.includes(index) || checked || !!flash} onClick={() => chooseMatch('right', index)}>{cardLabel(matchWords[index].russian)}</button> })}</div></div>
      </>}
      {step === 5 && <>
        <h2 className="phrasePrompt">{words[2].russian}</h2>
        <div className="choiceList">{words.map((word, index) => <button key={index} className={`textChoice ${selected[0] === index ? 'chosen' : ''}`} onClick={() => !checked && setSelected([index])} aria-pressed={selected[0] === index}>{cardLabel(word.komi)}</button>)}</div>
      </>}
    </div>
    {dragPreview && <div className="wordChip wordDragPreview" style={{ left: dragPreview.x, top: dragPreview.y }}>{cardLabel(bank[dragPreview.bankIndex])}</div>}
    {checked ? <div className={`answerPanel ${correct ? 'right' : 'wrong'}`} role="status">
      <div className="answerPanelHeading"><span className="answerPanelIcon" aria-hidden="true"><img src={image(correct ? 'status-check' : 'status-cross')} alt="" /></span><strong>{correct ? 'Здорово!' : 'Неверно'}</strong></div>
      {!correct && <div className="answerExplanation"><strong>Правильный ответ:</strong><span>{correctAnswer}</span></div>}
      <PrimaryButton onClick={next}>{correct ? 'ПРОДОЛЖИТЬ' : 'ПОНЯТНО'}</PrimaryButton>
    </div> : <div className="screenFooter"><PrimaryButton tone="blue" onClick={evaluate} disabled={step === 4 || selected.length === 0}>{step === 4 ? 'ПРОДОЛЖИТЬ' : 'ПРОВЕРИТЬ'}</PrimaryButton></div>}
    {exitModal && <Modal title="Выйти из урока?" body="Текущий урок начнётся заново, когда вы вернётесь." onClose={() => setExitModal(false)} primaryLabel="СОГЛАСЕН" onPrimary={() => navigate('/home')} showIcon={false} />}
  </div>
}

function ResultScreen({ query, navigate }: { query: URLSearchParams; navigate: (path: string) => void }) {
  const reward = query.get('first') === '0' ? 0 : 15
  const [shareStatus, setShareStatus] = useState('')
  const shareResult = async () => {
    const text = `Я прошёл урок в ФОЛК и получил ${reward} очков опыта.`
    try {
      if (navigator.share) await navigator.share({ text })
      else { await navigator.clipboard.writeText(text); setShareStatus('Результат скопирован') }
    } catch { /* Пользователь закрыл системное окно обмена. */ }
  }
  return <div className="fullScreen resultScreen">
    <div className="resultBody">
      <h1>Конец урока!</h1>
      <div className="resultAwards">
        <div className="resultAward experience"><span>ОЧКИ ОПЫТА</span><div className="resultAwardValue"><img className="resultLightning" src={image('result-lightning')} alt="" /><strong>{reward}</strong></div></div>
      </div>
    </div>
    <div className="screenFooter resultFooter"><button className="shareResultButton" onClick={shareResult} aria-label="Поделиться результатом"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 21V4m0 0-6 6m6-6 6 6M7 17v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button><PrimaryButton tone="blue" onClick={() => navigate('/home')}>{reward ? 'ЗАБРАТЬ ОПЫТ' : 'НА КАРТУ'}</PrimaryButton><span className="srOnly" role="status">{shareStatus}</span></div>
  </div>
}

function PlaceScreen({ topic, navigate }: { topic: number; navigate: (path: string) => void }) {
  const shanga = topic === 1
  const title = shanga ? 'Шаньга' : 'Маньпупунёр'
  if (!shanga) return <div className="fullScreen placeScreenManpupuner">
    <PageHeader title={title} onClose={() => navigate('/home')} lessonStyle />
    <div className="placeBody">
      <div className="placeRating"><img className="dim" src={image('map-star')} alt="" /><img className="dim raised" src={image('map-star')} alt="" /><img className="dim" src={image('map-star')} alt="" /></div>
      <p>{topics[0].description}</p>
      <button className="primaryButton" disabled>СКОРО</button>
      <img className="placeHero" src={image('place-manpupuner-extended-v2')} alt="" />
    </div>
  </div>
  return <div className="fullScreen"><PageHeader onClose={() => navigate('/home')} lessonStyle /><div className="placeBody"><img className="placeHero" src={image('place-shanga-card')} alt={title} /><h1>{title}</h1><div className="placeRating"><img src={image('map-star')} alt="" /><img className="dim raised" src={image('map-star')} alt="" /><img className="dim" src={image('map-star')} alt="" /></div><p>Вместе приготовим традиционные пирожки</p></div><div className="screenFooter"><PrimaryButton tone="blue" onClick={() => navigate('/home')}>НА КАРТУ</PrimaryButton></div></div>
}

function ChestScreen({ topic, progress, openChest, navigate }: { topic: number; progress: Progress; openChest: (topic: number) => void; navigate: (path: string) => void }) {
  const opened = progress.chests.includes(topic)
  return <div className="fullScreen"><PageHeader title="Награда" onClose={() => navigate('/home')} /><div className="chestBody"><img src={image(opened ? 'chest-open' : 'chest-closed')} alt="" /><h1>{opened ? 'Сундук открыт!' : 'Вы прошли тему!'}</h1><p>{opened ? '+50 ягод получено' : 'Откройте сундук и получите 50 ягод'}</p></div><div className="screenFooter"><PrimaryButton tone="blue" onClick={() => opened ? navigate('/home') : openChest(topic)}>{opened ? 'НА КАРТУ' : 'ОТКРЫТЬ'}</PrimaryButton></div></div>
}

function SimpleTab({ title, navigate }: { title: string; navigate: (path: string) => void }) {
  return <div className="tabScreen"><PageHeader title={title} onClose={() => navigate('/home')} lessonStyle /><div className="tabContent" /></div>
}
function ProfileScreen({ navigate }: { navigate: (path: string) => void }) {
  return <div className="fullScreen profileScreen"><PageHeader title="Профиль" onClose={() => navigate('/home')} lessonStyle /></div>
}

export default function App() {
  const [progress, setProgress] = useState(readProgress)
  const [route, setRoute] = useState(() => progress.languageSelected ? window.location.hash.slice(1) || '/home' : '/language')
  useEffect(() => { localStorage.setItem(progressKey, JSON.stringify(progress)) }, [progress])
  useEffect(() => {
    if (window.location.hash.slice(1) !== route) window.history.replaceState(null, '', `#${route}`)
  }, [route])
  useEffect(() => {
    const update = () => setRoute(window.location.hash.slice(1) || '/home')
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])
  const navigate = (path: string) => { window.location.hash = path; setRoute(path); window.scrollTo({ top: 0, behavior: 'instant' }) }
  const selectLanguage = () => setProgress(value => ({ ...value, languageSelected: true }))
  const complete = (id: string) => setProgress(value => ({ ...value, completed: value.completed.includes(id) ? value.completed : [...value.completed, id] }))
  const openChest = (topic: number) => setProgress(value => ({ ...value, chests: value.chests.includes(topic) ? value.chests : [...value.chests, topic] }))
  const [path, search = ''] = route.split('?')
  const parts = path.split('/').filter(Boolean)
  const lesson = lessons.find(item => item.id === parts[1])

  return <div className="desktopCanvas"><div className="phoneFrame"><main className={`appShell ${parts[0] === 'place' && (Number(parts[1]) || 0) === 0 ? 'placeStatusShell' : ''}`}><div className="phoneStatusBar" aria-hidden="true" />
    {parts[0] === 'language' && <LanguageScreen navigate={navigate} selectLanguage={selectLanguage} />}
    {(parts[0] === 'home' || parts.length === 0) && <MapScreen progress={progress} navigate={navigate} />}
    {parts[0] === 'lesson' && lesson && <LessonScreen key={lesson.id} lesson={lesson} navigate={navigate} progress={progress} complete={complete} />}
    {parts[0] === 'result' && lesson && <ResultScreen query={new URLSearchParams(search)} navigate={navigate} />}
    {parts[0] === 'place' && <PlaceScreen topic={Number(parts[1]) || 0} navigate={navigate} />}
    {parts[0] === 'chest' && <ChestScreen topic={Number(parts[1]) || 0} progress={progress} openChest={openChest} navigate={navigate} />}
    {parts[0] === 'cards' && <SimpleTab title="Карточки" navigate={navigate} />}
    {parts[0] === 'profile' && <ProfileScreen navigate={navigate} />}
    {!['language','home','lesson','result','place','chest','cards','profile'].includes(parts[0] || 'home') && <MapScreen progress={progress} navigate={navigate} />}
  </main><div className="phoneSkin" aria-hidden="true" /></div></div>
}
