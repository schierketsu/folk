import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { lessons, topics } from './data/course'
import type { Lesson } from './data/course'
import { SpeakerIcon, WordArt } from './components/WordArt'
import './App.css'

const image = (name: string) => `/images/${name}.png`
const offsets = [0, -70, -98, -70, 0, 70]
const answerOrder = [2, 0, 1]

type Progress = { languageSelected: boolean; completed: string[]; chests: number[]; hearts: number; wrong: number }
const initialProgress: Progress = { languageSelected: false, completed: [], chests: [], hearts: 5, wrong: 0 }
function readProgress(): Progress {
  try {
    const saved = JSON.parse(localStorage.getItem('folk-web-progress-v1') || '{}') as Partial<Progress>
    return { ...initialProgress, ...saved }
  } catch {
    return initialProgress
  }
}

function PrimaryButton({ children, onClick, disabled = false, tone = 'green' }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; tone?: 'green' | 'brown' | 'blue' | 'yellow' }) {
  return <button className={`primaryButton ${tone}`} onClick={onClick} disabled={disabled}>{children}</button>
}

function StarRing({ active, color = 'brown' }: { active: boolean; color?: 'brown' | 'blue' }) {
  return <div className={`starRing ${color}`}>
    {active && <svg className="ringArcs" viewBox="0 0 118 108" aria-hidden="true">
      <path d="M52 6 A52 44 0 0 0 7 44 M7 56 C10 78 27 98 52 98 M66 98 C91 98 108 78 111 56" fill="none" stroke="#E5E5E5" strokeWidth="8" strokeLinecap="round" />
      <path d="M111 44 A52 44 0 0 0 66 6" fill="none" stroke="var(--node-color)" strokeWidth="8" strokeLinecap="round" />
    </svg>}
    <span className="starShadow" /><span className="starFace"><img src={image('map-star')} alt="" /></span>
  </div>
}

function LockedNode() {
  return <div className="lockedNode" aria-hidden="true"><span className="lockShadow" /><span className="lockFace"><svg width="30" height="32" viewBox="0 0 36 36"><path d="M6 19v-7a12 12 0 0 1 24 0v7h-5v-7a7 7 0 0 0-14 0v7H6Z" fill="#AFAFAF" /><path d="M4 17h28a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V20a3 3 0 0 1 3-3Z" fill="#AFAFAF" /></svg></span></div>
}

function Cloud({ className }: { className: string }) {
  return <svg className={`cloudShape ${className}`} viewBox="0 0 360 160" aria-hidden="true">
    <defs><linearGradient id={`cloud-${className}`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#FFFFFF" /><stop offset="1" stopColor="#DDEDF4" /></linearGradient></defs>
    <path d="M29 130c-17 0-28-11-28-25 0-16 13-28 30-28 4-22 23-37 46-35 12-26 40-42 69-35 17-16 44-18 63-3 28-7 53 9 61 32 23-1 42 14 45 35 25 1 43 18 43 40 0 22-18 39-42 39H35Z" fill={`url(#cloud-${className})`} stroke="#C8E0EA" strokeWidth="3" />
    <path d="M34 111c13-12 26-14 39-11M102 74c20-16 41-19 59-12M214 47c19-3 35 2 48 15" fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" opacity=".65" />
  </svg>
}

function FogBank() {
  return <div className="fogBank" aria-label="Продолжение пути скрыто облаками">
    {[2, 3, 4, 5].map(index => <div key={index} className="fogStage" style={{ '--offset': `${offsets[index]}px` } as CSSProperties}><LockedNode /></div>)}
    <div className="fogHaze" />
    <Cloud className="cloudA" /><Cloud className="cloudB" /><Cloud className="cloudC" /><Cloud className="cloudD" /><Cloud className="cloudE" />
  </div>
}

function Modal({ title, body, onClose, secondary }: { title: string; body: string; onClose: () => void; secondary?: { label: string; onClick: () => void } }) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])
  return <div className="modalBackdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
    <div className="modalCard" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div className="modalGlyph"><img src={image('map-star')} alt="" /></div>
      <h2 id="modalTitle">{title}</h2><p>{body}</p>
      <PrimaryButton tone="brown" onClick={onClose}>ПОНЯТНО</PrimaryButton>
      {secondary && <button className="modalSecondary" onClick={secondary.onClick}>{secondary.label}</button>}
    </div>
  </div>
}

function NavIcon({ tab }: { tab: string }) {
  if (tab === 'home') return <svg viewBox="0 0 24 24"><path d="M2.5 20.5C2.5 11 6.8 5.5 12 5.5S21.5 11 21.5 20.5Z" fill="#F08A3C" /><path d="M7.6 20.5v-4.3a4.4 4.4 0 0 1 8.8 0v4.3Z" fill="#6E3810" /><path d="M8.6 7.6C9.6 5.4 10.8 4 12 3.6c.4 1 .4 1.8 0 2.6M12 6.2c1.4-1.8 2.6-2.6 3.8-2.6-.1 1.2-.7 2.2-1.6 2.8" fill="#58CC02" /><rect x="1.5" y="19.6" width="21" height="2.4" rx="1.2" fill="#D9701F" /></svg>
  if (tab === 'tasks') return <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="15" rx="2" fill="#B2651A" /><path d="M5 5v15M19 5v15M3 11h18" stroke="#FFC800" strokeWidth="3" /><rect x="10" y="8" width="4" height="6" rx="1" fill="#FFE14A" /></svg>
  if (tab === 'ranking') return <svg viewBox="0 0 24 24"><path d="M4.4 9.2C3 6.6 4.9 4 7.4 4.6 8 2.6 10 2 12 2s4 .6 4.6 2.6c2.5-.6 4.4 2 3 4.6-.9 1.8-2.3 4.4-5.3 6H9.7c-3-1.6-4.4-4.2-5.3-6z" fill="#1CB0F6" /><path d="M11 15h2v4h-2zM7 19h10v3H7z" fill="#1899D6" /></svg>
  return <svg viewBox="0 0 24 24"><path d="M3 6.5A3.5 3.5 0 0 1 6.5 3h11A3.5 3.5 0 0 1 21 6.5v8a3.5 3.5 0 0 1-3.5 3.5H9.4L5 21.4V18A3.5 3.5 0 0 1 3 14.5z" fill="#F287C2" /><path d="M12 15s-4-2.5-4-5a2.3 2.3 0 0 1 4-1.4A2.3 2.3 0 0 1 16 10c0 2.5-4 5-4 5Z" fill="#FFE8F4" /></svg>
}

function TabBar({ active, navigate }: { active: string; navigate: (path: string) => void }) {
  const tabs = [{ id: 'home', label: 'Главная' }, { id: 'tasks', label: 'Задания' }, { id: 'ranking', label: 'Рейтинг' }, { id: 'feed', label: 'Лента' }]
  return <nav className="tabBar" aria-label="Основные разделы">{tabs.map(tab => <button key={tab.id} className={active === tab.id ? 'tab active' : 'tab'} aria-label={tab.label} aria-current={active === tab.id ? 'page' : undefined} onClick={() => navigate(`/${tab.id}`)}><NavIcon tab={tab.id} /></button>)}</nav>
}

function MapScreen({ progress, navigate }: { progress: Progress; navigate: (path: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [modal, setModal] = useState(false)
  const firstDone = progress.completed.includes(lessons[0].id)
  const completedCount = lessons.filter(item => progress.completed.includes(item.id)).length
  const future = () => { setSelected(null); setModal(true) }

  return <div className="mapScreen">
    <div className="mapScroll">
      <div className="statsBar">
        <button className="avatar" aria-label="Открыть профиль" onClick={() => navigate('/profile')} />
        <div className="counters"><span><img src={image('cranberry')} alt="" />{completedCount * 15 + progress.chests.length * 50}</span><span><img src={image('fire')} alt="" />{completedCount}</span></div>
      </div>
      {[0, 1].map(topic => <section key={topic} className={`topic topic${topic}`}>
        <div className="topicBanner"><span>МОДУЛЬ 1, ТЕМА {topic + 1}</span><h2>{topics[topic].title}</h2></div>
        <div className="mapPath">
          {(topic === 0 ? [0, 1, 2, 3, 4, 5] : [0, 1]).map(index => {
            const lesson = topic === 0 ? lessons[index] : undefined
            const unlocked = topic === 0 && (index === 0 || index === 1 && firstDone)
            const done = lesson && progress.completed.includes(lesson.id)
            return <div key={index}>
              <div className="mapStage">
                <button className="mapNode" style={{ '--offset': `${offsets[index]}px` } as CSSProperties} aria-label={lesson?.title || `Закрытый урок ${index + 1}`} onClick={() => {
                  if (unlocked && lesson) setSelected(selected === lesson.id ? null : lesson.id)
                  else future()
                }}>{unlocked ? <StarRing active={!done} color={topic === 0 ? 'brown' : 'blue'} /> : <LockedNode />}</button>
                {topic === 0 && index === 2 && <button className="mapPlace" aria-label="Открыть карточку Маньпупунёра" onClick={() => navigate('/place/0')}>
                  <img className="mapPlaceImage" src={image('place-manpupuner-map')} alt="" />
                  <span className="placeStars"><img src={image('map-star')} alt="" /><img className="dim raised" src={image('map-star')} alt="" /><img className="dim" src={image('map-star')} alt="" /></span>
                </button>}
              </div>
              {lesson && selected === lesson.id && unlocked && <div className="lessonPopover"><h3>{lesson.title}</h3><button onClick={() => navigate(`/lesson/${lesson.id}`)}>{done ? 'ПОВТОРИТЬ' : 'УЧИТЬСЯ · +15 ОПЫТА'}</button></div>}
            </div>
          })}
          {topic === 1 && <FogBank />}
        </div>
        {topic === 0 && <button className="mapChest" aria-label="Закрытый сундук" onClick={future}><img src={image('chest-closed')} alt="" /></button>}
      </section>)}
    </div>
    <TabBar active="home" navigate={navigate} />
    {modal && <Modal title="Продолжение скоро" body="Сейчас доступны два первых урока. Остальные задания и новые темы появятся позже." onClose={() => setModal(false)} />}
  </div>
}

function PageHeader({ title, onClose, progress }: { title?: string; onClose: () => void; progress?: number }) {
  return <header className="pageHeader"><button aria-label="Назад" onClick={onClose}>×</button>{progress === undefined ? <h2>{title}</h2> : <div className="progressTrack"><span style={{ width: `${progress * 100}%` }} /></div>}<span className="headerSpacer" /></header>
}

function LanguageScreen({ navigate, selectLanguage }: { navigate: (path: string) => void; selectLanguage: () => void }) {
  const [stage, setStage] = useState(0)
  const [selected, setSelected] = useState<number[]>([])
  const [checked, setChecked] = useState(false)
  const bank = ['читаю', 'дом', 'изучаю', 'Я', 'коми', 'язык']
  const correct = selected.map(index => bank[index]).join(' ') === 'Я изучаю коми язык'
  const next = () => {
    if (stage === 0) { setStage(1); return }
    if (!checked) { setChecked(true); return }
    if (!correct) { setChecked(false); setSelected([]); return }
    selectLanguage(); navigate('/home')
  }
  return <div className="fullScreen">
    {stage === 0 ? <>
      <div className="screenBody languageBody">
        <div className="introRow"><img src={image('mascot-explaining')} alt="" /><div className="speechBubble">Какой язык будем изучать?</div></div>
        <button className="languageOption" onClick={() => setStage(1)}><span className="komiFlag"><i /><i /><i /></span><span><strong>Коми</strong><small>Коми кыв</small></span><b>›</b></button>
        <div className="unavailableLanguage"><span>＋</span>Новые языки<small>СКОРО</small></div>
      </div>
      <div className="screenFooter"><PrimaryButton onClick={next}>ПРОДОЛЖИТЬ</PrimaryButton></div>
    </> : <>
      <PageHeader progress={.7} onClose={() => setStage(0)} />
      <div className="screenBody languageExercise"><h1>Переведите предложение</h1><div className="introRow"><img src={image('mascot-explaining')} alt="" /><div className="speechBubble">Ме велӧда коми кыв.</div></div>
        <div className="languageAnswer">{selected.map((index, position) => <button key={position} className="wordChip" onClick={() => !checked && setSelected(old => old.filter((_, at) => at !== position))}>{bank[index]}</button>)}</div>
        <div className="wordBank">{bank.map((word, index) => <button key={index} className="wordChip" disabled={selected.includes(index) || checked} onClick={() => setSelected(old => [...old, index])}>{selected.includes(index) ? ' ' : word}</button>)}</div>
      </div>
      {checked && <div className={`feedback ${correct ? 'right' : 'wrong'}`}>{correct ? 'Отлично! «Я изучаю коми язык».' : 'Попробуйте составить фразу ещё раз.'}</div>}
      <div className="screenFooter"><PrimaryButton onClick={next} disabled={!checked && selected.length === 0}>{checked ? correct ? 'ПРОДОЛЖИТЬ' : 'ЕЩЁ РАЗ' : 'ПРОВЕРИТЬ'}</PrimaryButton></div>
    </>}
  </div>
}

function LessonScreen({ lesson, navigate, progress, complete, loseHeart, resetHearts }: { lesson: Lesson; navigate: (path: string) => void; progress: Progress; complete: (id: string) => void; loseHeart: () => void; resetHearts: () => void }) {
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [left, setLeft] = useState<number | null>(null)
  const [right, setRight] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [mistakes, setMistakes] = useState(0)
  const [audioNotice, setAudioNotice] = useState(false)
  const [exitModal, setExitModal] = useState(false)
  const words = lesson.words
  const phrase = lesson.phrase
  const other = lessons.find(item => item.id !== lesson.id)?.words[0] || words[0]
  const pictureWords = [...words, other]
  const bank = [phrase.tokens[1], phrase.distractor, phrase.tokens[0]]
  const response = selected.map(index => bank[index])
  const titles = ['Новые слова', 'Выберите картинку', 'Что значит слово?', 'Соберите фразу', 'Найдите пары', 'Выберите слово']
  const note = step === 1 ? `${words[0].komi} — ${words[0].russian}` : step === 2 ? `${words[1].komi} — ${words[1].russian}` : step === 3 ? `${phrase.komi} — ${phrase.russian}` : step === 4 ? 'Вы нашли все пары.' : `${words[2].komi} — ${words[2].russian}`
  const fail = () => { setCorrect(false); setChecked(true); setMistakes(value => value + 1); loseHeart() }
  const evaluate = () => {
    const success = step === 1 ? selected[0] === 0 : step === 2 ? selected[0] === 1 : step === 3 ? JSON.stringify(response) === JSON.stringify(phrase.tokens) : selected[0] === 2
    if (success) { setCorrect(true); setChecked(true) } else fail()
  }
  const next = () => {
    if (checked && !correct) { if (progress.hearts <= 0) resetHearts(); setSelected([]); setChecked(false); setLeft(null); setRight(null); return }
    if (step === 5) {
      const first = !progress.completed.includes(lesson.id)
      complete(lesson.id)
      navigate(`/result/${lesson.id}?mistakes=${mistakes}&first=${first ? 1 : 0}`)
      return
    }
    setStep(value => value + 1); setSelected([]); setMatched([]); setLeft(null); setRight(null); setChecked(false); setAudioNotice(false)
  }
  const chooseMatch = (side: 'left' | 'right', index: number) => {
    if (checked || matched.includes(index)) return
    const newLeft = side === 'left' ? index : left
    const newRight = side === 'right' ? index : right
    if (newLeft !== null && newRight !== null) {
      setLeft(null); setRight(null)
      if (newLeft === newRight) {
        const updated = [...matched, newLeft]
        setMatched(updated)
        if (updated.length === words.length) { setCorrect(true); setChecked(true) }
      } else fail()
    } else { setLeft(newLeft); setRight(newRight) }
  }
  return <div className="fullScreen lessonScreen">
    <header className="lessonHeader"><button aria-label="Закрыть урок" onClick={() => setExitModal(true)}>×</button><div className="progressTrack"><span style={{ width: `${step / 6 * 100}%` }} /></div><img src={image('heart')} alt="" /><b>{progress.hearts}</b></header>
    <div className="screenBody lessonBody">
      <div className="lessonKicker">{step === 0 ? 'УРОК · КОМИ ЯЗЫК' : `ЗАДАНИЕ ${step} ИЗ 5`}</div>
      <h1>{titles[step]}</h1>
      {step === 0 && <>
        <div className="introRow lessonIntro"><img src={image('mascot-explaining')} alt="" /><p>Познакомьтесь со словами. Затем вы найдёте их на картинках и соберёте фразу.</p></div>
        {words.map((word, index) => <div className="newWord" key={index}><span className="artCircle"><WordArt art={word.art} size={48} /></span><span className="newWordCopy"><b>{word.komi}</b><small>{word.russian}</small></span><button className="soundButton" aria-label={`Озвучить ${word.komi}`} onClick={() => setAudioNotice(true)}><SpeakerIcon /></button></div>)}
      </>}
      {step === 1 && <>
        <div className="wordPrompt"><b>{words[0].komi}</b><button className="soundButton" aria-label="Озвучить слово" onClick={() => setAudioNotice(true)}><SpeakerIcon /></button></div><p className="helper">Найдите изображение, которое подходит к слову.</p>
        <div className="pictureGrid">{pictureWords.map((word, index) => <button key={index} className={`pictureChoice ${selected[0] === index ? 'chosen' : ''}`} onClick={() => !checked && setSelected([index])} aria-pressed={selected[0] === index}><WordArt art={word.art} /><span>{word.russian}</span></button>)}</div>
      </>}
      {step === 2 && <>
        <div className="wordPrompt"><b>{words[1].komi}</b><button className="soundButton" aria-label="Озвучить слово" onClick={() => setAudioNotice(true)}><SpeakerIcon /></button></div>
        <div className="choiceList">{words.map((word, index) => <button key={index} className={`textChoice ${selected[0] === index ? 'chosen' : ''}`} onClick={() => !checked && setSelected([index])} aria-pressed={selected[0] === index}>{word.russian}</button>)}</div>
      </>}
      {step === 3 && <>
        <p className="helper">Переведите на коми:</p><h2 className="phrasePrompt">{phrase.russian}</h2>
        <div className="answerArea">{selected.length ? selected.map((index, position) => <button className="wordChip chosen" key={position} onClick={() => !checked && setSelected(old => old.filter((_, at) => at !== position))}>{bank[index]}</button>) : <span>Коснитесь слов внизу</span>}</div>
        <div className="wordBank">{bank.map((word, index) => <button className="wordChip" key={index} disabled={selected.includes(index) || checked} onClick={() => setSelected(old => [...old, index])}>{selected.includes(index) ? ' ' : word}</button>)}</div>
      </>}
      {step === 4 && <>
        <p className="helper">Коснитесь слова слева, затем его перевода справа.</p>
        <div className="matchGrid"><div>{words.map((word, index) => <button key={index} className={`matchChoice ${matched.includes(index) ? 'matched' : ''} ${left === index ? 'chosen' : ''}`} disabled={matched.includes(index) || checked} onClick={() => chooseMatch('left', index)}>{matched.includes(index) ? '✓' : word.komi}</button>)}</div><div>{answerOrder.map(index => <button key={index} className={`matchChoice ${matched.includes(index) ? 'matched' : ''} ${right === index ? 'chosen' : ''}`} disabled={matched.includes(index) || checked} onClick={() => chooseMatch('right', index)}>{matched.includes(index) ? '✓' : words[index].russian}</button>)}</div></div>
      </>}
      {step === 5 && <>
        <p className="helper">Как будет по-коми?</p><h2 className="phrasePrompt">{words[2].russian}</h2>
        <div className="choiceList">{words.map((word, index) => <button key={index} className={`textChoice ${selected[0] === index ? 'chosen' : ''}`} onClick={() => !checked && setSelected([index])} aria-pressed={selected[0] === index}>{word.komi}</button>)}</div>
      </>}
      {audioNotice && <div className="audioNotice" role="status">Озвучка слов появится позже</div>}
    </div>
    {checked && <div className={`feedback ${correct ? 'right' : 'wrong'}`}><strong>{correct ? 'Верно!' : 'Попробуйте ещё раз'}</strong><span>{correct ? note : step === 4 ? 'Эти слова не составляют пару.' : 'Посмотрите на новые слова и попробуйте снова.'}</span></div>}
    <div className="screenFooter"><PrimaryButton tone="brown" onClick={step === 0 || checked ? next : evaluate} disabled={step !== 0 && !checked && (step === 4 || selected.length === 0)}>{step === 0 ? 'НАЧАТЬ' : checked ? correct ? 'ПРОДОЛЖИТЬ' : 'ЕЩЁ РАЗ' : step === 4 ? 'СОЕДИНИТЕ ПАРЫ' : 'ПРОВЕРИТЬ'}</PrimaryButton></div>
    {exitModal && <Modal title="Выйти из урока?" body="Текущий урок начнётся заново, когда вы вернётесь." onClose={() => setExitModal(false)} secondary={{ label: 'ВЫЙТИ ИЗ УРОКА', onClick: () => navigate('/home') }} />}
  </div>
}

function ResultScreen({ lesson, query, navigate }: { lesson: Lesson; query: URLSearchParams; navigate: (path: string) => void }) {
  const mistakes = Math.max(0, Number(query.get('mistakes')) || 0)
  const accuracy = Math.round(5 / (5 + mistakes) * 100)
  const reward = query.get('first') === '0' ? 0 : 15
  return <div className="fullScreen resultScreen"><div className="resultBody"><div className="resultMedal">✦</div><h1>Урок пройден!</h1><h2>{lesson.title}</h2><p>Вы повторили три коми слова и собрали новую фразу.</p><div className="resultAwards"><div><small>ТОЧНОСТЬ</small><b>{accuracy}%</b></div><div><small>ОПЫТ</small><b>+{reward}</b></div></div></div><div className="screenFooter"><PrimaryButton tone="brown" onClick={() => navigate('/home')}>НА КАРТУ</PrimaryButton></div></div>
}

function PlaceScreen({ topic, navigate }: { topic: number; navigate: (path: string) => void }) {
  const shanga = topic === 1
  const title = shanga ? 'Шаньга' : 'Маньпупунёр'
  return <div className="fullScreen"><PageHeader onClose={() => navigate('/home')} /><div className="placeBody"><img className="placeHero" src={image(shanga ? 'place-shanga-card' : 'place-manpupuner-card')} alt={title} /><h1>{title}</h1><div className="placeRating"><img src={image('map-star')} alt="" /><img className="dim raised" src={image('map-star')} alt="" /><img className="dim" src={image('map-star')} alt="" /></div><p>{shanga ? 'Вместе приготовим традиционные пирожки' : topics[0].description}</p></div><div className="screenFooter"><PrimaryButton tone={shanga ? 'blue' : 'brown'} onClick={() => navigate('/home')}>НА КАРТУ</PrimaryButton></div></div>
}

function ChestScreen({ topic, progress, openChest, navigate }: { topic: number; progress: Progress; openChest: (topic: number) => void; navigate: (path: string) => void }) {
  const opened = progress.chests.includes(topic)
  return <div className="fullScreen"><PageHeader title="Награда" onClose={() => navigate('/home')} /><div className="chestBody"><img src={image(opened ? 'chest-open' : 'chest-closed')} alt="" /><h1>{opened ? 'Сундук открыт!' : 'Вы прошли тему!'}</h1><p>{opened ? '+50 ягод получено' : 'Откройте сундук и получите 50 ягод'}</p></div><div className="screenFooter"><PrimaryButton tone={topic === 0 ? 'brown' : 'blue'} onClick={() => opened ? navigate('/home') : openChest(topic)}>{opened ? 'НА КАРТУ' : 'ОТКРЫТЬ'}</PrimaryButton></div></div>
}

function TasksScreen({ progress, navigate }: { progress: Progress; navigate: (path: string) => void }) {
  const goal = lessons.length
  const done = lessons.filter(item => progress.completed.includes(item.id)).length
  return <div className="tabScreen"><div className="tabContent"><div className="tasksHeader"><h1>Задания недели</h1><div className="weekGoal"><b>Пройдите первые два урока!</b><div className="weekTrack"><span style={{ width: `${done / goal * 100}%` }} /><em>{done} / {goal}</em></div></div></div><section className="tasksSection"><h2>ПАРНОЕ ЗАДАНИЕ</h2><div className="tasksIllustration"><img src={image('map-star')} alt="" /></div></section></div><TabBar active="tasks" navigate={navigate} /></div>
}
function SimpleTab({ title, active, navigate }: { title: string; active: string; navigate: (path: string) => void }) {
  return <div className="tabScreen"><div className="tabContent"><h1 className="simpleTitle">{title}</h1></div><TabBar active={active} navigate={navigate} /></div>
}
function ProfileScreen({ navigate }: { navigate: (path: string) => void }) {
  return <div className="fullScreen"><PageHeader title="Профиль" onClose={() => navigate('/home')} /></div>
}

export default function App() {
  const [progress, setProgress] = useState(readProgress)
  const [route, setRoute] = useState(() => window.location.hash.slice(1) || (readProgress().languageSelected ? '/home' : '/language'))
  useEffect(() => { localStorage.setItem('folk-web-progress-v1', JSON.stringify(progress)) }, [progress])
  useEffect(() => {
    const update = () => setRoute(window.location.hash.slice(1) || '/home')
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])
  const navigate = (path: string) => { window.location.hash = path; setRoute(path); window.scrollTo({ top: 0, behavior: 'instant' }) }
  const selectLanguage = () => setProgress(value => ({ ...value, languageSelected: true }))
  const complete = (id: string) => setProgress(value => ({ ...value, completed: value.completed.includes(id) ? value.completed : [...value.completed, id] }))
  const loseHeart = () => setProgress(value => ({ ...value, hearts: Math.max(0, value.hearts - 1), wrong: value.wrong + 1 }))
  const resetHearts = () => setProgress(value => ({ ...value, hearts: 5 }))
  const openChest = (topic: number) => setProgress(value => ({ ...value, chests: value.chests.includes(topic) ? value.chests : [...value.chests, topic] }))
  const [path, search = ''] = route.split('?')
  const parts = path.split('/').filter(Boolean)
  const lesson = lessons.find(item => item.id === parts[1])

  return <div className="desktopCanvas"><main className="appShell">
    {parts[0] === 'language' && <LanguageScreen navigate={navigate} selectLanguage={selectLanguage} />}
    {(parts[0] === 'home' || parts.length === 0) && <MapScreen progress={progress} navigate={navigate} />}
    {parts[0] === 'lesson' && lesson && <LessonScreen key={lesson.id} lesson={lesson} navigate={navigate} progress={progress} complete={complete} loseHeart={loseHeart} resetHearts={resetHearts} />}
    {parts[0] === 'result' && lesson && <ResultScreen lesson={lesson} query={new URLSearchParams(search)} navigate={navigate} />}
    {parts[0] === 'place' && <PlaceScreen topic={Number(parts[1]) || 0} navigate={navigate} />}
    {parts[0] === 'chest' && <ChestScreen topic={Number(parts[1]) || 0} progress={progress} openChest={openChest} navigate={navigate} />}
    {parts[0] === 'tasks' && <TasksScreen progress={progress} navigate={navigate} />}
    {parts[0] === 'ranking' && <SimpleTab title="Рейтинг" active="ranking" navigate={navigate} />}
    {parts[0] === 'feed' && <SimpleTab title="Лента новостей" active="feed" navigate={navigate} />}
    {parts[0] === 'profile' && <ProfileScreen navigate={navigate} />}
    {!['language','home','lesson','result','place','chest','tasks','ranking','feed','profile'].includes(parts[0] || 'home') && <MapScreen progress={progress} navigate={navigate} />}
  </main></div>
}
