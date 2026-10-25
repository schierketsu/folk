// =====================================================================
//  UI Kit generator for Figma · v3 — приложение без названия (пока)
//  Приложение для изучения языков народов России.
//  UX-паттерны — по мотивам Duolingo UI Kit (Marvilo); яркая палитра
//  в духе Duolingo; маскот — Лиса (живёт во всех регионах России).
//
//  Курсы задаются массивом LANGS ниже. Чтобы добавить язык — добавьте
//  в него объект (см. README) и перезапустите плагин на чистом файле.
// =====================================================================

const FONT_FAMILY = 'Nunito';   // можно заменить, напр. 'PT Root UI', 'Rubik'
const APP_NAME = '';            // название продукта — впишите, когда появится
const KIT = 'UI Kit';           // префикс переменных, стилей и фреймов кита
const LEGACY_KITS = ['Тамыр'];  // префиксы прошлых версий — убираются при пересоздании
const PAGES = { found: 'Основы', comps: 'Компоненты', screens: 'Экраны' };

// ---------------------------------------------------------------------
// КУРСЫ — единственное место, которое нужно менять при добавлении языка
// ---------------------------------------------------------------------
const LANGS = [
  {
    ru: 'Коми', native: 'Коми кыв',
    chars: ['і', 'ӧ'],                       // буквы сверх русской раскладки
    hello: 'Чолӧм!', helloRu: 'Привет!',
    phrase: 'Ме велӧда коми кыв.',            // фраза для упражнения «переведите»
    answer: ['Я', 'изучаю', 'коми', 'язык'],  // правильный перевод (плитки)
    extra: ['читаю', 'дом'],                  // лишние плитки
    typo: 'Ме велода коми кыв',               // пример ошибки (без спецбуквы)
    picture: 'руч', pictureRu: 'лиса',
    unit: 'Знакомство и приветствия',
    flag: `<rect width="44" height="10.7" fill="#2E86D1"/><rect y="10.7" width="44" height="10.6" fill="#13A538"/><rect y="21.3" width="44" height="10.7" fill="#FFFFFF"/>`,
  },
  {
    ru: 'Чувашский', native: 'Чӑвашла',
    chars: ['ӑ', 'ӗ', 'ҫ', 'ӳ'],
    hello: 'Салам!', helloRu: 'Привет!',
    phrase: 'Эпӗ чӑвашла вӗренетӗп.',
    answer: ['Я', 'учу', 'чувашский'],
    extra: ['читаю', 'язык', 'дом'],
    typo: 'Эпе чавашла веренетеп',
    picture: 'тилӗ', pictureRu: 'лиса',
    unit: 'Знакомство и приветствия',
    flag: `<rect width="44" height="32" fill="#FFD200"/><rect y="25" width="44" height="7" fill="#6B2C91"/><path d="M22 7l4.5 7.5L22 22l-4.5-7.5z" fill="#6B2C91"/>`,
  },
];
const SOON = {
  ru: 'Скоро новые языки', native: 'Удмуртский, марийский и другие',
  flag: `<rect width="44" height="32" fill="#E5E5E5"/><path d="M22 10v12M16 16h12" stroke="#AFAFAF" stroke-width="3" stroke-linecap="round" fill="none"/>`,
};

// ---------------------------------------------------------------------
// Палитра — яркая, в духе Duolingo
// ---------------------------------------------------------------------
const PALETTE = [
  { key: 'meadow',    ru: 'Луг',      role: 'Основной · главные кнопки, «верно», прогресс', shades: { 50: '#D7FFB8', 100: '#A5ED6E', 500: '#58CC02', 700: '#58A700' } },
  { key: 'sky',       ru: 'Небо',     role: 'Вторичный · выбор, ссылки, звук',              shades: { 50: '#DDF4FF', 100: '#84D8FF', 500: '#1CB0F6', 700: '#1899D6' } },
  { key: 'fox',       ru: 'Лиса',     role: 'Бренд · маскот, ударный режим',                 shades: { 50: '#FFF0D9', 100: '#FFC782', 500: '#FF9600', 700: '#D97A00' } },
  { key: 'honey',     ru: 'Мёд',      role: 'Награды · опыт, пройденные шаги',               shades: { 50: '#FFF6CC', 100: '#FFE066', 500: '#FFC800', 700: '#E6A700' } },
  { key: 'rowan',     ru: 'Рябина',   role: 'Ошибки, жизни',                                 shades: { 50: '#FFDFE0', 100: '#FFB2B2', 500: '#FF4B4B', 700: '#EA2B2B' } },
  { key: 'blueberry', ru: 'Черника',  role: 'Премиум, лиги, события',                        shades: { 50: '#F4E3FF', 100: '#E3B8FF', 500: '#CE82FF', 700: '#A568CC' } },
  { key: 'neutral',   ru: 'Нейтральные', role: 'Текст, фоны, границы',                       shades: { 0: '#FFFFFF', 50: '#F7F7F7', 200: '#E5E5E5', 400: '#AFAFAF', 600: '#777777', 800: '#4B4B4B', 900: '#3C3C3C' } },
];

const S_FILL = ['FRAME_FILL', 'SHAPE_FILL'];
const S_TEXT = ['TEXT_FILL'];
const S_STROKE = ['STROKE_COLOR'];
const S_ANY = ['FRAME_FILL', 'SHAPE_FILL', 'STROKE_COLOR', 'TEXT_FILL'];

const SEMANTIC = [
  ['color/bg/default', 'neutral/0', S_FILL],
  ['color/bg/subtle', 'neutral/50', S_FILL],
  ['color/bg/muted', 'neutral/200', S_FILL],
  ['color/text/primary', 'neutral/800', S_TEXT],
  ['color/text/secondary', 'neutral/600', S_TEXT],
  ['color/text/disabled', 'neutral/400', S_TEXT],
  ['color/text/on-color', 'neutral/0', S_TEXT],
  ['color/border/default', 'neutral/200', S_STROKE],
  ['color/border/strong', 'neutral/400', S_STROKE],
];
const ROLES = { primary: 'meadow', secondary: 'sky', brand: 'fox', reward: 'honey', danger: 'rowan', premium: 'blueberry' };
for (const [role, fam] of Object.entries(ROLES)) {
  SEMANTIC.push([`color/${role}/default`, `${fam}/500`, S_ANY]);
  SEMANTIC.push([`color/${role}/shadow`, `${fam}/700`, S_ANY]);
  SEMANTIC.push([`color/${role}/muted`, `${fam}/100`, S_ANY]);
  SEMANTIC.push([`color/${role}/subtle`, `${fam}/50`, S_ANY]);
}

const SPACING = { '2xs': 4, xs: 8, sm: 12, md: 16, lg: 24, xl: 32, '2xl': 48 };
const RADIUS = { sm: 8, md: 12, lg: 16, xl: 24, full: 999 };

// Типографика: ключ → [имя, вес, размер, интерлиньяж, трекинг, капс]
const TYPE = {
  display:  ['Display', 'black', 32, 40, 0, false],
  h1:       ['Заголовок 1', 'extra', 24, 32, 0, false],
  h2:       ['Заголовок 2', 'extra', 20, 28, 0, false],
  h3:       ['Заголовок 3', 'bold', 17, 24, 0, false],
  word:     ['Слово урока', 'bold', 19, 26, 0, false],
  body:     ['Текст', 'regular', 16, 24, 0, false],
  bodyBold: ['Текст жирный', 'bold', 16, 24, 0, false],
  caption:  ['Подпись', 'bold', 13, 18, 0, false],
  button:   ['Кнопка', 'extra', 15, 20, 0.8, true],
  overline: ['Надзаголовок', 'extra', 12, 16, 1, true],
};

// ---------------------------------------------------------------------
// SVG-ассеты
// ---------------------------------------------------------------------
const svg24 = (b) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">${b}</svg>`;
const ICONS = [
  ['Сердце', `<path d="M12 21s-7.5-4.6-9.6-9.2C1 8.6 2.9 5 6.4 5c2.1 0 3.6 1.2 4.6 2.6l1 1.3 1-1.3C14 6.2 15.5 5 17.6 5 21.1 5 23 8.6 21.6 11.8 19.5 16.4 12 21 12 21z" fill="#FF4B4B"/><ellipse cx="7" cy="9.2" rx="2" ry="1.3" fill="#FFFFFF" fill-opacity="0.5"/>`],
  ['Огонь', `<path d="M12 2c1 3.5 5.5 5.6 5.5 11a5.5 5.5 0 0 1-11 0c0-2.6 1.3-4.3 2.6-5.6.2 1.7 1 2.8 2.1 3.3C10.6 7.7 11.2 4.6 12 2z" fill="#FF9600"/><path d="M12 12.5c.6 1.6 2.7 2.4 2.7 4.8a2.7 2.7 0 0 1-5.4 0c0-1.4.8-2.3 1.5-2.9.2.8.6 1.2 1.1 1.4-.2-1.2 0-2.3.1-3.3z" fill="#FFC800"/>`],
  ['Кристалл', `<path d="M7 3.5h10l4.5 5.5L12 21 2.5 9z" fill="#1CB0F6"/><path d="M2.5 9h19L12 21z" fill="#1899D6"/><path d="M7 3.5L9.5 9 12 3.5 14.5 9 17 3.5z" fill="#84D8FF"/>`],
  ['Звезда', `<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" fill="#FFC800"/>`],
  ['Молния', `<path d="M13.5 2L4.5 13.5h6L9.5 22l9-11.5h-6z" fill="#FFC800"/>`],
  ['Мишень', `<circle cx="12" cy="12" r="9.5" fill="#58CC02"/><circle cx="12" cy="12" r="6" fill="#FFFFFF"/><circle cx="12" cy="12" r="2.8" fill="#58CC02"/>`],
  ['Часы', `<circle cx="12" cy="12" r="9.5" fill="#1CB0F6"/><path d="M12 7v5.5l3.5 2" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`],
  ['Галочка', `<path d="M5 12.5l4.5 4.5L19 7.5" stroke="#58CC02" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`],
  ['Закрыть', `<path d="M6 6l12 12M18 6L6 18" stroke="#AFAFAF" stroke-width="2.6" stroke-linecap="round" fill="none"/>`],
  ['Назад', `<path d="M15 5l-7 7 7 7" stroke="#777777" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`],
  ['Шеврон', `<path d="M9 5l7 7-7 7" stroke="#AFAFAF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`],
  ['Замок', `<rect x="5" y="10" width="14" height="11" rx="3" fill="#AFAFAF"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10" stroke="#AFAFAF" stroke-width="2.4" fill="none"/>`],
  ['Динамик', `<path d="M4 9h4l5-4v14l-5-4H4z" fill="#1CB0F6"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="#1CB0F6" stroke-width="2" stroke-linecap="round" fill="none"/>`],
  ['Микрофон', `<rect x="9" y="3" width="6" height="11" rx="3" fill="#1CB0F6"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6" stroke="#1CB0F6" stroke-width="2" stroke-linecap="round" fill="none"/>`],
  ['Дом', `<path d="M3.5 10.5L12 3.5l8.5 7V20a1 1 0 0 1-1 1H15v-6h-6v6H4.5a1 1 0 0 1-1-1z" fill="#FF4B4B"/><path d="M9 21v-6h6v6z" fill="#FFC800"/>`],
  ['Книга', `<path d="M3 5.5C5.5 4.5 8.5 4.5 11 6v14c-2.5-1.5-5.5-1.5-8-.5z" fill="#1CB0F6"/><path d="M21 5.5c-2.5-1-5.5-1-8 .5v14c2.5-1.5 5.5-1.5 8-.5z" fill="#1899D6"/>`],
  ['Чум', `<path d="M12 3L2.5 20.5h19z" fill="#FF9600"/><path d="M12 3l-3.2 17.5h6.4z" fill="#D97A00"/><path d="M5.2 15.5h13.6" stroke="#FF4B4B" stroke-width="1.6" fill="none"/><path d="M10 3.5l2-1.8 2 1.8" stroke="#8B4A00" stroke-width="1.4" stroke-linecap="round" fill="none"/>`],
  ['Кубок', `<path d="M7 3h10v5a5 5 0 0 1-10 0z" fill="#FFC800"/><path d="M7 5H4v1.5A3.5 3.5 0 0 0 7.5 10M17 5h3v1.5A3.5 3.5 0 0 1 16.5 10" stroke="#FFC800" stroke-width="2" fill="none"/><rect x="10.5" y="12.5" width="3" height="4" fill="#E6A700"/><rect x="7" y="16.5" width="10" height="4" rx="1.5" fill="#E6A700"/>`],
  ['Профиль', `<circle cx="12" cy="8" r="4.5" fill="#CE82FF"/><path d="M3.5 21a8.5 8.5 0 0 1 17 0z" fill="#CE82FF"/>`],
  ['Лапка', `<ellipse cx="12" cy="15.5" rx="5" ry="4.5" fill="#FF9600"/><circle cx="5.8" cy="10" r="2.3" fill="#FF9600"/><circle cx="9.4" cy="6.2" r="2.3" fill="#FF9600"/><circle cx="14.6" cy="6.2" r="2.3" fill="#FF9600"/><circle cx="18.2" cy="10" r="2.3" fill="#FF9600"/>`],
  ['Изображение', `<rect x="2.5" y="4" width="19" height="16" rx="3" fill="#DDF4FF"/><circle cx="16.5" cy="9" r="2" fill="#FFC800"/><path d="M3.5 18.5l5-6 4 4.5 3-3 5 4.5z" fill="#58CC02"/>`],
  ['Орнамент', `<path d="M12 2l3 5-3 5-3-5z M12 12l3 5-3 5-3-5z M2 12l5-3 5 3-5 3z M12 12l5-3 5 3-5 3z" fill="#FF4B4B"/><circle cx="12" cy="12" r="1.6" fill="#FFC800"/>`],
];

const EMOTIONS = ['Спокойствие', 'Радость', 'Грусть', 'Удивление'];
// Лиса-маскот: SVG 120×120, эмоция = Спокойствие | Радость | Грусть | Удивление
function foxSvg(emotion) {
  const O = '#FF9600', OD = '#E07800', W = '#FFFFFF', D = '#3C2415', BR = '#5A2E12';
  const eyes = (o = {}) => {
    const rx = o.big ? 9.5 : 8.5, ry = o.big ? 10.5 : 9.5, pr = o.big ? 4.2 : 5.5, dy = o.down ? 2.5 : 1;
    return [45, 75].map((cx) => `<ellipse cx="${cx}" cy="54" rx="${rx}" ry="${ry}" fill="${W}"/><circle cx="${cx + 1}" cy="${54 + dy}" r="${pr}" fill="${D}"/><circle cx="${cx + 2.6}" cy="${54 + dy - 2}" r="1.8" fill="${W}"/>`).join('');
  };
  let face = '';
  if (emotion === 'Радость') {
    face = `<path d="M37.5 56.5Q45 47 52.5 56.5M67.5 56.5Q75 47 82.5 56.5" stroke="${D}" stroke-width="3.6" stroke-linecap="round" fill="none"/>`
      + `<path d="M51 70.5Q60 84 69 70.5Z" fill="${D}"/><path d="M54.5 76Q60 81.5 65.5 76Q60 73 54.5 76Z" fill="#FF7A8A"/>`;
  } else if (emotion === 'Грусть') {
    face = eyes({ down: true })
      + `<path d="M36 45.5L52 41M84 45.5L68 41" stroke="${D}" stroke-width="3" stroke-linecap="round" fill="none"/>`
      + `<path d="M53.5 76Q60 70.5 66.5 76" stroke="${D}" stroke-width="2.6" stroke-linecap="round" fill="none"/>`
      + `<path d="M37 64q-3.2 4.4 0 6.6q3.2-2.2 0-6.6z" fill="#1CB0F6"/>`;
  } else if (emotion === 'Удивление') {
    face = eyes({ big: true })
      + `<path d="M37 41Q45 36 53 41M67 41Q75 36 83 41" stroke="${D}" stroke-width="3" stroke-linecap="round" fill="none"/>`
      + `<ellipse cx="60" cy="76" rx="4.2" ry="5.2" fill="${D}"/>`;
  } else {
    face = eyes() + `<path d="M53.5 71Q60 76 66.5 71" stroke="${D}" stroke-width="2.6" stroke-linecap="round" fill="none"/>`;
  }
  // scarf ornament: small rhombi along the scarf curve
  let orn = '';
  for (let i = 1; i <= 5; i++) {
    const t = i / 6, x = (1 - t) * (1 - t) * 38 + 2 * (1 - t) * t * 60 + t * t * 82, y = (1 - t) * (1 - t) * 83.5 + 2 * (1 - t) * t * 95.5 + t * t * 83.5;
    orn += `<path d="M${x.toFixed(1)} ${(y - 2.4).toFixed(1)}l2.2 2.4-2.2 2.4-2.2-2.4z" fill="#FFC800"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">`
    // tail
    + `<path d="M76 105C102 113 121 96 115 77C112 69 104 68 100 74C104 87 96 97 79 96Z" fill="${O}"/>`
    + `<path d="M115 77C112 69 104 68 100 74C101.5 78.5 104 81.5 107.5 83C111 84 114 82.5 115 77Z" fill="${W}"/>`
    + `<path d="M100 74C104 87 96 97 79 96L78 101C97 101 106 91 103.5 79Z" fill="${OD}" fill-opacity="0.35"/>`
    // body
    + `<ellipse cx="60" cy="97" rx="25" ry="21" fill="${O}"/>`
    + `<ellipse cx="60" cy="101" rx="14" ry="15" fill="${W}"/>`
    + `<ellipse cx="48.5" cy="115.5" rx="8" ry="4.5" fill="${BR}"/><ellipse cx="71.5" cy="115.5" rx="8" ry="4.5" fill="${BR}"/>`
    // ears
    + `<path d="M30 48L34 10L58 30Z" fill="${O}" stroke="${O}" stroke-width="5" stroke-linejoin="round"/>`
    + `<path d="M90 48L86 10L62 30Z" fill="${O}" stroke="${O}" stroke-width="5" stroke-linejoin="round"/>`
    + `<path d="M35 39L37 19L50 31Z" fill="${BR}" stroke="${BR}" stroke-width="2" stroke-linejoin="round"/>`
    + `<path d="M85 39L83 19L70 31Z" fill="${BR}" stroke="${BR}" stroke-width="2" stroke-linejoin="round"/>`
    // head
    + `<path d="M60 24C80 24 94 36 98 52L108 62C98 73 84 82 60 82C36 82 22 73 12 62L22 52C26 36 40 24 60 24Z" fill="${O}" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>`
    + `<path d="M12 62C24 57 38 58 47 65C52 69 56 71 60 71C64 71 68 69 73 65C82 58 96 57 108 62C98 73 84 82 60 82C36 82 22 73 12 62Z" fill="${W}" stroke="${W}" stroke-width="3" stroke-linejoin="round"/>`
    + `<circle cx="31" cy="67" r="5" fill="#FF7A8A" fill-opacity="0.35"/><circle cx="89" cy="67" r="5" fill="#FF7A8A" fill-opacity="0.35"/>`
    + face
    + `<ellipse cx="60" cy="66.5" rx="5.2" ry="3.8" fill="${D}"/><ellipse cx="58.6" cy="65.3" rx="1.6" ry="1" fill="${W}" fill-opacity="0.7"/>`
    // scarf
    + `<path d="M38 81Q60 93 82 81L83.5 88Q60 101 36.5 88Z" fill="#FF4B4B"/>`
    + `<path d="M68 92L76 108L67.5 106.5L62.5 94Z" fill="#EA2B2B"/>`
    + orn
    + `</svg>`;
}


const GLYPH = {
  star: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" fill="#FFFFFF"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="#FFFFFF" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
  lock: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="5" y="10" width="14" height="11" rx="3" fill="#AFAFAF"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10" stroke="#AFAFAF" stroke-width="2.4" fill="none"/></svg>`,
  notebook: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="5" y="3" width="14" height="18" rx="2.5" stroke="#FFFFFF" stroke-width="2.2" fill="none"/><path d="M9 8h6M9 12h6" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" fill="none"/></svg>`,
  checkSmall: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="#58A700" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
  closeSmall: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="#EA2B2B" stroke-width="3.4" stroke-linecap="round" fill="none"/></svg>`,
};
const TAIL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="18" viewBox="0 0 12 18" fill="none"><path d="M12 1.5L2 9l10 7.5" fill="#FFFFFF" stroke="#E5E5E5" stroke-width="2" stroke-linejoin="round"/></svg>`;
const flagSvg = (b) => `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="32" viewBox="0 0 44 32" fill="none">${b}</svg>`;

// ---------------------------------------------------------------------
// Утилиты
// ---------------------------------------------------------------------
const V = {};   // имя переменной → Variable
const TS = {};  // ключ типографики → TextStyle
const STATS = { variables: 0, textStyles: 0, components: 0, sets: 0, screens: 0 };

const hex = (h) => { h = h.replace('#', ''); return { r: parseInt(h.slice(0, 2), 16) / 255, g: parseInt(h.slice(2, 4), 16) / 255, b: parseInt(h.slice(4, 6), 16) / 255 }; };
const solid = (h, opacity = 1) => ({ type: 'SOLID', color: hex(h), opacity });
const vpaint = (name, opacity = 1) => {
  if (!V[name]) throw new Error('Нет переменной ' + name);
  return figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity }, 'color', V[name]);
};
function fill(n, name, opacity = 1) { n.fills = name ? [vpaint(name, opacity)] : []; }
// «Объёмная» граница в стиле Duolingo: w — по бокам/сверху, bottom — нижняя грань
function depth(n, name, w, bottom) {
  n.strokes = [vpaint(name)];
  n.strokeAlign = 'INSIDE';
  n.strokeTopWeight = w; n.strokeLeftWeight = w; n.strokeRightWeight = w; n.strokeBottomWeight = bottom;
}
function rad(n, key) { for (const c of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) n.setBoundVariable(c, V['radius/' + key]); }
function pad(n, vKey, hKey) {
  n.setBoundVariable('paddingTop', V['spacing/' + vKey]); n.setBoundVariable('paddingBottom', V['spacing/' + vKey]);
  n.setBoundVariable('paddingLeft', V['spacing/' + hKey]); n.setBoundVariable('paddingRight', V['spacing/' + hKey]);
}

function AL(dir = 'HORIZONTAL', name = 'Frame') {
  const f = figma.createFrame();
  f.name = name; f.layoutMode = dir;
  f.primaryAxisSizingMode = 'AUTO'; f.counterAxisSizingMode = 'AUTO';
  f.fills = []; f.clipsContent = false;
  return f;
}
function COMP(name, dir = 'HORIZONTAL') {
  const c = figma.createComponent();
  c.name = name; c.layoutMode = dir;
  c.primaryAxisSizingMode = 'AUTO'; c.counterAxisSizingMode = 'AUTO';
  c.fills = []; c.clipsContent = false;
  STATS.components++;
  return c;
}
function center(n) { n.primaryAxisAlignItems = 'CENTER'; n.counterAxisAlignItems = 'CENTER'; }
function fixW(n, w) { n.resize(w, n.height); if (n.layoutMode === 'VERTICAL') n.primaryAxisSizingMode = 'AUTO'; else n.counterAxisSizingMode = 'AUTO'; }
function fixBox(n, w, h) { n.resize(w, h); n.primaryAxisSizingMode = 'FIXED'; n.counterAxisSizingMode = 'FIXED'; }
function append(parent, child, o = {}) {
  parent.appendChild(child);
  if (o.fillW) child.layoutSizingHorizontal = 'FILL';
  if (o.fillH) child.layoutSizingVertical = 'FILL';
  if (o.grow) child.layoutGrow = 1;
  return child;
}
function spacer(parent) { const s = figma.createFrame(); s.name = 'Распорка'; s.fills = []; s.resize(1, 1); parent.appendChild(s); s.layoutGrow = 1; return s; }
function wrapRow(name, width, gap, rowGap) {
  const f = AL('HORIZONTAL', name);
  f.resize(width, 10);
  f.layoutWrap = 'WRAP'; f.counterAxisSizingMode = 'AUTO';
  f.itemSpacing = gap; f.counterAxisSpacing = rowGap;
  return f;
}

async function T(chars, style, color, o = {}) {
  const t = figma.createText();
  await t.setTextStyleIdAsync(TS[style].id);
  t.characters = chars;
  t.name = o.name || chars.slice(0, 24);
  if (color) fill(t, color, o.opacity || 1);
  if (o.align) t.textAlignHorizontal = o.align;
  if (o.width) { t.resize(o.width, t.height); t.textAutoResize = 'HEIGHT'; }
  return t;
}
// Текст тянется на всю ширину родителя и переносится по словам
function wrap(t) { t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT'; return t; }
function svgNode(svg, name) { const n = figma.createNodeFromSvg(svg); n.name = name; n.fills = []; return n; }

const variantOf = (set, props) => set.children.find((c) => Object.entries(props).every(([k, v]) => c.variantProperties && c.variantProperties[k] === v));
function inst(compOrSet, props) {
  const c = compOrSet.type === 'COMPONENT_SET' ? (props ? variantOf(compOrSet, props) : compOrSet.defaultVariant) : compOrSet;
  if (!c) throw new Error('Нет варианта ' + JSON.stringify(props) + ' в ' + compOrSet.name);
  return c.createInstance();
}
const nested = (instance, name) => instance.findOne((n) => n.type === 'INSTANCE' && n.name === name);

function combine(variants, parent, name, cols, desc) {
  const set = figma.combineAsVariants(variants, parent);
  set.name = name;
  set.layoutMode = 'HORIZONTAL';
  set.itemSpacing = 24;
  set.paddingTop = 32; set.paddingBottom = 32; set.paddingLeft = 32; set.paddingRight = 32;
  set.counterAxisAlignItems = 'MIN';
  const maxW = Math.max(...set.children.map((c) => c.width));
  set.resize(64 + cols * maxW + (cols - 1) * 24, Math.max(set.height, 100));
  set.layoutWrap = 'WRAP'; set.counterAxisSpacing = 24;
  set.counterAxisSizingMode = 'AUTO';
  set.fills = [solid('#FFFFFF')];
  set.strokes = [solid('#9747FF')]; set.strokeWeight = 1; set.dashPattern = [10, 5];
  set.cornerRadius = 16;
  if (desc) set.description = desc;
  STATS.sets++;
  return set;
}
function textProp(owner, prop, def, layerName) {
  const key = owner.addComponentProperty(prop, 'TEXT', def);
  const comps = owner.type === 'COMPONENT_SET' ? owner.children : [owner];
  for (const v of comps) for (const t of v.findAll((n) => n.type === 'TEXT' && n.name === layerName)) t.componentPropertyReferences = { characters: key };
  return key;
}
function swapProp(owner, prop, defComp, layerName) {
  const key = owner.addComponentProperty(prop, 'INSTANCE_SWAP', defComp.id);
  const comps = owner.type === 'COMPONENT_SET' ? owner.children : [owner];
  for (const v of comps) for (const i of v.findAll((n) => n.type === 'INSTANCE' && n.name === layerName)) i.componentPropertyReferences = { mainComponent: key };
  return key;
}

// ---------------------------------------------------------------------
// 1. Шрифты
// ---------------------------------------------------------------------
async function loadFonts() {
  const all = await figma.listAvailableFontsAsync();
  const norm = (s) => s.replace(/\s/g, '').toLowerCase();
  let family = FONT_FAMILY;
  if (!all.some((f) => f.fontName.family === family)) family = 'Inter';
  const pick = (wanted) => {
    const fam = all.filter((f) => f.fontName.family === family);
    for (const w of wanted) { const m = fam.find((f) => norm(f.fontName.style) === norm(w)); if (m) return m.fontName; }
    return fam.length ? fam[0].fontName : { family: 'Inter', style: 'Regular' };
  };
  const F = {
    regular: pick(['Regular', 'Medium', 'Book']),
    bold: pick(['Bold', 'SemiBold', 'Semi Bold']),
    extra: pick(['ExtraBold', 'Extra Bold', 'Black', 'Bold']),
    black: pick(['Black', 'Heavy', 'ExtraBold', 'Extra Bold', 'Bold']),
  };
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  for (const f of Object.values(F)) await figma.loadFontAsync(f);
  return { F, family };
}

// ---------------------------------------------------------------------
// 2. Переменные и стили
// ---------------------------------------------------------------------
async function buildVariables() {
  const cols = await figma.variables.getLocalVariableCollectionsAsync();
  const existing = await figma.variables.getLocalVariablesAsync();
  const coll = (name) => cols.find((c) => c.name === name) || figma.variables.createVariableCollection(name);
  const mk = (c, name, type, value, scopes) => {
    let v = existing.find((x) => x.name === name && x.variableCollectionId === c.id);
    if (!v) { v = figma.variables.createVariable(name, c, type); STATS.variables++; }
    v.setValueForMode(c.modes[0].modeId, value);
    v.scopes = scopes;
    try { v.setVariableCodeSyntax('WEB', 'var(--' + name.replace(/\//g, '-') + ')'); } catch (e) { /* ок */ }
    V[name] = v;
    return v;
  };
  const prim = coll(`${KIT} · Примитивы`);
  for (const p of PALETTE) for (const [shade, h] of Object.entries(p.shades)) mk(prim, `${p.key}/${shade}`, 'COLOR', hex(h), []);
  const tok = coll(`${KIT} · Токены`);
  for (const [name, ref, scopes] of SEMANTIC) mk(tok, name, 'COLOR', { type: 'VARIABLE_ALIAS', id: V[ref].id }, scopes);
  const dim = coll(`${KIT} · Размеры`);
  for (const [k, v] of Object.entries(SPACING)) mk(dim, `spacing/${k}`, 'FLOAT', v, ['GAP']);
  for (const [k, v] of Object.entries(RADIUS)) mk(dim, `radius/${k}`, 'FLOAT', v, ['CORNER_RADIUS']);
}

async function buildTextStyles(F) {
  const ex = await figma.getLocalTextStylesAsync();
  for (const [k, [name, w, size, lh, ls, upper]] of Object.entries(TYPE)) {
    const full = `${KIT}/${name}`;
    let s = ex.find((x) => x.name === full);
    if (!s) { s = figma.createTextStyle(); STATS.textStyles++; }
    s.name = full;
    s.fontName = F[w];
    s.fontSize = size;
    s.lineHeight = { unit: 'PIXELS', value: lh };
    s.letterSpacing = { unit: 'PIXELS', value: ls };
    s.textCase = upper ? 'UPPER' : 'ORIGINAL';
    TS[k] = s;
  }
}

// ---------------------------------------------------------------------
// 3. Страницы
// ---------------------------------------------------------------------
async function getPage(name) {
  let p = figma.root.children.find((x) => x.name === name);
  if (p) return p;
  const first = figma.root.children[0];
  await first.loadAsync();
  if (figma.root.children.length === 1 && first.children.length === 0 && !first.name.startsWith('🎨')) { first.name = name; return first; }
  try { p = figma.createPage(); p.name = name; return p; }
  catch (e) { return first; } // лимит страниц (Starter) — кладём всё на первую
}
function rootFrame(name, page) {
  const f = AL('VERTICAL', name);
  f.paddingTop = 80; f.paddingBottom = 80; f.paddingLeft = 80; f.paddingRight = 80;
  f.itemSpacing = 80;
  f.fills = [solid('#F7F7F7')];
  page.appendChild(f);
  const others = page.children.filter((n) => n !== f);
  f.x = others.length ? Math.max(...others.map((n) => n.x + n.width)) + 200 : 0;
  f.y = 0;
  return f;
}
async function section(parent, title, desc, dir = 'HORIZONTAL') {
  const s = AL('VERTICAL', title);
  s.itemSpacing = 24;
  parent.appendChild(s);
  const head = AL('VERTICAL', 'Заголовок раздела'); head.itemSpacing = 8; s.appendChild(head);
  head.appendChild(await T(title, 'h1', 'color/text/primary'));
  if (desc) head.appendChild(await T(desc, 'body', 'color/text/secondary', { width: 760 }));
  const body = AL(dir, 'Содержимое');
  body.itemSpacing = 32;
  s.appendChild(body);
  return body;
}

// ---------------------------------------------------------------------
// 4. Страница «Основы»
// ---------------------------------------------------------------------
async function buildFoundations(page, family) {
  await figma.setCurrentPageAsync(page);
  const root = rootFrame(`${KIT} · Основы`, page);

  // Обложка
  const cover = AL('HORIZONTAL', 'Обложка'); cover.itemSpacing = 40; cover.counterAxisAlignItems = 'CENTER';
  pad(cover, 'xl', 'xl'); fill(cover, 'color/secondary/default'); depth(cover, 'color/secondary/shadow', 0, 8); rad(cover, 'xl');
  root.appendChild(cover);
  const m = svgNode(foxSvg('Радость'), 'Лиса'); m.rescale(1.8); cover.appendChild(m);
  const ct = AL('VERTICAL', 'Текст'); ct.itemSpacing = 8; cover.appendChild(ct);
  ct.appendChild(await T('Языки народов России · v3', 'overline', 'color/text/on-color', { opacity: 0.85 }));
  ct.appendChild(await T(APP_NAME || 'UI Kit', 'display', 'color/text/on-color'));
  if (!APP_NAME) ct.appendChild(await T('Название продукта — в работе', 'bodyBold', 'color/text/on-color', { opacity: 0.85 }));
  ct.appendChild(await T(`Учим языки народов России. Курсы: ${LANGS.map((l) => l.ru.toLowerCase()).join(', ')} — и это только начало.`, 'h3', 'color/text/on-color', { width: 620 }));
  ct.appendChild(await T(`Маскот — Лиса: она живёт во всех регионах России. Шрифт: ${family}. Структура — по мотивам Duolingo UI Kit (Marvilo).`, 'body', 'color/text/on-color', { width: 620, opacity: 0.9 }));

  // Цвета
  const colors = await section(root, 'Цвета', 'Яркая насыщенная палитра в духе Duolingo. Примитивы скрыты из пикеров — в макетах используйте семантические токены «color/…» из коллекции «' + KIT + ' · Токены».', 'VERTICAL');
  colors.itemSpacing = 24;
  for (const p of PALETTE) {
    const row = AL('HORIZONTAL', p.ru); row.itemSpacing = 16; row.counterAxisAlignItems = 'CENTER';
    colors.appendChild(row);
    const lbl = AL('VERTICAL', 'Название'); lbl.itemSpacing = 2; row.appendChild(lbl);
    lbl.appendChild(await T(p.ru, 'h3', 'color/text/primary'));
    lbl.appendChild(await T(p.role, 'caption', 'color/text/secondary', { width: 200 }));
    for (const [shade, h] of Object.entries(p.shades)) {
      const sw = AL('VERTICAL', `${p.key}/${shade}`); sw.itemSpacing = 8; row.appendChild(sw);
      const chip = figma.createFrame(); chip.name = 'Образец'; chip.resize(112, 72); chip.fills = [vpaint(`${p.key}/${shade}`)];
      chip.cornerRadius = 12; chip.strokes = [solid('#000000', 0.06)]; chip.strokeWeight = 1; chip.strokeAlign = 'INSIDE';
      sw.appendChild(chip);
      sw.appendChild(await T(`${p.key}/${shade}`, 'caption', 'color/text/primary'));
      sw.appendChild(await T(h.toUpperCase(), 'caption', 'color/text/secondary'));
    }
  }

  // Семантика
  const sem = await section(root, 'Семантические токены', 'Роли: primary — Луг, secondary — Небо, brand — Лиса, reward — Мёд, danger — Рябина, premium — Черника. Привязывайте к заливкам, тексту и обводкам именно их.', 'VERTICAL');
  const semGrid = wrapRow('Токены', 1400, 12, 12); sem.appendChild(semGrid);
  for (const [name, ref] of SEMANTIC) {
    const r = AL('HORIZONTAL', name); r.itemSpacing = 12; r.counterAxisAlignItems = 'CENTER'; pad(r, 'xs', 'sm'); fill(r, 'color/bg/default'); rad(r, 'md');
    r.strokes = [solid('#E5E5E5')]; r.strokeWeight = 1;
    semGrid.appendChild(r);
    const dot = figma.createEllipse(); dot.resize(28, 28); dot.fills = [vpaint(name)]; dot.strokes = [solid('#000000', 0.08)]; dot.strokeWeight = 1; r.appendChild(dot);
    const tx = AL('VERTICAL', 'Текст'); r.appendChild(tx);
    tx.appendChild(await T(name, 'caption', 'color/text/primary'));
    tx.appendChild(await T('→ ' + ref, 'caption', 'color/text/secondary'));
    fixW(r, 330);
  }

  // Типографика
  const typo = await section(root, 'Типографика', `Округлый гротеск (${family}) с расширенной кириллицей. Если в строках ниже какая-то буква выглядит иначе — смените шрифт в стилях «${KIT}/…».`, 'VERTICAL');
  typo.itemSpacing = 20;
  const sample = `${LANGS.map((l) => l.hello).join(' ')} — ${LANGS[0].helloRu}`;
  for (const [k, [name, w, size, lh]] of Object.entries(TYPE)) {
    const r = AL('HORIZONTAL', name); r.itemSpacing = 32; r.counterAxisAlignItems = 'CENTER'; typo.appendChild(r);
    r.appendChild(await T(`${name} · ${size}/${lh} · ${w}`, 'caption', 'color/text/secondary', { width: 260 }));
    r.appendChild(await T(k === 'button' || k === 'overline' ? 'Продолжить урок' : k === 'word' ? LANGS[0].phrase : sample, k, 'color/text/primary'));
  }

  // Языки курсов
  const langs = await section(root, 'Языки курсов', 'Данные курсов живут в массиве LANGS в начале скрипта. Каждому языку нужна панель букв, которых нет на русской раскладке.', 'VERTICAL');
  langs.itemSpacing = 12;
  for (const l of LANGS) {
    const r = AL('HORIZONTAL', l.ru); r.itemSpacing = 24; r.counterAxisAlignItems = 'CENTER'; pad(r, 'md', 'lg'); fill(r, 'color/bg/default'); depth(r, 'color/border/default', 2, 4); rad(r, 'lg');
    langs.appendChild(r);
    const fl = svgNode(flagSvg(l.flag), 'Флаг'); fl.clipsContent = true; fl.cornerRadius = 8; fl.strokes = [solid('#000000', 0.1)]; fl.strokeWeight = 1.5; fl.strokeAlign = 'INSIDE'; r.appendChild(fl);
    const names = AL('VERTICAL', 'Название'); r.appendChild(names);
    names.appendChild(await T(l.ru, 'h3', 'color/text/primary'));
    names.appendChild(await T(`${l.native} · ${l.hello}`, 'caption', 'color/text/secondary'));
    fixW(names, 220);
    r.appendChild(await T(l.chars.join('  ') + '    ' + l.chars.map((c) => c.toUpperCase()).join('  '), 'h1', 'color/brand/shadow', { width: 260 }));
    r.appendChild(await T(l.phrase, 'word', 'color/text/primary'));
  }

  // Отступы и радиусы
  const dims = await section(root, 'Отступы и скругления', 'Шаг сетки 4 px. Радиусы крупные и «мягкие», как у Duolingo.', 'HORIZONTAL');
  dims.itemSpacing = 80;
  const spc = AL('VERTICAL', 'Отступы'); spc.itemSpacing = 10; dims.appendChild(spc);
  for (const [k, v] of Object.entries(SPACING)) {
    const r = AL('HORIZONTAL', k); r.itemSpacing = 16; r.counterAxisAlignItems = 'CENTER'; spc.appendChild(r);
    r.appendChild(await T(`spacing/${k} · ${v}`, 'caption', 'color/text/secondary', { width: 140 }));
    const bar = figma.createRectangle(); bar.resize(v * 4, 16); bar.cornerRadius = 4; bar.fills = [vpaint('color/secondary/muted')]; r.appendChild(bar);
  }
  const rds = AL('HORIZONTAL', 'Радиусы'); rds.itemSpacing = 24; dims.appendChild(rds);
  for (const [k, v] of Object.entries(RADIUS)) {
    const c = AL('VERTICAL', k); c.itemSpacing = 8; c.counterAxisAlignItems = 'CENTER'; rds.appendChild(c);
    const b = figma.createFrame(); b.resize(72, 72); b.fills = [vpaint('color/secondary/subtle')]; b.strokes = [vpaint('color/secondary/muted')]; b.strokeWeight = 2; b.strokeAlign = 'INSIDE';
    c.appendChild(b); rad(b, k);
    c.appendChild(await T(`${k} · ${v === 999 ? '∞' : v}`, 'caption', 'color/text/secondary'));
  }

  // Принципы
  const pr = await section(root, 'Принципы', null, 'VERTICAL');
  const prGrid = wrapRow('Карточки', 1400, 24, 24); pr.appendChild(prGrid);
  const rules = [
    ['Объём', 'Интерактивные элементы «стоят» на нижней грани 4 px более тёмного оттенка. Нажатие убирает грань.'],
    ['Яркость', 'Цвета насыщенные, как у Duolingo. Белый текст на ярком — только крупный и жирный (кнопки, заголовки). Мелкий текст — тёмным или оттенком shadow.'],
    ['Лиса-проводник', 'Лиса живёт по всей России — от Коми до Чувашии. Эмоции подкрепляют ответы: Радость — верно, Грусть — ошибка, Удивление — новое слово.'],
    ['Язык — герой', 'Слова на изучаемом языке — стилем «Слово урока», русский — обычным текстом.'],
    ['Культура рядом', 'Орнаменты, флаги и сюжеты — из культуры народа курса. Без стереотипов и карикатур.'],
    ['Похвала', 'Ошибка — не наказание: всегда показываем правильный ответ, Лиса сочувствует, а не ругает.'],
  ];
  for (const [h, d] of rules) {
    const c = AL('VERTICAL', h); c.itemSpacing = 8; pad(c, 'lg', 'lg'); fill(c, 'color/bg/default'); depth(c, 'color/border/default', 2, 4); rad(c, 'lg');
    prGrid.appendChild(c);
    c.appendChild(await T(h, 'h2', 'color/text/primary'));
    c.appendChild(await T(d, 'body', 'color/text/secondary', { width: 380 }));
  }
  return root;
}

// ---------------------------------------------------------------------
// 5. Компоненты
// ---------------------------------------------------------------------
async function buildComponents(page) {
  await figma.setCurrentPageAsync(page);
  const root = rootFrame(`${KIT} · Компоненты`, page);
  const K = {};

  // ---- Маскот
  {
    const body = await section(root, 'Маскот · Лиса', 'Четыре эмоции, свойство «Эмоция». Лиса встроена в реплики персонажа, учебный путь и экран итогов — замена варианта здесь обновит все экраны.');
    const vs = [];
    for (const e of EMOTIONS) {
      const c = figma.createComponentFromNode(svgNode(foxSvg(e), e));
      c.name = `Эмоция=${e}`; c.fills = [];
      STATS.components++;
      body.appendChild(c); vs.push(c);
    }
    K.mascot = combine(vs, body, 'Маскот', 4, 'Маскот Лиса. Свойство «Эмоция»: Спокойствие, Радость, Грусть, Удивление.');
  }

  // ---- Иконки
  {
    const body = await section(root, 'Иконки', 'Цветные иконки 24×24. В компонентах подключены через Instance swap — меняйте в панели свойств.', 'VERTICAL');
    const grid = wrapRow('Сетка иконок', 1200, 16, 16); body.appendChild(grid);
    K.icon = {};
    for (const [name, b] of ICONS) {
      const cell = AL('VERTICAL', name); cell.itemSpacing = 8; cell.counterAxisAlignItems = 'CENTER'; pad(cell, 'sm', 'sm'); fill(cell, 'color/bg/default'); rad(cell, 'md');
      grid.appendChild(cell);
      const c = figma.createComponentFromNode(svgNode(svg24(b), name));
      c.name = `Иконка/${name}`; c.fills = [];
      STATS.components++;
      cell.appendChild(c);
      cell.appendChild(await T(name, 'caption', 'color/text/secondary'));
      fixW(cell, 104);
      K.icon[name] = c;
    }
  }

  // ---- Флаги
  {
    const body = await section(root, 'Флаги курсов', 'Упрощённые флаги республик 44×32 для карточек курсов. Вариант «Скоро» — для языков, которые ещё в работе. Новые языки добавляются автоматически из LANGS.');
    const vs = [];
    for (const [lang, b] of [...LANGS.map((l) => [l.ru, l.flag]), ['Скоро', SOON.flag]]) {
      const c = figma.createComponentFromNode(svgNode(flagSvg(b), lang));
      c.name = `Язык=${lang}`; c.clipsContent = true; c.cornerRadius = 8;
      c.strokes = [solid('#000000', 0.1)]; c.strokeWeight = 1.5; c.strokeAlign = 'INSIDE';
      STATS.components++;
      body.appendChild(c); vs.push(c);
    }
    K.flag = combine(vs, body, 'Флаг', Math.min(vs.length, 6), 'Флаг курса (упрощённо). Свойство «Язык».');
  }

  // ---- Кнопки
  {
    const body = await section(root, 'Кнопки', 'Главное действие — «Основная». Нижняя грань 4 px даёт объём; в состоянии «Нажато» грань пропадает. Текст — свойство «Текст».');
    const STY = [
      ['Основная', 'color/primary/default', 'color/primary/shadow', 'color/text/on-color'],
      ['Вторичная', 'color/secondary/default', 'color/secondary/shadow', 'color/text/on-color'],
      ['Брендовая', 'color/brand/default', 'color/brand/shadow', 'color/text/on-color'],
      ['Опасная', 'color/danger/default', 'color/danger/shadow', 'color/text/on-color'],
      ['Контур', 'color/bg/default', 'color/border/default', 'color/secondary/default'],
      ['Призрачная', null, null, 'color/secondary/default'],
    ];
    const vs = [];
    for (const [s, bg, sh, tx] of STY) for (const st of ['Обычное', 'Нажато', 'Недоступно']) {
      const c = COMP(`Стиль=${s}, Состояние=${st}`);
      center(c); pad(c, 'sm', 'lg'); rad(c, 'lg');
      body.appendChild(c);
      const dis = st === 'Недоступно';
      c.appendChild(await T('Продолжить', 'button', dis ? 'color/text/disabled' : tx, { name: 'Текст' }));
      if (s === 'Призрачная') { fill(c, st === 'Нажато' ? 'color/secondary/subtle' : null); }
      else if (dis) { fill(c, 'color/bg/muted'); }
      else if (s === 'Контур') { fill(c, st === 'Нажато' ? 'color/bg/subtle' : bg); depth(c, sh, 2, st === 'Нажато' ? 2 : 4); }
      else { fill(c, bg); if (st === 'Обычное') depth(c, sh, 0, 4); }
      fixW(c, 280);
      vs.push(c);
    }
    K.button = combine(vs, body, 'Кнопка', 3, 'Кнопка. Свойства: Стиль, Состояние, Текст. Растягивайте на ширину экрана (Fill).');
    K.buttonText = textProp(K.button, 'Текст', 'Продолжить', 'Текст');
  }

  // ---- Метка
  {
    const body = await section(root, 'Метка', 'Короткие статусы: НОВОЕ, НАЧАТЬ, СКОРО, ПРО.');
    const vs = [];
    for (const [cl, bg, tx] of [['Зелёный', 'color/primary/default', 'color/text/on-color'], ['Синий', 'color/secondary/default', 'color/text/on-color'], ['Оранжевый', 'color/brand/default', 'color/text/on-color'], ['Жёлтый', 'color/reward/default', 'color/text/primary'], ['Красный', 'color/danger/default', 'color/text/on-color'], ['Фиолетовый', 'color/premium/default', 'color/text/on-color'], ['Серый', 'color/bg/muted', 'color/text/secondary']]) {
      const c = COMP(`Цвет=${cl}`); center(c); c.paddingTop = 4; c.paddingBottom = 4; c.paddingLeft = 10; c.paddingRight = 10; rad(c, 'full');
      body.appendChild(c);
      fill(c, bg);
      c.appendChild(await T('Новое', 'overline', tx, { name: 'Текст' }));
      vs.push(c);
    }
    K.tag = combine(vs, body, 'Метка', 7, 'Метка. Свойства: Цвет, Текст.');
    K.tagText = textProp(K.tag, 'Текст', 'Новое', 'Текст');
  }

  // ---- Счётчики
  {
    const body = await section(root, 'Счётчики', 'Ударный режим, кристаллы, жизни, опыт. Значение — свойство «Значение».');
    const T4 = [['Ударный режим', 'Огонь', '12', 'color/brand/default'], ['Кристаллы', 'Кристалл', '500', 'color/secondary/default'], ['Жизни', 'Сердце', '5', 'color/danger/default'], ['Опыт', 'Молния', '120', 'color/reward/shadow']];
    const vs = [];
    for (const [t, icon, val, col] of T4) {
      const c = COMP(`Тип=${t}`); c.itemSpacing = 6; c.counterAxisAlignItems = 'CENTER';
      body.appendChild(c);
      const i = inst(K.icon[icon]); i.name = 'Иконка'; c.appendChild(i);
      c.appendChild(await T(val, 'h3', col, { name: 'Значение' }));
      vs.push(c);
    }
    K.stat = combine(vs, body, 'Счётчик', 4, 'Счётчик в шапке. Свойства: Тип, Значение.');
    K.statText = textProp(K.stat, 'Значение', '5', 'Значение');
  }

  // ---- Прогресс-бар
  {
    const body = await section(root, 'Прогресс урока', 'Полоса прогресса с бликом. Вариант «Прогресс» — шаг 25 %.');
    const vs = [];
    for (const p of [0, 25, 50, 75, 100]) {
      const c = COMP(`Прогресс=${p}%`); c.counterAxisAlignItems = 'CENTER';
      body.appendChild(c);
      c.resize(240, 16); fill(c, 'color/bg/muted'); rad(c, 'full'); c.clipsContent = true;
      if (p > 0) {
        const w = Math.round(240 * p / 100);
        const bar = figma.createFrame(); bar.name = 'Заполнение'; bar.resize(w, 16); fill(bar, 'color/primary/default'); bar.cornerRadius = 8;
        c.appendChild(bar);
        if (w > 20) { const hl = figma.createRectangle(); hl.name = 'Блик'; hl.resize(w - 16, 4); hl.x = 8; hl.y = 4; hl.cornerRadius = 2; hl.fills = [solid('#FFFFFF', 0.35)]; bar.appendChild(hl); }
      }
      vs.push(c);
    }
    K.progress = combine(vs, body, 'Прогресс', 5, 'Прогресс-бар урока.');
  }

  // ---- Шапка урока
  {
    const body = await section(root, 'Шапка урока', 'Закрыть · прогресс · жизни. Вложенные экземпляры открыты (exposed) — прогресс и число жизней меняются прямо в панели свойств.');
    const c = COMP('Шапка урока'); c.itemSpacing = 16; c.counterAxisAlignItems = 'CENTER';
    body.appendChild(c);
    const x = inst(K.icon['Закрыть']); x.name = 'Закрыть'; c.appendChild(x);
    const pg = inst(K.progress, { 'Прогресс': '50%' }); pg.name = 'Прогресс'; append(c, pg, { grow: true });
    const hearts = inst(K.stat, { 'Тип': 'Жизни' }); hearts.name = 'Жизни'; c.appendChild(hearts);
    fixW(c, 343);
    pg.layoutSizingHorizontal = 'FILL';
    pg.isExposedInstance = true; hearts.isExposedInstance = true;
    c.description = 'Верхняя панель экрана упражнения. Ширина 343 (экран 375 − 2×16).';
    K.topbar = c;
  }

  // ---- Реплика персонажа
  {
    const body = await section(root, 'Реплика персонажа', 'Лиса + облачко с фразой на изучаемом языке. Пунктир под словами — подсказка по тапу. Эмоция Лисы меняется во вложенном экземпляре.');
    const c = COMP('Реплика'); c.itemSpacing = 14; c.counterAxisAlignItems = 'MAX';
    body.appendChild(c);
    const m = inst(K.mascot, { 'Эмоция': 'Спокойствие' }); m.name = 'Маскот'; m.rescale(0.8); c.appendChild(m);
    const bub = AL('HORIZONTAL', 'Облачко'); bub.itemSpacing = 10; bub.counterAxisAlignItems = 'CENTER'; pad(bub, 'sm', 'md'); fill(bub, 'color/bg/default'); depth(bub, 'color/border/default', 2, 2); rad(bub, 'lg');
    c.appendChild(bub);
    const sp = inst(K.icon['Динамик']); sp.name = 'Звук'; bub.appendChild(sp);
    const ph = await T(LANGS[0].phrase, 'word', 'color/text/primary', { name: 'Фраза' });
    try { ph.textDecoration = 'UNDERLINE'; ph.textDecorationStyle = 'DOTTED'; } catch (e) { /* старый API */ }
    bub.appendChild(ph);
    fixW(c, 343);
    bub.layoutSizingHorizontal = 'FILL';
    wrap(ph);
    const tail = svgNode(TAIL_SVG, 'Хвостик'); bub.appendChild(tail);
    tail.layoutPositioning = 'ABSOLUTE'; tail.constraints = { horizontal: 'MIN', vertical: 'MAX' };
    tail.x = -10; tail.y = Math.max(8, bub.height - 32);
    m.isExposedInstance = true;
    c.description = 'Реплика Лисы. Свойство «Фраза» + вложенный Маскот (Эмоция).';
    K.speech = c;
    K.speechText = textProp(c, 'Фраза', LANGS[0].phrase, 'Фраза');
  }

  // ---- Плитки слов
  {
    const body = await section(root, 'Плитка слова', 'Банк слов в упражнениях «собери предложение». «Пустая» — место, откуда слово уже забрали.');
    const vs = [];
    for (const st of ['Обычная', 'Пустая', 'Недоступна']) {
      const c = COMP(`Состояние=${st}`); center(c); pad(c, 'sm', 'md'); rad(c, 'md');
      body.appendChild(c);
      const empty = st === 'Пустая';
      c.appendChild(await T('изучаю', 'word', empty ? 'color/bg/muted' : st === 'Недоступна' ? 'color/text/disabled' : 'color/text/primary', { name: 'Слово' }));
      if (empty) fill(c, 'color/bg/muted'); else { fill(c, 'color/bg/default'); depth(c, 'color/border/default', 2, st === 'Недоступна' ? 2 : 4); }
      vs.push(c);
    }
    K.tile = combine(vs, body, 'Плитка слова', 3, 'Плитка слова. Свойства: Состояние, Слово.');
    K.tileText = textProp(K.tile, 'Слово', 'изучаю', 'Слово');
  }

  // ---- Клавиша + панели букв
  {
    const body = await section(root, 'Клавиша спецсимвола', 'Буквы, которых нет на русской раскладке. Панели для каждого курса собираются автоматически из LANGS.');
    const vs = [];
    const defChar = LANGS[0].chars[LANGS[0].chars.length - 1];
    for (const st of ['Обычная', 'Нажата']) {
      const c = COMP(`Состояние=${st}`); center(c); rad(c, 'md');
      body.appendChild(c);
      c.appendChild(await T(defChar, 'h2', 'color/text/primary', { name: 'Буква', align: 'CENTER' }));
      fill(c, st === 'Нажата' ? 'color/secondary/subtle' : 'color/bg/default'); depth(c, st === 'Нажата' ? 'color/secondary/muted' : 'color/border/default', 2, st === 'Нажата' ? 2 : 4);
      fixBox(c, 44, 48);
      vs.push(c);
    }
    K.key = combine(vs, body, 'Клавиша', 2, 'Клавиша спецсимвола. Свойство «Буква».');
    K.keyText = textProp(K.key, 'Буква', defChar, 'Буква');

    const panels = AL('VERTICAL', 'Панели букв'); panels.itemSpacing = 12; body.appendChild(panels);
    for (const l of LANGS) {
      const row = COMP(`Панель букв/${l.ru}`); row.itemSpacing = 6; row.counterAxisAlignItems = 'CENTER'; pad(row, 'xs', 'xs'); fill(row, 'color/bg/subtle'); rad(row, 'md');
      panels.appendChild(row);
      for (const ch of [...l.chars, ...l.chars.map((x) => x.toUpperCase())]) { const k = inst(K.key); k.setProperties({ [K.keyText]: ch }); k.name = ch; row.appendChild(k); }
      row.description = `Панель спецбукв курса «${l.ru}».`;
    }
  }

  // ---- Поле ввода
  {
    const body = await section(root, 'Поле ввода', 'Упражнения «напишите перевод». Пример ошибки — слово без спецбуквы: поэтому под полем всегда стоит «Панель букв».');
    const vs = [];
    const L = LANGS[0];
    const ST = [['Обычное', 'color/bg/subtle', 'color/border/default', 'Введите перевод…', 'color/text/disabled'], ['Фокус', 'color/bg/default', 'color/secondary/default', L.phrase.replace(/[.!?]$/, ''), 'color/text/primary'], ['Ошибка', 'color/danger/subtle', 'color/danger/default', L.typo, 'color/danger/shadow'], ['Недоступно', 'color/bg/muted', 'color/border/default', 'Введите перевод…', 'color/text/disabled']];
    for (const [st, bg, br, txt, tc] of ST) {
      const c = COMP(`Состояние=${st}`); c.counterAxisAlignItems = 'CENTER'; pad(c, 'sm', 'md'); rad(c, 'md');
      body.appendChild(c);
      fill(c, bg); depth(c, br, 2, 2);
      const tt = await T(txt, 'body', tc, { name: 'Текст' }); c.appendChild(tt);
      fixW(c, 343); wrap(tt);
      vs.push(c);
    }
    K.input = combine(vs, body, 'Поле ввода', 2, 'Поле ввода. Свойства: Состояние, Текст.');
    K.inputText = textProp(K.input, 'Текст', 'Введите перевод…', 'Текст');
  }

  // ---- Карточка выбора
  {
    const body = await section(root, 'Карточка выбора', 'Ответы в тестах, цели обучения, уровень. Иконка меняется через Instance swap.');
    const vs = [];
    for (const st of ['Обычная', 'Выбрана', 'Недоступна']) {
      const c = COMP(`Состояние=${st}`); c.itemSpacing = 16; c.counterAxisAlignItems = 'CENTER'; pad(c, 'sm', 'md'); rad(c, 'lg');
      body.appendChild(c);
      const box = AL('HORIZONTAL', 'Иконка-подложка'); center(box); fixBox(box, 40, 40); fill(box, st === 'Выбрана' ? 'color/bg/default' : 'color/bg/subtle'); rad(box, 'md');
      c.appendChild(box);
      const ic = inst(K.icon['Книга']); ic.name = 'Иконка'; box.appendChild(ic);
      if (st === 'Недоступна') ic.opacity = 0.4;
      const lbl = await T('Говорить с бабушкой', 'bodyBold', st === 'Выбрана' ? 'color/secondary/shadow' : st === 'Недоступна' ? 'color/text/disabled' : 'color/text/primary', { name: 'Подпись' }); c.appendChild(lbl);
      if (st === 'Выбрана') { fill(c, 'color/secondary/subtle'); depth(c, 'color/secondary/muted', 2, 4); }
      else { fill(c, 'color/bg/default'); depth(c, 'color/border/default', 2, st === 'Недоступна' ? 2 : 4); }
      fixW(c, 343); wrap(lbl);
      vs.push(c);
    }
    K.option = combine(vs, body, 'Карточка выбора', 3, 'Карточка выбора. Свойства: Состояние, Подпись, Иконка.');
    K.optionText = textProp(K.option, 'Подпись', 'Говорить с бабушкой', 'Подпись');
    K.optionIcon = swapProp(K.option, 'Иконка', K.icon['Книга'], 'Иконка');
  }

  // ---- Карточка курса
  {
    const body = await section(root, 'Карточка курса', 'Выбор языка на онбординге. Флаг — вложенный экземпляр, его язык меняется в панели свойств. «Скоро» — для курсов в разработке.');
    const vs = [];
    for (const st of ['Обычная', 'Выбрана', 'Скоро']) {
      const sel = st === 'Выбрана', soon = st === 'Скоро';
      const c = COMP(`Состояние=${st}`); c.itemSpacing = 16; c.counterAxisAlignItems = 'CENTER'; pad(c, 'sm', 'md'); rad(c, 'lg');
      body.appendChild(c);
      const f = inst(K.flag, { 'Язык': soon ? 'Скоро' : LANGS[0].ru }); f.name = 'Флаг'; c.appendChild(f);
      const tx = AL('VERTICAL', 'Тексты'); append(c, tx, { grow: true });
      tx.appendChild(await T(soon ? SOON.ru : LANGS[0].ru, 'h3', sel ? 'color/secondary/shadow' : soon ? 'color/text/secondary' : 'color/text/primary', { name: 'Язык' }));
      tx.appendChild(await T(soon ? SOON.native : LANGS[0].native, 'caption', sel ? 'color/secondary/default' : soon ? 'color/text/disabled' : 'color/text/secondary', { name: 'Самоназвание' }));
      if (soon) { const tg = inst(K.tag, { 'Цвет': 'Серый' }); tg.setProperties({ [K.tagText]: 'Скоро' }); tg.name = 'Метка'; c.appendChild(tg); }
      else { const ch = inst(K.icon['Шеврон']); ch.name = 'Шеврон'; c.appendChild(ch); }
      if (sel) { fill(c, 'color/secondary/subtle'); depth(c, 'color/secondary/muted', 2, 4); }
      else if (soon) { fill(c, 'color/bg/subtle'); depth(c, 'color/border/default', 2, 2); }
      else { fill(c, 'color/bg/default'); depth(c, 'color/border/default', 2, 4); }
      fixW(c, 343);
      tx.layoutSizingHorizontal = 'FILL';
      for (const t of tx.children) wrap(t);
      f.isExposedInstance = true;
      vs.push(c);
    }
    K.course = combine(vs, body, 'Карточка курса', 3, 'Карточка курса. Свойства: Состояние, Язык, Самоназвание + вложенный Флаг.');
    K.courseLang = textProp(K.course, 'Язык', LANGS[0].ru, 'Язык');
    K.courseNative = textProp(K.course, 'Самоназвание', LANGS[0].native, 'Самоназвание');
  }

  // ---- Карточка с картинкой
  {
    const body = await section(root, 'Карточка с картинкой', `Упражнение «выберите правильное слово». Иллюстрация — заглушка, замените картинкой. Пример: «${LANGS[0].picture}» — ${LANGS[0].pictureRu}.`);
    const vs = [];
    for (const st of ['Обычная', 'Выбрана']) {
      const sel = st === 'Выбрана';
      const c = COMP(`Состояние=${st}`, 'VERTICAL'); c.itemSpacing = 12; c.counterAxisAlignItems = 'CENTER'; pad(c, 'md', 'md'); rad(c, 'lg');
      body.appendChild(c);
      const img = AL('HORIZONTAL', 'Иллюстрация'); center(img); fixBox(img, 124, 96); fill(img, sel ? 'color/bg/default' : 'color/bg/subtle'); rad(img, 'md');
      c.appendChild(img);
      const ic = inst(K.icon['Изображение']); ic.rescale(2); img.appendChild(ic);
      c.appendChild(await T(LANGS[0].picture, 'h3', sel ? 'color/secondary/shadow' : 'color/text/primary', { name: 'Слово', align: 'CENTER' }));
      if (sel) { fill(c, 'color/secondary/subtle'); depth(c, 'color/secondary/muted', 2, 4); }
      else { fill(c, 'color/bg/default'); depth(c, 'color/border/default', 2, 4); }
      vs.push(c);
    }
    K.picture = combine(vs, body, 'Карточка с картинкой', 2, 'Карточка с картинкой. Свойства: Состояние, Слово.');
    K.pictureText = textProp(K.picture, 'Слово', LANGS[0].picture, 'Слово');
  }

  // ---- Плашка ответа
  {
    const body = await section(root, 'Плашка ответа', 'Появляется снизу после проверки. Ошибка всегда показывает правильный ответ (свойство «Ответ»).');
    const vs = [];
    for (const [t, bg, col, btn, title, ans] of [['Верно', 'color/primary/subtle', 'color/primary/shadow', 'Основная', 'Отлично!', null], ['Ошибка', 'color/danger/subtle', 'color/danger/shadow', 'Опасная', 'Правильный ответ:', LANGS[0].answer.join(' ')]]) {
      const c = COMP(`Тип=${t}`, 'VERTICAL'); c.itemSpacing = 16; pad(c, 'lg', 'md'); fill(c, bg);
      body.appendChild(c);
      const row = AL('HORIZONTAL', 'Заголовок'); row.itemSpacing = 12; row.counterAxisAlignItems = 'CENTER'; c.appendChild(row);
      const badge = AL('HORIZONTAL', 'Значок'); center(badge); fixBox(badge, 32, 32); fill(badge, 'color/bg/default'); rad(badge, 'full');
      row.appendChild(badge);
      badge.appendChild(svgNode(t === 'Верно' ? GLYPH.checkSmall : GLYPH.closeSmall, 'Глиф'));
      row.appendChild(await T(title, 'h2', col, { name: 'Заголовок' }));
      const at = ans ? await T(ans, 'body', col, { name: 'Ответ' }) : null; if (at) c.appendChild(at);
      const b = inst(K.button, { 'Стиль': btn, 'Состояние': 'Обычное' }); b.setProperties({ [K.buttonText]: 'Продолжить' });
      c.appendChild(b);
      fixW(c, 375);
      b.layoutSizingHorizontal = 'FILL';
      if (at) wrap(at);
      vs.push(c);
    }
    K.feedback = combine(vs, body, 'Плашка ответа', 2, 'Плашка результата проверки. Свойства: Тип, Ответ.');
    K.feedbackAnswer = textProp(K.feedback, 'Ответ', LANGS[0].answer.join(' '), 'Ответ');
  }

  // ---- Итог урока
  {
    const body = await section(root, 'Итог урока', 'Карточки на экране завершения урока: опыт, точность, время.');
    const vs = [];
    for (const [t, role, icon, val] of [['Опыт', 'reward', 'Молния', '+15'], ['Точность', 'primary', 'Мишень', '92%'], ['Время', 'secondary', 'Часы', '2:41']]) {
      const c = COMP(`Тип=${t}`, 'VERTICAL'); c.itemSpacing = 4; c.counterAxisAlignItems = 'CENTER';
      c.paddingTop = 6; c.paddingBottom = 2; c.paddingLeft = 2; c.paddingRight = 2;
      fill(c, `color/${role}/default`); rad(c, 'lg');
      body.appendChild(c);
      c.appendChild(await T(t, 'overline', role === 'reward' ? 'color/text/primary' : 'color/text/on-color', { name: 'Подпись' }));
      const inner = AL('HORIZONTAL', 'Значение-подложка'); inner.itemSpacing = 6; center(inner); pad(inner, 'sm', 'xs'); fill(inner, 'color/bg/default'); rad(inner, 'md');
      c.appendChild(inner);
      const ic = inst(K.icon[icon]); ic.name = 'Иконка'; inner.appendChild(ic);
      inner.appendChild(await T(val, 'h3', `color/${role}/${role === 'reward' ? 'shadow' : 'default'}`, { name: 'Значение' }));
      fixW(c, 104);
      inner.layoutSizingHorizontal = 'FILL';
      vs.push(c);
    }
    K.result = combine(vs, body, 'Итог урока', 3, 'Карточка итога. Свойства: Тип, Значение.');
    K.resultText = textProp(K.result, 'Значение', '+15', 'Значение');
  }

  // ---- Узел пути
  {
    const body = await section(root, 'Узел пути', 'Шаги учебного пути на главном экране.');
    const vs = [];
    for (const [st, bg, sh, g] of [['Пройден', 'color/reward/default', 'color/reward/shadow', GLYPH.check], ['Текущий', 'color/primary/default', 'color/primary/shadow', GLYPH.star], ['Заблокирован', 'color/bg/muted', 'color/border/strong', GLYPH.lock]]) {
      const c = COMP(`Состояние=${st}`); center(c);
      body.appendChild(c);
      fixBox(c, 72, 72); fill(c, bg); depth(c, sh, 0, 6); rad(c, 'full');
      c.appendChild(svgNode(g, 'Глиф'));
      vs.push(c);
    }
    K.node = combine(vs, body, 'Узел пути', 3, 'Узел учебного пути. Свойство «Состояние».');
  }

  // ---- Баннер раздела
  {
    const body = await section(root, 'Баннер раздела', 'Заголовок блока на учебном пути. Цвет раздела помогает ориентироваться.');
    const vs = [];
    for (const [cl, role] of [['Зелёный', 'primary'], ['Синий', 'secondary'], ['Оранжевый', 'brand'], ['Фиолетовый', 'premium']]) {
      const c = COMP(`Цвет=${cl}`); c.itemSpacing = 16; c.counterAxisAlignItems = 'CENTER'; pad(c, 'md', 'md'); rad(c, 'lg');
      body.appendChild(c);
      fill(c, `color/${role}/default`); depth(c, `color/${role}/shadow`, 0, 4);
      const tx = AL('VERTICAL', 'Тексты'); tx.itemSpacing = 4; append(c, tx, { grow: true });
      tx.appendChild(await T('Раздел 1', 'overline', 'color/text/on-color', { name: 'Раздел', opacity: 0.85 }));
      const topic = await T(LANGS[0].unit, 'h2', 'color/text/on-color', { name: 'Тема' }); tx.appendChild(topic);
      const bt = AL('HORIZONTAL', 'Кнопка-справочник'); center(bt); fixBox(bt, 48, 48);
      bt.cornerRadius = 12; bt.strokes = [solid('#FFFFFF', 0.45)]; bt.strokeWeight = 2; bt.strokeAlign = 'INSIDE';
      c.appendChild(bt);
      bt.appendChild(svgNode(GLYPH.notebook, 'Глиф'));
      fixW(c, 343);
      tx.layoutSizingHorizontal = 'FILL'; wrap(topic);
      vs.push(c);
    }
    K.unit = combine(vs, body, 'Баннер раздела', 4, 'Баннер раздела. Свойства: Цвет, Раздел, Тема.');
    K.unitNum = textProp(K.unit, 'Раздел', 'Раздел 1', 'Раздел');
    K.unitTopic = textProp(K.unit, 'Тема', LANGS[0].unit, 'Тема');
  }

  // ---- Навигация
  {
    const body = await section(root, 'Нижняя навигация', 'Обучение · Словарь · Культура · Рейтинг · Профиль. «Культура» — традиции, сказки и музыка народа курса.');
    const vs = [];
    for (const st of ['Активна', 'Неактивна']) {
      const act = st === 'Активна';
      const c = COMP(`Состояние=${st}`, 'VERTICAL'); c.itemSpacing = 4; c.counterAxisAlignItems = 'CENTER'; pad(c, 'xs', 'xs'); rad(c, 'md');
      body.appendChild(c);
      const ic = inst(K.icon['Дом']); ic.name = 'Иконка'; ic.rescale(1.25); c.appendChild(ic);
      c.appendChild(await T('Обучение', 'caption', act ? 'color/secondary/default' : 'color/text/secondary', { name: 'Подпись' }));
      if (act) { fill(c, 'color/secondary/subtle'); depth(c, 'color/secondary/muted', 2, 2); }
      fixW(c, 68);
      vs.push(c);
    }
    K.tab = combine(vs, body, 'Вкладка', 2, 'Пункт нижней навигации. Свойства: Состояние, Подпись, Иконка.');
    K.tabText = textProp(K.tab, 'Подпись', 'Обучение', 'Подпись');
    K.tabIcon = swapProp(K.tab, 'Иконка', K.icon['Дом'], 'Иконка');

    const bar = COMP('Нижняя навигация'); bar.primaryAxisAlignItems = 'SPACE_BETWEEN'; bar.counterAxisAlignItems = 'CENTER';
    bar.paddingTop = 8; bar.paddingBottom = 24; bar.paddingLeft = 8; bar.paddingRight = 8;
    body.appendChild(bar);
    fill(bar, 'color/bg/default'); bar.strokes = [vpaint('color/border/default')]; bar.strokeAlign = 'INSIDE'; bar.strokeTopWeight = 2; bar.strokeBottomWeight = 0; bar.strokeLeftWeight = 0; bar.strokeRightWeight = 0;
    [['Обучение', 'Дом'], ['Словарь', 'Книга'], ['Культура', 'Чум'], ['Рейтинг', 'Кубок'], ['Профиль', 'Профиль']].forEach(([label, icon], i) => {
      const it = inst(K.tab, { 'Состояние': i === 0 ? 'Активна' : 'Неактивна' });
      it.setProperties({ [K.tabText]: label, [K.tabIcon]: K.icon[icon].id });
      it.name = label;
      bar.appendChild(it);
    });
    bar.resize(375, bar.height); bar.counterAxisSizingMode = 'AUTO';
    bar.description = 'Нижняя навигация, 5 вкладок.';
    K.tabbar = bar;
  }

  return { root, K };
}

// ---------------------------------------------------------------------
// 6. Экраны
// ---------------------------------------------------------------------
function screen(parent, name) {
  const s = AL('VERTICAL', name);
  fixBox(s, 375, 812);
  s.clipsContent = true; fill(s, 'color/bg/default'); s.cornerRadius = 32;
  s.strokes = [solid('#000000', 0.08)]; s.strokeWeight = 1;
  parent.appendChild(s);
  STATS.screens++;
  return s;
}
function content(s, o = {}) {
  const c = AL('VERTICAL', 'Контент'); c.itemSpacing = o.gap || 16;
  c.paddingTop = o.top || 56; c.paddingBottom = o.bottom || 24; c.paddingLeft = 16; c.paddingRight = 16;
  append(s, c, { fillW: true });
  if (o.grow) c.layoutGrow = 1;
  if (o.center) c.counterAxisAlignItems = 'CENTER';
  return c;
}
function button(K, text, style = 'Основная') {
  const b = inst(K.button, { 'Стиль': style, 'Состояние': 'Обычное' });
  b.setProperties({ [K.buttonText]: text });
  return b;
}
function speech(K, phrase, emotion) {
  const sp = inst(K.speech);
  sp.setProperties({ [K.speechText]: phrase });
  const m = nested(sp, 'Маскот'); if (m) m.setProperties({ 'Эмоция': emotion });
  return sp;
}

async function lessonScreen(root, K, L, correct) {
  const s = screen(root, `Урок · ${L.ru} · ${correct ? 'верно' : 'ошибка'}`);
  const c = content(s, { grow: true, gap: 24 });
  const tb = inst(K.topbar); append(c, tb, { fillW: true });
  const pg = nested(tb, 'Прогресс'); if (pg) pg.setProperties({ 'Прогресс': correct ? '75%' : '50%' });
  const hs = nested(tb, 'Жизни'); if (hs) hs.setProperties({ [K.statText]: correct ? '5' : '4' });
  wrap(append(c, await T('Переведите предложение', 'h1', 'color/text/primary')));
  append(c, speech(K, L.phrase, correct ? 'Спокойствие' : 'Грусть'), { fillW: true });

  const placed = L.answer.slice();
  if (!correct) placed[1] = L.extra[0];
  const ans = AL('VERTICAL', 'Ответ'); append(c, ans, { fillW: true });
  for (const words of [placed.slice(0, 3), placed.slice(3)]) {
    const line = AL('HORIZONTAL', 'Строка'); line.itemSpacing = 8; line.counterAxisAlignItems = 'MAX'; line.paddingBottom = 8;
    append(ans, line, { fillW: true });
    line.minHeight = 64;
    line.strokes = [vpaint('color/border/default')]; line.strokeAlign = 'INSIDE'; line.strokeTopWeight = 0; line.strokeLeftWeight = 0; line.strokeRightWeight = 0; line.strokeBottomWeight = 2;
    for (const w of words) { const t = inst(K.tile); t.setProperties({ [K.tileText]: w }); line.appendChild(t); }
  }

  const bank = AL('HORIZONTAL', 'Банк слов'); bank.itemSpacing = 8; bank.primaryAxisAlignItems = 'CENTER';
  append(c, bank, { fillW: true });
  bank.layoutWrap = 'WRAP'; bank.counterAxisSpacing = 8;
  const pool = [...L.answer, ...L.extra];
  const order = pool.map((w, i) => [w, (w.length * 7 + i * 5) % 11]).sort((a, b) => a[1] - b[1]).map((x) => x[0]);
  const left = placed.slice();
  for (const w of order) {
    const used = left.indexOf(w);
    if (used >= 0) left.splice(used, 1);
    const t = inst(K.tile, { 'Состояние': used >= 0 ? 'Пустая' : 'Обычная' }); t.setProperties({ [K.tileText]: w }); bank.appendChild(t);
  }
  const fb = inst(K.feedback, { 'Тип': correct ? 'Верно' : 'Ошибка' });
  if (!correct) fb.setProperties({ [K.feedbackAnswer]: L.answer.join(' ') });
  append(s, fb, { fillW: true });
}

async function buildScreens(page, K) {
  await figma.setCurrentPageAsync(page);
  const root = rootFrame(`${KIT} · Экраны`, page);
  root.layoutMode = 'HORIZONTAL';

  // --- Онбординг · выбор курса
  {
    const s = screen(root, 'Онбординг · выбор языка');
    const c = content(s, { grow: true, gap: 12 });
    c.appendChild(inst(K.icon['Назад']));
    append(c, speech(K, 'Какой язык будем изучать?', 'Радость'), { fillW: true });
    LANGS.forEach((l, i) => {
      const card = inst(K.course, { 'Состояние': i === 0 ? 'Выбрана' : 'Обычная' });
      card.setProperties({ [K.courseLang]: l.ru, [K.courseNative]: l.native });
      const fl = nested(card, 'Флаг'); if (fl) fl.setProperties({ 'Язык': l.ru });
      append(c, card, { fillW: true });
    });
    const soon = inst(K.course, { 'Состояние': 'Скоро' });
    soon.setProperties({ [K.courseLang]: SOON.ru, [K.courseNative]: SOON.native });
    append(c, soon, { fillW: true });
    spacer(c);
    append(c, button(K, 'Продолжить'), { fillW: true });
  }

  // --- Уроки: по одному на курс, чередуем «верно» / «ошибка»
  for (let i = 0; i < LANGS.length; i++) await lessonScreen(root, K, LANGS[i], i % 2 === 0);

  // --- Главная · учебный путь
  {
    const L = LANGS[0];
    const s = screen(root, `Главная · учебный путь · ${L.ru}`);
    const c = content(s, { grow: true, gap: 20 });
    const head = AL('HORIZONTAL', 'Шапка'); head.primaryAxisAlignItems = 'SPACE_BETWEEN'; head.counterAxisAlignItems = 'CENTER';
    append(c, head, { fillW: true });
    head.appendChild(inst(K.flag, { 'Язык': L.ru }));
    for (const [t, v] of [['Ударный режим', '12'], ['Кристаллы', '500'], ['Жизни', '5']]) { const st = inst(K.stat, { 'Тип': t }); st.setProperties({ [K.statText]: v }); head.appendChild(st); }
    const unit = inst(K.unit, { 'Цвет': 'Зелёный' }); unit.setProperties({ [K.unitTopic]: L.unit }); append(c, unit, { fillW: true });
    const path = figma.createFrame(); path.name = 'Путь'; path.fills = []; path.clipsContent = false; path.resize(343, 470);
    append(c, path, { fillW: true });
    const offs = [0, -56, -80, -56, 0, 56];
    const states = ['Пройден', 'Пройден', 'Текущий', 'Заблокирован', 'Заблокирован', 'Заблокирован'];
    offs.forEach((o, i) => {
      const n = inst(K.node, { 'Состояние': states[i] });
      path.appendChild(n); n.x = (343 - 72) / 2 + o; n.y = 28 + i * 74;
      if (states[i] === 'Текущий') {
        const tag = inst(K.tag, { 'Цвет': 'Зелёный' }); tag.setProperties({ [K.tagText]: 'Начать' });
        path.appendChild(tag); tag.x = n.x + 36 - tag.width / 2; tag.y = n.y - 28;
      }
    });
    const m = inst(K.mascot, { 'Эмоция': 'Радость' }); path.appendChild(m); m.x = 212; m.y = 200;
    append(s, inst(K.tabbar), { fillW: true });
  }

  // --- Урок завершён
  {
    const s = screen(root, 'Итог урока');
    const c = content(s, { grow: true, gap: 16, center: true });
    spacer(c);
    const m = inst(K.mascot, { 'Эмоция': 'Радость' }); m.rescale(1.6); c.appendChild(m);
    wrap(append(c, await T('Урок пройден!', 'display', 'color/reward/shadow', { align: 'CENTER' })));
    wrap(append(c, await T(`Плюс 8 новых слов на языке ${LANGS[0].ru.toLowerCase()}`, 'body', 'color/text/secondary', { align: 'CENTER' })));
    const row = AL('HORIZONTAL', 'Итоги'); row.itemSpacing = 12; c.appendChild(row);
    for (const [t, v] of [['Опыт', '+15'], ['Точность', '92%'], ['Время', '2:41']]) { const r = inst(K.result, { 'Тип': t }); r.setProperties({ [K.resultText]: v }); row.appendChild(r); }
    spacer(c);
    append(c, button(K, 'Продолжить'), { fillW: true });
  }
  return root;
}

// ---------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------
// Ищем то, что создал этот плагин раньше (в т.ч. версии с другим префиксом)
async function findPrevious() {
  const NS = [KIT, ...LEGACY_KITS];
  const cols = (await figma.variables.getLocalVariableCollectionsAsync()).filter((c) => NS.some((p) => c.name.startsWith(p + ' · ')));
  const styles = (await figma.getLocalTextStylesAsync()).filter((s) => NS.some((p) => s.name.startsWith(p + '/')));
  const rootNames = new Set();
  for (const p of NS) for (const n of ['Основы', 'Компоненты', 'Экраны']) rootNames.add(`${p} · ${n}`);
  const frames = [];
  const pages = figma.root.children.filter((p, i) => i === 0 || Object.values(PAGES).includes(p.name));
  for (const p of pages) { await p.loadAsync(); for (const n of p.children) if (rootNames.has(n.name)) frames.push(n); }
  return { cols, styles, frames, empty: !cols.length && !styles.length && !frames.length };
}
function confirmRebuild(prev) {
  const html = `<style>body{font:14px/1.45 Inter,system-ui,sans-serif;margin:0;padding:20px;color:#3C3C3C}h3{margin:0 0 8px;font-size:16px}p{margin:0 0 16px;color:#777}
  .r{display:flex;gap:8px;justify-content:flex-end}button{font:inherit;font-weight:700;border-radius:12px;padding:10px 16px;cursor:pointer;border:2px solid #E5E5E5;border-bottom-width:4px;background:#fff;color:#1CB0F6}
  #ok{background:#58CC02;border-color:#58A700;color:#fff}</style>
  <h3>Пересоздать UI Kit?</h3>
  <p>В файле есть прошлая версия кита: ${prev.frames.length} фрейм(а), ${prev.cols.length} коллекции переменных, ${prev.styles.length} стилей текста. Они будут удалены и созданы заново. Ваши собственные фреймы и страницы не тронем.</p>
  <div class="r"><button id="no">Отмена</button><button id="ok">Пересоздать</button></div>
  <script>document.getElementById('ok').onclick=()=>parent.postMessage({pluginMessage:'ok'},'*');document.getElementById('no').onclick=()=>parent.postMessage({pluginMessage:'no'},'*');</script>`;
  return new Promise((resolve) => {
    figma.showUI(html, { width: 380, height: 230, title: 'UI Kit' });
    figma.ui.onmessage = (msg) => { figma.ui.close(); resolve(msg === 'ok'); };
  });
}
async function cleanup(prev) {
  for (const f of prev.frames) f.remove();
  for (const s of prev.styles) s.remove();
  for (const c of prev.cols) c.remove();
}

async function main() {
  const prev = await findPrevious();
  if (!prev.empty) {
    if (!(await confirmRebuild(prev))) return 'Отменено — ничего не изменено.';
    await cleanup(prev);
  }
  const { F, family } = await loadFonts();
  await buildVariables();
  await buildTextStyles(F);

  const pFound = await getPage(PAGES.found);
  await buildFoundations(pFound, family);
  const pComps = await getPage(PAGES.comps);
  const { K } = await buildComponents(pComps);
  const pScreens = await getPage(PAGES.screens);
  const screens = await buildScreens(pScreens, K);
  figma.viewport.scrollAndZoomIntoView([screens]);
  return `✅ UI Kit v3 готов: ${STATS.components} компонентов (${STATS.sets} наборов), ${STATS.variables} переменных, ${STATS.textStyles} стилей, ${STATS.screens} экранов. Курсы: ${LANGS.map((l) => l.ru).join(', ')}.`;
}

main()
  .then((msg) => figma.closePlugin(msg))
  .catch((e) => figma.closePlugin('❌ Ошибка: ' + (e && e.message ? e.message : e)));
