// =====================================================================
//  ФОЛК · UI Kit generator for Figma · v8
//  Приложение для изучения языков народов России.
//  UX-паттерны — по мотивам Duolingo UI Kit (Marvilo); яркая палитра
//  в духе Duolingo; маскот — Лиса (живёт во всех регионах России).
//
//  Курсы задаются массивом LANGS ниже. Чтобы добавить язык — добавьте
//  в него объект (см. README) и перезапустите плагин на чистом файле.
// =====================================================================

const FONT_FAMILY = 'Nunito';   // можно заменить, напр. 'PT Root UI', 'Rubik'
const APP_NAME = 'ФОЛК';        // название продукта
const KIT = 'ФОЛК';             // префикс переменных, стилей и фреймов кита
const LEGACY_KITS = ['Тамыр', 'UI Kit'];  // префиксы прошлых версий — убираются при пересоздании
const PAGES = { found: 'Основы', comps: 'Компоненты', screens: 'Экраны' };
// Старые имена страниц: такие страницы будут переименованы и переиспользованы
const LEGACY_PAGES = { 'Основы': '🎨 Основы', 'Компоненты': '🧩 Компоненты', 'Экраны': '📱 Экраны' };

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
    // Учебный путь: темы по 7 шагов. Значки шагов: Звезда (урок), Книга (история), Наушники (аудирование),
    // Гантель (практика), Микрофон (говорение), Кубок (итог темы); 'Сундук' — награда на пути.
    // place — место (достопримечательность) рядом с путём; по нажатию открывается «Задание места».
    units: [
      { title: 'Знакомство и приветствия', color: 'Зелёный',
        steps: ['Звезда', 'Звезда', 'Наушники', 'Сундук', 'Гантель', 'Микрофон', 'Кубок'],
        place: { name: 'Маньпупунёр', sub: 'Столбы выветривания', art: 'manpupuner', task: 'Выучите 6 слов о горах и камнях' } },
      { title: 'Природа и горы', color: 'Фиолетовый',
        steps: ['Звезда', 'Книга', 'Звезда', 'Сундук', 'Наушники', 'Гантель', 'Кубок'],
        place: { name: 'Уральские горы', sub: 'Приполярный Урал', art: 'ural', task: 'Опишите погоду в горах: 5 фраз' } },
    ],
    flag: `<rect width="44" height="10.7" fill="#2E86D1"/><rect y="10.7" width="44" height="10.6" fill="#13A538"/><rect y="21.3" width="44" height="10.7" fill="#FFFFFF"/>`,
  },
];
const SOON = {
  ru: 'Новые языки',   // карточка «Скоро»: серый флаг, название и метка — больше ничего
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
  ['Нора', `<path d="M2.5 20.5C2.5 11 6.8 5.5 12 5.5S21.5 11 21.5 20.5Z" fill="#F08A3C"/><path d="M2.5 20.5C2.5 11 6.8 5.5 12 5.5C8.6 7.4 6.6 12.5 6.6 20.5Z" fill="#FFAA5E"/><path d="M7.6 20.5V16.2a4.4 4.4 0 0 1 8.8 0V20.5Z" fill="#6E3810"/><path d="M8.6 7.6C9.6 5.4 10.8 4 12 3.6c.4 1 .4 1.8 0 2.6M12 6.2c1.4-1.8 2.6-2.6 3.8-2.6-.1 1.2-.7 2.2-1.6 2.8" fill="#58CC02" stroke="#58CC02" stroke-width="1.4" stroke-linejoin="round"/><rect x="1.5" y="19.6" width="21" height="2.4" rx="1.2" fill="#D9701F"/>`],
  ['Сундук', `<rect x="3" y="5" width="18" height="15" rx="2" fill="#B2651A"/><rect x="3" y="5" width="4" height="15" rx="1.4" fill="#FFC800"/><rect x="17" y="5" width="4" height="15" rx="1.4" fill="#FFC800"/><rect x="3" y="9.4" width="18" height="3.4" fill="#FFC800"/><rect x="9.6" y="8.2" width="4.8" height="6" rx="1.4" fill="#FFE14A"/><circle cx="12" cy="10.6" r="1" fill="#8A4A0C"/><path d="M11.4 11h1.2l.3 2h-1.8z" fill="#8A4A0C"/>`],
  ['Рейтинг', `<path d="M4.4 9.2C3 6.6 4.9 4 7.4 4.6 8 2.6 10 2 12 2s4 .6 4.6 2.6c2.5-.6 4.4 2 3 4.6-.9 1.8-2.3 4.4-5.3 6H9.7c-3-1.6-4.4-4.2-5.3-6z" fill="#1CB0F6"/><path d="M4.4 9.2C3 6.6 4.9 4 7.4 4.6 8 2.6 10 2 12 2c-1.6.6-3 2-3.2 4.4-.2 2.6.4 5.8 1 8.8h-.1c-3-1.6-4.4-4.2-5.3-6z" fill="#5FCBFB"/><rect x="10.6" y="15" width="2.8" height="3.4" fill="#1899D6"/><rect x="7" y="18.4" width="10" height="3" rx="1.5" fill="#1899D6"/>`],
  ['Лента', `<path d="M3 6.5A3.5 3.5 0 0 1 6.5 3h11A3.5 3.5 0 0 1 21 6.5v8a3.5 3.5 0 0 1-3.5 3.5H9.4l-4.4 3.4V18A3.5 3.5 0 0 1 3 14.5z" fill="#F287C2"/><path d="M12 15.2s-4.6-2.6-4.6-5.6c0-1.6 1.2-2.6 2.5-2.6 1 0 1.7.5 2.1 1.2.4-.7 1.1-1.2 2.1-1.2 1.3 0 2.5 1 2.5 2.6 0 3-4.6 5.6-4.6 5.6z" fill="#FFE8F4"/>`],
  ['Книга', `<path d="M3 5.5C5.5 4.5 8.5 4.5 11 6v14c-2.5-1.5-5.5-1.5-8-.5z" fill="#1CB0F6"/><path d="M21 5.5c-2.5-1-5.5-1-8 .5v14c2.5-1.5 5.5-1.5 8-.5z" fill="#1899D6"/>`],
  ['Кубок', `<path d="M7 3h10v5a5 5 0 0 1-10 0z" fill="#FFC800"/><path d="M7 5H4v1.5A3.5 3.5 0 0 0 7.5 10M17 5h3v1.5A3.5 3.5 0 0 1 16.5 10" stroke="#FFC800" stroke-width="2" fill="none"/><rect x="10.5" y="12.5" width="3" height="4" fill="#E6A700"/><rect x="7" y="16.5" width="10" height="4" rx="1.5" fill="#E6A700"/>`],
  ['Профиль', `<circle cx="12" cy="8" r="4.6" fill="#1CB0F6"/><path d="M3.5 21a8.5 7.5 0 0 1 17 0z" fill="#1CB0F6"/><path d="M8.8 5.4A4.6 4.6 0 0 1 12 3.4c-1.3 1-2 2.6-2 4.6s.7 3.6 2 4.6a4.6 4.6 0 0 1-3.2-7.2zM3.5 21a8.5 7.5 0 0 1 8.5-7.5c-2.4 1.6-4 4.4-4 7.5z" fill="#5FCBFB"/>`],
  ['Лапка', `<ellipse cx="12" cy="15.5" rx="5" ry="4.5" fill="#FF9600"/><circle cx="5.8" cy="10" r="2.3" fill="#FF9600"/><circle cx="9.4" cy="6.2" r="2.3" fill="#FF9600"/><circle cx="14.6" cy="6.2" r="2.3" fill="#FF9600"/><circle cx="18.2" cy="10" r="2.3" fill="#FF9600"/>`],
  ['Изображение', `<rect x="2.5" y="4" width="19" height="16" rx="3" fill="#DDF4FF"/><circle cx="16.5" cy="9" r="2" fill="#FFC800"/><path d="M3.5 18.5l5-6 4 4.5 3-3 5 4.5z" fill="#58CC02"/>`],
  ['Орнамент', `<path d="M12 2l3 5-3 5-3-5z M12 12l3 5-3 5-3-5z M2 12l5-3 5 3-5 3z M12 12l5-3 5 3-5 3z" fill="#FF4B4B"/><circle cx="12" cy="12" r="1.6" fill="#FFC800"/>`],
];

const EMOTIONS = ['Спокойствие', 'Радость', 'Грусть', 'Удивление'];
// Лиса-маскот 120×120 — плоская геометрия в духе Duolingo по референсу:
// узкая мордочка, хитрый прищур, тёмные кончики ушей, хвост-пламя со светлым кончиком, тёмные лапы
const FOX_ART = {
  "Спокойствие": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\" viewBox=\"0 0 120 120\" fill=\"none\"><ellipse cx=\"72\" cy=\"114\" rx=\"40\" ry=\"5\" fill=\"#E5E5E5\"/><path d=\"M74 110C60 92 46 72 48 50C50 34 56 20 44 5C28 18 18 40 21 62C24 86 36 104 52 112Z\" fill=\"#F7752A\"/><path d=\"M74 110C60 92 46 72 48 50C48.6 45.2 49.6 40.6 50.3 36.1C40 44 36 70 60 106Z\" fill=\"#D9581B\"/><path d=\"M50.3 36.1C52 25.5 52.4 15.5 44 5C34.1 13.1 26.5 24.6 22.8 37.4C30 44 40 38 50.3 36.1Z\" fill=\"#FFF3DE\"/><path d=\"M50.3 36.1C52 25.5 52.4 15.5 44 5C44 14 44 30 50.3 36.1Z\" fill=\"#F0DAB6\"/><ellipse cx=\"66\" cy=\"102\" rx=\"12\" ry=\"10\" fill=\"#D9581B\"/><ellipse cx=\"96\" cy=\"102\" rx=\"12\" ry=\"10\" fill=\"#F7752A\"/><path d=\"M62 112L65 82Q67 68 81 68Q95 68 97 82L100 112Z\" fill=\"#F7752A\"/><path d=\"M81 68Q95 68 97 82L100 112H86Z\" fill=\"#D9581B\" opacity=\".35\"/><path d=\"M70 72Q81 66 92 72L87 98Q81 104 75 98Z\" fill=\"#FFF3DE\"/><path d=\"M81 70Q88 69 92 72L87 98Q84 101 81 101Z\" fill=\"#F0DAB6\"/><rect x=\"71\" y=\"90\" width=\"8\" height=\"22\" rx=\"4\" fill=\"#4A2A1A\"/><ellipse cx=\"75\" cy=\"112\" rx=\"6\" ry=\"3.5\" fill=\"#4A2A1A\"/><rect x=\"84\" y=\"90\" width=\"8\" height=\"22\" rx=\"4\" fill=\"#4A2A1A\"/><ellipse cx=\"88\" cy=\"112\" rx=\"6\" ry=\"3.5\" fill=\"#4A2A1A\"/><path d=\"M56 40L55 3L84 27Z\" fill=\"#F7752A\" stroke=\"#F7752A\" stroke-width=\"4\" stroke-linejoin=\"round\"/><path d=\"M59.8 36L59.2 14.5L76 28.5Z\" fill=\"#FFF3DE\" stroke=\"#FFF3DE\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M55 3L55.3 15.6L64.9 11.2Z\" fill=\"#4A2A1A\" stroke=\"#4A2A1A\" stroke-width=\"4\" stroke-linejoin=\"round\"/><path d=\"M104 40L105 3L76 27Z\" fill=\"#D9581B\" stroke=\"#D9581B\" stroke-width=\"4\" stroke-linejoin=\"round\"/><path d=\"M100.2 36L100.8 14.5L84 28.5Z\" fill=\"#FFF3DE\" stroke=\"#FFF3DE\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M105 3L104.7 15.6L95.1 11.2Z\" fill=\"#4A2A1A\" stroke=\"#4A2A1A\" stroke-width=\"4\" stroke-linejoin=\"round\"/><path d=\"M58 40C58 28 68 22 80 22C92 22 102 28 102 40L109 50C101 53 95 57 91 64L83.5 78.5Q80 83 76.5 78.5L69 64C65 57 59 53 51 50Z\" fill=\"#F7752A\" stroke=\"#F7752A\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M80 22C92 22 102 28 102 40L109 50C101 53 95 57 91 64L83.5 78.5Q81.8 80.8 80 81.2Z\" fill=\"#D9581B\" opacity=\".28\"/><path d=\"M51 50C59 53 65 57 69 64L76.5 78.5Q80 83 83.5 78.5L91 64C95 57 101 53 109 50C101 51 95 54 91 58L85 67Q80 72 75 67L69 58C65 54 59 51 51 50Z\" fill=\"#FFF3DE\" stroke=\"#FFF3DE\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/><path d=\"M76.8 77.6Q80 75.6 83.2 77.6Q81.6 82.6 80 82.6Q78.4 82.6 76.8 77.6Z\" fill=\"#2B1A12\"/><path d=\"M64 44.8Q70.5 40 77 47Q70.5 50.6 64 44.8Z\" fill=\"#FFF3DE\"/><path d=\"M66.9 45.6Q70.5 43.6 74.1 46.8\" stroke=\"#2B1A12\" stroke-width=\"2.4\" stroke-linecap=\"round\" fill=\"none\"/><path d=\"M96 44.8Q89.5 40 83 47Q89.5 50.6 96 44.8Z\" fill=\"#FFF3DE\"/><path d=\"M93.1 45.6Q89.5 43.6 85.9 46.8\" stroke=\"#2B1A12\" stroke-width=\"2.4\" stroke-linecap=\"round\" fill=\"none\"/></svg>",
  "Радость": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\" viewBox=\"0 0 120 120\" fill=\"none\"><ellipse cx=\"72\" cy=\"114\" rx=\"40\" ry=\"5\" fill=\"#E5E5E5\"/><path d=\"M74 110C60 92 46 72 48 50C50 34 56 20 44 5C28 18 18 40 21 62C24 86 36 104 52 112Z\" fill=\"#F7752A\"/><path d=\"M74 110C60 92 46 72 48 50C48.6 45.2 49.6 40.6 50.3 36.1C40 44 36 70 60 106Z\" fill=\"#D9581B\"/><path d=\"M50.3 36.1C52 25.5 52.4 15.5 44 5C34.1 13.1 26.5 24.6 22.8 37.4C30 44 40 38 50.3 36.1Z\" fill=\"#FFF3DE\"/><path d=\"M50.3 36.1C52 25.5 52.4 15.5 44 5C44 14 44 30 50.3 36.1Z\" fill=\"#F0DAB6\"/><ellipse cx=\"66\" cy=\"102\" rx=\"12\" ry=\"10\" fill=\"#D9581B\"/><ellipse cx=\"96\" cy=\"102\" rx=\"12\" ry=\"10\" fill=\"#F7752A\"/><path d=\"M62 112L65 82Q67 68 81 68Q95 68 97 82L100 112Z\" fill=\"#F7752A\"/><path d=\"M81 68Q95 68 97 82L100 112H86Z\" fill=\"#D9581B\" opacity=\".35\"/><path d=\"M70 72Q81 66 92 72L87 98Q81 104 75 98Z\" fill=\"#FFF3DE\"/><path d=\"M81 70Q88 69 92 72L87 98Q84 101 81 101Z\" fill=\"#F0DAB6\"/><rect x=\"71\" y=\"90\" width=\"8\" height=\"22\" rx=\"4\" fill=\"#4A2A1A\"/><ellipse cx=\"75\" cy=\"112\" rx=\"6\" ry=\"3.5\" fill=\"#4A2A1A\"/><rect x=\"84\" y=\"90\" width=\"8\" height=\"22\" rx=\"4\" fill=\"#4A2A1A\"/><ellipse cx=\"88\" cy=\"112\" rx=\"6\" ry=\"3.5\" fill=\"#4A2A1A\"/><path d=\"M56 40L55 3L84 27Z\" fill=\"#F7752A\" stroke=\"#F7752A\" stroke-width=\"4\" stroke-linejoin=\"round\"/><path d=\"M59.8 36L59.2 14.5L76 28.5Z\" fill=\"#FFF3DE\" stroke=\"#FFF3DE\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M55 3L55.3 15.6L64.9 11.2Z\" fill=\"#4A2A1A\" stroke=\"#4A2A1A\" stroke-width=\"4\" stroke-linejoin=\"round\"/><path d=\"M104 40L105 3L76 27Z\" fill=\"#D9581B\" stroke=\"#D9581B\" stroke-width=\"4\" stroke-linejoin=\"round\"/><path d=\"M100.2 36L100.8 14.5L84 28.5Z\" fill=\"#FFF3DE\" stroke=\"#FFF3DE\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M105 3L104.7 15.6L95.1 11.2Z\" fill=\"#4A2A1A\" stroke=\"#4A2A1A\" stroke-width=\"4\" stroke-linejoin=\"round\"/><path d=\"M58 40C58 28 68 22 80 22C92 22 102 28 102 40L109 50C101 53 95 57 91 64L83.5 78.5Q80 83 76.5 78.5L69 64C65 57 59 53 51 50Z\" fill=\"#F7752A\" stroke=\"#F7752A\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M80 22C92 22 102 28 102 40L109 50C101 53 95 57 91 64L83.5 78.5Q81.8 80.8 80 81.2Z\" fill=\"#D9581B\" opacity=\".28\"/><path d=\"M51 50C59 53 65 57 69 64L76.5 78.5Q80 83 83.5 78.5L91 64C95 57 101 53 109 50C101 51 95 54 91 58L85 67Q80 72 75 67L69 58C65 54 59 51 51 50Z\" fill=\"#FFF3DE\" stroke=\"#FFF3DE\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/><path d=\"M76.8 77.6Q80 75.6 83.2 77.6Q81.6 82.6 80 82.6Q78.4 82.6 76.8 77.6Z\" fill=\"#2B1A12\"/><path d=\"M64.5 48Q70.5 40.5 76.5 48M83.5 48Q89.5 40.5 95.5 48\" stroke=\"#2B1A12\" stroke-width=\"2.8\" stroke-linecap=\"round\" fill=\"none\"/><ellipse cx=\"63\" cy=\"55\" rx=\"4\" ry=\"2.6\" fill=\"#FF8A8A\" opacity=\".55\"/><ellipse cx=\"97\" cy=\"55\" rx=\"4\" ry=\"2.6\" fill=\"#FF8A8A\" opacity=\".55\"/></svg>",
  "Грусть": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\" viewBox=\"0 0 120 120\" fill=\"none\"><ellipse cx=\"72\" cy=\"114\" rx=\"40\" ry=\"5\" fill=\"#E5E5E5\"/><path d=\"M74 110C60 92 46 72 48 50C50 34 56 20 44 5C28 18 18 40 21 62C24 86 36 104 52 112Z\" fill=\"#F7752A\"/><path d=\"M74 110C60 92 46 72 48 50C48.6 45.2 49.6 40.6 50.3 36.1C40 44 36 70 60 106Z\" fill=\"#D9581B\"/><path d=\"M50.3 36.1C52 25.5 52.4 15.5 44 5C34.1 13.1 26.5 24.6 22.8 37.4C30 44 40 38 50.3 36.1Z\" fill=\"#FFF3DE\"/><path d=\"M50.3 36.1C52 25.5 52.4 15.5 44 5C44 14 44 30 50.3 36.1Z\" fill=\"#F0DAB6\"/><ellipse cx=\"66\" cy=\"102\" rx=\"12\" ry=\"10\" fill=\"#D9581B\"/><ellipse cx=\"96\" cy=\"102\" rx=\"12\" ry=\"10\" fill=\"#F7752A\"/><path d=\"M62 112L65 82Q67 68 81 68Q95 68 97 82L100 112Z\" fill=\"#F7752A\"/><path d=\"M81 68Q95 68 97 82L100 112H86Z\" fill=\"#D9581B\" opacity=\".35\"/><path d=\"M70 72Q81 66 92 72L87 98Q81 104 75 98Z\" fill=\"#FFF3DE\"/><path d=\"M81 70Q88 69 92 72L87 98Q84 101 81 101Z\" fill=\"#F0DAB6\"/><rect x=\"71\" y=\"90\" width=\"8\" height=\"22\" rx=\"4\" fill=\"#4A2A1A\"/><ellipse cx=\"75\" cy=\"112\" rx=\"6\" ry=\"3.5\" fill=\"#4A2A1A\"/><rect x=\"84\" y=\"90\" width=\"8\" height=\"22\" rx=\"4\" fill=\"#4A2A1A\"/><ellipse cx=\"88\" cy=\"112\" rx=\"6\" ry=\"3.5\" fill=\"#4A2A1A\"/><path d=\"M58 42L30 26L78 28Z\" fill=\"#F7752A\" stroke=\"#F7752A\" stroke-width=\"4\" stroke-linejoin=\"round\"/><path d=\"M56.9 40.8L40.6 31.5L68.5 32.7Z\" fill=\"#FFF3DE\" stroke=\"#FFF3DE\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M30 26L39.5 31.4L46.3 26.7Z\" fill=\"#4A2A1A\" stroke=\"#4A2A1A\" stroke-width=\"4\" stroke-linejoin=\"round\"/><path d=\"M102 42L130 26L82 28Z\" fill=\"#D9581B\" stroke=\"#D9581B\" stroke-width=\"4\" stroke-linejoin=\"round\"/><path d=\"M103.1 40.8L119.4 31.5L91.5 32.7Z\" fill=\"#FFF3DE\" stroke=\"#FFF3DE\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M130 26L120.5 31.4L113.7 26.7Z\" fill=\"#4A2A1A\" stroke=\"#4A2A1A\" stroke-width=\"4\" stroke-linejoin=\"round\"/><path d=\"M58 40C58 28 68 22 80 22C92 22 102 28 102 40L109 50C101 53 95 57 91 64L83.5 78.5Q80 83 76.5 78.5L69 64C65 57 59 53 51 50Z\" fill=\"#F7752A\" stroke=\"#F7752A\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M80 22C92 22 102 28 102 40L109 50C101 53 95 57 91 64L83.5 78.5Q81.8 80.8 80 81.2Z\" fill=\"#D9581B\" opacity=\".28\"/><path d=\"M51 50C59 53 65 57 69 64L76.5 78.5Q80 83 83.5 78.5L91 64C95 57 101 53 109 50C101 51 95 54 91 58L85 67Q80 72 75 67L69 58C65 54 59 51 51 50Z\" fill=\"#FFF3DE\" stroke=\"#FFF3DE\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/><path d=\"M76.8 77.6Q80 75.6 83.2 77.6Q81.6 82.6 80 82.6Q78.4 82.6 76.8 77.6Z\" fill=\"#2B1A12\"/><path d=\"M64 44.8Q70.5 40 77 47Q70.5 50.6 64 44.8Z\" fill=\"#FFF3DE\"/><path d=\"M66.9 47Q70.5 45 74.1 48.2\" stroke=\"#2B1A12\" stroke-width=\"2.4\" stroke-linecap=\"round\" fill=\"none\"/><path d=\"M96 44.8Q89.5 40 83 47Q89.5 50.6 96 44.8Z\" fill=\"#FFF3DE\"/><path d=\"M93.1 47Q89.5 45 85.9 48.2\" stroke=\"#2B1A12\" stroke-width=\"2.4\" stroke-linecap=\"round\" fill=\"none\"/><path d=\"M63 37.5L76 40.5M97 37.5L84 40.5\" stroke=\"#4A2A1A\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M64 52q-2.6 3.6 0 5.4q2.6-1.8 0-5.4z\" fill=\"#1CB0F6\"/></svg>",
  "Удивление": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\" viewBox=\"0 0 120 120\" fill=\"none\"><ellipse cx=\"72\" cy=\"114\" rx=\"40\" ry=\"5\" fill=\"#E5E5E5\"/><path d=\"M74 110C60 92 46 72 48 50C50 34 56 20 44 5C28 18 18 40 21 62C24 86 36 104 52 112Z\" fill=\"#F7752A\"/><path d=\"M74 110C60 92 46 72 48 50C48.6 45.2 49.6 40.6 50.3 36.1C40 44 36 70 60 106Z\" fill=\"#D9581B\"/><path d=\"M50.3 36.1C52 25.5 52.4 15.5 44 5C34.1 13.1 26.5 24.6 22.8 37.4C30 44 40 38 50.3 36.1Z\" fill=\"#FFF3DE\"/><path d=\"M50.3 36.1C52 25.5 52.4 15.5 44 5C44 14 44 30 50.3 36.1Z\" fill=\"#F0DAB6\"/><ellipse cx=\"66\" cy=\"102\" rx=\"12\" ry=\"10\" fill=\"#D9581B\"/><ellipse cx=\"96\" cy=\"102\" rx=\"12\" ry=\"10\" fill=\"#F7752A\"/><path d=\"M62 112L65 82Q67 68 81 68Q95 68 97 82L100 112Z\" fill=\"#F7752A\"/><path d=\"M81 68Q95 68 97 82L100 112H86Z\" fill=\"#D9581B\" opacity=\".35\"/><path d=\"M70 72Q81 66 92 72L87 98Q81 104 75 98Z\" fill=\"#FFF3DE\"/><path d=\"M81 70Q88 69 92 72L87 98Q84 101 81 101Z\" fill=\"#F0DAB6\"/><rect x=\"71\" y=\"90\" width=\"8\" height=\"22\" rx=\"4\" fill=\"#4A2A1A\"/><ellipse cx=\"75\" cy=\"112\" rx=\"6\" ry=\"3.5\" fill=\"#4A2A1A\"/><rect x=\"84\" y=\"90\" width=\"8\" height=\"22\" rx=\"4\" fill=\"#4A2A1A\"/><ellipse cx=\"88\" cy=\"112\" rx=\"6\" ry=\"3.5\" fill=\"#4A2A1A\"/><path d=\"M56 40L55 3L84 27Z\" fill=\"#F7752A\" stroke=\"#F7752A\" stroke-width=\"4\" stroke-linejoin=\"round\"/><path d=\"M59.8 36L59.2 14.5L76 28.5Z\" fill=\"#FFF3DE\" stroke=\"#FFF3DE\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M55 3L55.3 15.6L64.9 11.2Z\" fill=\"#4A2A1A\" stroke=\"#4A2A1A\" stroke-width=\"4\" stroke-linejoin=\"round\"/><path d=\"M104 40L105 3L76 27Z\" fill=\"#D9581B\" stroke=\"#D9581B\" stroke-width=\"4\" stroke-linejoin=\"round\"/><path d=\"M100.2 36L100.8 14.5L84 28.5Z\" fill=\"#FFF3DE\" stroke=\"#FFF3DE\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M105 3L104.7 15.6L95.1 11.2Z\" fill=\"#4A2A1A\" stroke=\"#4A2A1A\" stroke-width=\"4\" stroke-linejoin=\"round\"/><path d=\"M58 40C58 28 68 22 80 22C92 22 102 28 102 40L109 50C101 53 95 57 91 64L83.5 78.5Q80 83 76.5 78.5L69 64C65 57 59 53 51 50Z\" fill=\"#F7752A\" stroke=\"#F7752A\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M80 22C92 22 102 28 102 40L109 50C101 53 95 57 91 64L83.5 78.5Q81.8 80.8 80 81.2Z\" fill=\"#D9581B\" opacity=\".28\"/><path d=\"M51 50C59 53 65 57 69 64L76.5 78.5Q80 83 83.5 78.5L91 64C95 57 101 53 109 50C101 51 95 54 91 58L85 67Q80 72 75 67L69 58C65 54 59 51 51 50Z\" fill=\"#FFF3DE\" stroke=\"#FFF3DE\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/><path d=\"M76.8 77.6Q80 75.6 83.2 77.6Q81.6 82.6 80 82.6Q78.4 82.6 76.8 77.6Z\" fill=\"#2B1A12\"/><ellipse cx=\"70.5\" cy=\"46\" rx=\"5.6\" ry=\"6.2\" fill=\"#FFF3DE\"/><circle cx=\"70.5\" cy=\"46.6\" r=\"3\" fill=\"#2B1A12\"/><circle cx=\"71.7\" cy=\"45.2\" r=\"1\" fill=\"#FFFFFF\"/><ellipse cx=\"89.5\" cy=\"46\" rx=\"5.6\" ry=\"6.2\" fill=\"#FFF3DE\"/><circle cx=\"89.5\" cy=\"46.6\" r=\"3\" fill=\"#2B1A12\"/><circle cx=\"90.7\" cy=\"45.2\" r=\"1\" fill=\"#FFFFFF\"/></svg>"
};
function foxSvg(emotion) { return FOX_ART[emotion] || FOX_ART['Спокойствие']; }

// Места 120×116 — пухлый предмет на серой тени-эллипсе, как сова и куст на карте Duolingo
const ART = {
  "manpupuner": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"116\" viewBox=\"0 0 120 116\" fill=\"none\"><ellipse cx=\"60\" cy=\"104\" rx=\"50\" ry=\"9\" fill=\"#E5E5E5\"/><path d=\"M81.3 102L80.1 90.6L78.1 77.3L79.6 67.8L85.6 62.1L94.3 61.1L100.5 67.8L100.8 79.2L96.3 90.6L95.6 102Z\" fill=\"#DCCBB6\" stroke=\"#DCCBB6\" stroke-width=\"4.75\" stroke-linejoin=\"round\"/><path d=\"M89 102L90.7 88.7L92.6 73.5L94.3 61.1L94.3 61.1L100.5 67.8L100.8 79.2L96.3 90.6L95.6 102Z\" fill=\"#BCA68C\" stroke=\"#BCA68C\" stroke-width=\"3.8\" stroke-linejoin=\"round\"/><path d=\"M85.6 62.1L94.3 61.1L97.8 65L89.2 65.9Z\" fill=\"#F2E9DD\" stroke=\"#F2E9DD\" stroke-width=\"2.8499999999999996\" stroke-linejoin=\"round\"/><path d=\"M82.3 90.6L87 77.3\" stroke=\"#FFFFFF\" stroke-opacity=\".8\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><path d=\"M91.8 81.1l4.8 1.9\" stroke=\"#A38C72\" stroke-width=\"2.1\" stroke-linecap=\"round\"/><path d=\"M21.5 104L19 88.8L21.3 75.5L19 64.1L23.4 56.5L31.9 54.6L38.8 61.2L41.2 73.6L38.9 86.9L41.5 104Z\" fill=\"#DCCBB6\" stroke=\"#DCCBB6\" stroke-width=\"4.75\" stroke-linejoin=\"round\"/><path d=\"M32.9 104L33.1 85L30.6 69.8L31.9 54.6L31.9 54.6L38.8 61.2L41.2 73.6L38.9 86.9L41.5 104Z\" fill=\"#BCA68C\" stroke=\"#BCA68C\" stroke-width=\"3.8\" stroke-linejoin=\"round\"/><path d=\"M23.4 56.5L31.9 54.6L35.8 58.4L27.4 60.3Z\" fill=\"#F2E9DD\" stroke=\"#F2E9DD\" stroke-width=\"2.8499999999999996\" stroke-linejoin=\"round\"/><path d=\"M25.3 92.6L30.1 79.3\" stroke=\"#FFFFFF\" stroke-opacity=\".8\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><path d=\"M34.8 83.1l4.8 1.9\" stroke=\"#A38C72\" stroke-width=\"2.1\" stroke-linecap=\"round\"/><path d=\"M47.8 107L45.2 89.5L49 73.2L44 55.8L42.8 38.2L49 24.5L60.2 19.5L71.5 27L75.2 42L70.2 59.5L74 77L70.2 94.5L71.5 107Z\" fill=\"#DCCBB6\" stroke=\"#DCCBB6\" stroke-width=\"6.25\" stroke-linejoin=\"round\"/><path d=\"M61.5 107L64 84.5L60.2 62L64 42L60.2 19.5L60.2 19.5L71.5 27L75.2 42L70.2 59.5L74 77L70.2 94.5L71.5 107Z\" fill=\"#BCA68C\" stroke=\"#BCA68C\" stroke-width=\"5.0\" stroke-linejoin=\"round\"/><path d=\"M49 24.5L60.2 19.5L66.5 24.5L56.5 29.5Z\" fill=\"#F2E9DD\" stroke=\"#F2E9DD\" stroke-width=\"3.75\" stroke-linejoin=\"round\"/><path d=\"M51.5 74.5L57.8 57\" stroke=\"#FFFFFF\" stroke-opacity=\".8\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><path d=\"M64 79.5l6.2 2.5\" stroke=\"#A38C72\" stroke-width=\"2.8\" stroke-linecap=\"round\"/></svg>",
  "ural": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"116\" viewBox=\"0 0 120 116\" fill=\"none\"><ellipse cx=\"60\" cy=\"104\" rx=\"52\" ry=\"9\" fill=\"#E5E5E5\"/><path d=\"M42 100L76 28L110 100Z\" fill=\"#CE82FF\" stroke=\"#CE82FF\" stroke-width=\"10\" stroke-linejoin=\"round\"/><path d=\"M42 100L76 28L70.6 100Z\" fill=\"#E3B2FF\" stroke=\"#E3B2FF\" stroke-width=\"10\" stroke-linejoin=\"round\"/><path d=\"M76 28L91.2 51L82.9 46.4L76.5 52.9L69.1 46.4L60.8 51Z\" fill=\"#FFFFFF\" stroke=\"#FFFFFF\" stroke-width=\"7.0\" stroke-linejoin=\"round\"/><path d=\"M7 102L44 38L81 102Z\" fill=\"#1CB0F6\" stroke=\"#1CB0F6\" stroke-width=\"10\" stroke-linejoin=\"round\"/><path d=\"M7 102L44 38L38.1 102Z\" fill=\"#6FD2FF\" stroke=\"#6FD2FF\" stroke-width=\"10\" stroke-linejoin=\"round\"/><path d=\"M44 38L57.5 58.5L50.1 54.4L44.4 60.1L37.9 54.4L30.5 58.5Z\" fill=\"#FFFFFF\" stroke=\"#FFFFFF\" stroke-width=\"7.0\" stroke-linejoin=\"round\"/><path d=\"M28 76L40 52\" stroke=\"#FFFFFF\" stroke-opacity=\".6\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><rect x=\"14.4\" y=\"98.8\" width=\"3.1\" height=\"5.7\" rx=\"1\" fill=\"#A0612A\"/><path d=\"M16 78L7.2 99.3L24.8 99.3Z\" fill=\"#58CC02\" stroke=\"#58CC02\" stroke-width=\"4.16\" stroke-linejoin=\"round\"/><path d=\"M16 78L7.2 99.3L15.5 99.3Z\" fill=\"#89E219\" stroke=\"#89E219\" stroke-width=\"4.16\" stroke-linejoin=\"round\"/><rect x=\"102.7\" y=\"99.6\" width=\"2.6\" height=\"4.8\" rx=\"1\" fill=\"#A0612A\"/><path d=\"M104 82L96.5 100L111.5 100Z\" fill=\"#58CC02\" stroke=\"#58CC02\" stroke-width=\"3.52\" stroke-linejoin=\"round\"/><path d=\"M104 82L96.5 100L103.6 100Z\" fill=\"#89E219\" stroke=\"#89E219\" stroke-width=\"3.52\" stroke-linejoin=\"round\"/></svg>"
};
// Широкие сцены 343×180 для листа «Задание места» — расширенные версии иконок
const ART_WIDE = {
  "manpupuner": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"343\" height=\"180\" viewBox=\"0 0 343 180\" fill=\"none\"><rect x=\"0\" y=\"0\" width=\"343\" height=\"180\" rx=\"0\" fill=\"#DDF4FF\"/><rect x=\"0\" y=\"0\" width=\"343\" height=\"180\" rx=\"0\" fill=\"#58A700\"/><circle cx=\"-10\" cy=\"70\" r=\"26\" fill=\"#62B70F\"/><circle cx=\"28\" cy=\"78\" r=\"26\" fill=\"#62B70F\"/><circle cx=\"66\" cy=\"70\" r=\"26\" fill=\"#62B70F\"/><circle cx=\"104\" cy=\"78\" r=\"26\" fill=\"#62B70F\"/><circle cx=\"142\" cy=\"70\" r=\"26\" fill=\"#62B70F\"/><circle cx=\"180\" cy=\"78\" r=\"26\" fill=\"#62B70F\"/><circle cx=\"218\" cy=\"70\" r=\"26\" fill=\"#62B70F\"/><circle cx=\"256\" cy=\"78\" r=\"26\" fill=\"#62B70F\"/><circle cx=\"294\" cy=\"70\" r=\"26\" fill=\"#62B70F\"/><circle cx=\"332\" cy=\"78\" r=\"26\" fill=\"#62B70F\"/><rect x=\"0\" y=\"0\" width=\"343\" height=\"66\" rx=\"0\" fill=\"#DDF4FF\"/><circle cx=\"-10\" cy=\"74\" r=\"24\" fill=\"#58A700\"/><circle cx=\"28\" cy=\"82\" r=\"24\" fill=\"#58A700\"/><circle cx=\"66\" cy=\"74\" r=\"24\" fill=\"#58A700\"/><circle cx=\"104\" cy=\"82\" r=\"24\" fill=\"#58A700\"/><circle cx=\"142\" cy=\"74\" r=\"24\" fill=\"#58A700\"/><circle cx=\"180\" cy=\"82\" r=\"24\" fill=\"#58A700\"/><circle cx=\"218\" cy=\"74\" r=\"24\" fill=\"#58A700\"/><circle cx=\"256\" cy=\"82\" r=\"24\" fill=\"#58A700\"/><circle cx=\"294\" cy=\"74\" r=\"24\" fill=\"#58A700\"/><circle cx=\"332\" cy=\"82\" r=\"24\" fill=\"#58A700\"/><rect x=\"0\" y=\"120\" width=\"343\" height=\"60\" rx=\"0\" fill=\"#89E219\"/><path d=\"M30 140L35 130L40 140Z\" fill=\"#58CC02\" stroke=\"#58CC02\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M92 140L97 130L102 140Z\" fill=\"#58CC02\" stroke=\"#58CC02\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M250 140L255 130L260 140Z\" fill=\"#58CC02\" stroke=\"#58CC02\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M312 140L317 130L322 140Z\" fill=\"#58CC02\" stroke=\"#58CC02\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(78 -4) scale(1.55)\"><ellipse cx=\"60\" cy=\"104\" rx=\"50\" ry=\"9\" fill=\"#6CC417\"/><path d=\"M81.3 102L80.1 90.6L78.1 77.3L79.6 67.8L85.6 62.1L94.3 61.1L100.5 67.8L100.8 79.2L96.3 90.6L95.6 102Z\" fill=\"#DCCBB6\" stroke=\"#DCCBB6\" stroke-width=\"4.75\" stroke-linejoin=\"round\"/><path d=\"M89 102L90.7 88.7L92.6 73.5L94.3 61.1L94.3 61.1L100.5 67.8L100.8 79.2L96.3 90.6L95.6 102Z\" fill=\"#BCA68C\" stroke=\"#BCA68C\" stroke-width=\"3.8\" stroke-linejoin=\"round\"/><path d=\"M85.6 62.1L94.3 61.1L97.8 65L89.2 65.9Z\" fill=\"#F2E9DD\" stroke=\"#F2E9DD\" stroke-width=\"2.8499999999999996\" stroke-linejoin=\"round\"/><path d=\"M82.3 90.6L87 77.3\" stroke=\"#FFFFFF\" stroke-opacity=\".8\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><path d=\"M91.8 81.1l4.8 1.9\" stroke=\"#A38C72\" stroke-width=\"2.1\" stroke-linecap=\"round\"/><path d=\"M21.5 104L19 88.8L21.3 75.5L19 64.1L23.4 56.5L31.9 54.6L38.8 61.2L41.2 73.6L38.9 86.9L41.5 104Z\" fill=\"#DCCBB6\" stroke=\"#DCCBB6\" stroke-width=\"4.75\" stroke-linejoin=\"round\"/><path d=\"M32.9 104L33.1 85L30.6 69.8L31.9 54.6L31.9 54.6L38.8 61.2L41.2 73.6L38.9 86.9L41.5 104Z\" fill=\"#BCA68C\" stroke=\"#BCA68C\" stroke-width=\"3.8\" stroke-linejoin=\"round\"/><path d=\"M23.4 56.5L31.9 54.6L35.8 58.4L27.4 60.3Z\" fill=\"#F2E9DD\" stroke=\"#F2E9DD\" stroke-width=\"2.8499999999999996\" stroke-linejoin=\"round\"/><path d=\"M25.3 92.6L30.1 79.3\" stroke=\"#FFFFFF\" stroke-opacity=\".8\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><path d=\"M34.8 83.1l4.8 1.9\" stroke=\"#A38C72\" stroke-width=\"2.1\" stroke-linecap=\"round\"/><path d=\"M47.8 107L45.2 89.5L49 73.2L44 55.8L42.8 38.2L49 24.5L60.2 19.5L71.5 27L75.2 42L70.2 59.5L74 77L70.2 94.5L71.5 107Z\" fill=\"#DCCBB6\" stroke=\"#DCCBB6\" stroke-width=\"6.25\" stroke-linejoin=\"round\"/><path d=\"M61.5 107L64 84.5L60.2 62L64 42L60.2 19.5L60.2 19.5L71.5 27L75.2 42L70.2 59.5L74 77L70.2 94.5L71.5 107Z\" fill=\"#BCA68C\" stroke=\"#BCA68C\" stroke-width=\"5.0\" stroke-linejoin=\"round\"/><path d=\"M49 24.5L60.2 19.5L66.5 24.5L56.5 29.5Z\" fill=\"#F2E9DD\" stroke=\"#F2E9DD\" stroke-width=\"3.75\" stroke-linejoin=\"round\"/><path d=\"M51.5 74.5L57.8 57\" stroke=\"#FFFFFF\" stroke-opacity=\".8\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><path d=\"M64 79.5l6.2 2.5\" stroke=\"#A38C72\" stroke-width=\"2.8\" stroke-linecap=\"round\"/></g></svg>",
  "ural": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"343\" height=\"180\" viewBox=\"0 0 343 180\" fill=\"none\"><rect x=\"0\" y=\"0\" width=\"343\" height=\"180\" rx=\"0\" fill=\"#F4E3FF\"/><rect x=\"0\" y=\"120\" width=\"343\" height=\"60\" rx=\"0\" fill=\"#89E219\"/><path d=\"M30 140L35 130L40 140Z\" fill=\"#58CC02\" stroke=\"#58CC02\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M92 140L97 130L102 140Z\" fill=\"#58CC02\" stroke=\"#58CC02\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M250 140L255 130L260 140Z\" fill=\"#58CC02\" stroke=\"#58CC02\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M312 140L317 130L322 140Z\" fill=\"#58CC02\" stroke=\"#58CC02\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(82 -2) scale(1.5)\"><ellipse cx=\"60\" cy=\"104\" rx=\"52\" ry=\"9\" fill=\"#6CC417\"/><path d=\"M42 100L76 28L110 100Z\" fill=\"#CE82FF\" stroke=\"#CE82FF\" stroke-width=\"10\" stroke-linejoin=\"round\"/><path d=\"M42 100L76 28L70.6 100Z\" fill=\"#E3B2FF\" stroke=\"#E3B2FF\" stroke-width=\"10\" stroke-linejoin=\"round\"/><path d=\"M76 28L91.2 51L82.9 46.4L76.5 52.9L69.1 46.4L60.8 51Z\" fill=\"#FFFFFF\" stroke=\"#FFFFFF\" stroke-width=\"7.0\" stroke-linejoin=\"round\"/><path d=\"M7 102L44 38L81 102Z\" fill=\"#1CB0F6\" stroke=\"#1CB0F6\" stroke-width=\"10\" stroke-linejoin=\"round\"/><path d=\"M7 102L44 38L38.1 102Z\" fill=\"#6FD2FF\" stroke=\"#6FD2FF\" stroke-width=\"10\" stroke-linejoin=\"round\"/><path d=\"M44 38L57.5 58.5L50.1 54.4L44.4 60.1L37.9 54.4L30.5 58.5Z\" fill=\"#FFFFFF\" stroke=\"#FFFFFF\" stroke-width=\"7.0\" stroke-linejoin=\"round\"/><path d=\"M28 76L40 52\" stroke=\"#FFFFFF\" stroke-opacity=\".6\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><rect x=\"14.4\" y=\"98.8\" width=\"3.1\" height=\"5.7\" rx=\"1\" fill=\"#A0612A\"/><path d=\"M16 78L7.2 99.3L24.8 99.3Z\" fill=\"#58CC02\" stroke=\"#58CC02\" stroke-width=\"4.16\" stroke-linejoin=\"round\"/><path d=\"M16 78L7.2 99.3L15.5 99.3Z\" fill=\"#89E219\" stroke=\"#89E219\" stroke-width=\"4.16\" stroke-linejoin=\"round\"/><rect x=\"102.7\" y=\"99.6\" width=\"2.6\" height=\"4.8\" rx=\"1\" fill=\"#A0612A\"/><path d=\"M104 82L96.5 100L111.5 100Z\" fill=\"#58CC02\" stroke=\"#58CC02\" stroke-width=\"3.52\" stroke-linejoin=\"round\"/><path d=\"M104 82L96.5 100L103.6 100Z\" fill=\"#89E219\" stroke=\"#89E219\" stroke-width=\"3.52\" stroke-linejoin=\"round\"/></g></svg>"
};

// Белые значки шагов пути 32×32 и золотой сундук 104×104 (тень — серая плита, как у Duolingo)
const NODE_GLYPHS = {
  "Звезда": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\"><path d=\"M16 3.5l3.9 8 8.8 1.2-6.4 6.1 1.6 8.7L16 23.2l-7.9 4.3 1.6-8.7-6.4-6.1 8.8-1.2z\" fill=\"#FFFFFF\"/></svg>",
  "Книга": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\"><path d=\"M4 7.5C8 6 12 6 15 8v18c-3-2-7-2-11-.5z\" fill=\"#FFFFFF\"/><path d=\"M28 7.5C24 6 20 6 17 8v18c3-2 7-2 11-.5z\" fill=\"#FFFFFF\"/></svg>",
  "Наушники": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\"><path d=\"M6 19v-3a10 10 0 0 1 20 0v3\" stroke=\"#FFFFFF\" stroke-width=\"3.4\" stroke-linecap=\"round\" fill=\"none\"/><rect x=\"4\" y=\"17\" width=\"7\" height=\"11\" rx=\"3\" fill=\"#FFFFFF\"/><rect x=\"21\" y=\"17\" width=\"7\" height=\"11\" rx=\"3\" fill=\"#FFFFFF\"/></svg>",
  "Гантель": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\"><g transform=\"rotate(-35 16 16)\"><rect x=\"9\" y=\"14\" width=\"14\" height=\"4\" rx=\"2\" fill=\"#FFFFFF\"/><rect x=\"3\" y=\"9\" width=\"5\" height=\"14\" rx=\"2.5\" fill=\"#FFFFFF\"/><rect x=\"24\" y=\"9\" width=\"5\" height=\"14\" rx=\"2.5\" fill=\"#FFFFFF\"/><rect x=\"7\" y=\"11\" width=\"3\" height=\"10\" rx=\"1.5\" fill=\"#FFFFFF\"/><rect x=\"22\" y=\"11\" width=\"3\" height=\"10\" rx=\"1.5\" fill=\"#FFFFFF\"/></g></svg>",
  "Микрофон": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\"><rect x=\"11.5\" y=\"3\" width=\"9\" height=\"16\" rx=\"4.5\" fill=\"#FFFFFF\"/><path d=\"M7 15a9 9 0 0 0 18 0M16 24v5M11 29h10\" stroke=\"#FFFFFF\" stroke-width=\"3\" stroke-linecap=\"round\" fill=\"none\"/></svg>",
  "Кубок": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\"><path d=\"M9 4h14v8a7 7 0 0 1-14 0z\" fill=\"#FFFFFF\"/><path d=\"M9 7H5v2a5 5 0 0 0 5 5M23 7h4v2a5 5 0 0 1-5 5\" stroke=\"#FFFFFF\" stroke-width=\"2.6\" fill=\"none\"/><rect x=\"14\" y=\"18\" width=\"4\" height=\"6\" fill=\"#FFFFFF\"/><rect x=\"9\" y=\"24\" width=\"14\" height=\"5\" rx=\"2\" fill=\"#FFFFFF\"/></svg>"
};
const CHEST = {
  "Закрыт": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"104\" height=\"104\" viewBox=\"0 0 104 104\" fill=\"none\"><rect x=\"4\" y=\"58\" width=\"84\" height=\"44\" rx=\"10\" fill=\"#E5E5E5\"/><path d=\"M28 8L80 8L80 26L28 26Z\" fill=\"#F0A800\" stroke=\"#F0A800\" stroke-width=\"2\" stroke-linejoin=\"round\"/><rect x=\"14\" y=\"4\" width=\"16\" height=\"94\" rx=\"3\" fill=\"#FFC800\"/><rect x=\"14\" y=\"4\" width=\"16\" height=\"14\" rx=\"3\" fill=\"#FFF27A\"/><rect x=\"25\" y=\"18\" width=\"5\" height=\"80\" rx=\"0\" fill=\"#F0A800\"/><rect x=\"78\" y=\"4\" width=\"16\" height=\"94\" rx=\"3\" fill=\"#FFC800\"/><rect x=\"78\" y=\"4\" width=\"16\" height=\"14\" rx=\"3\" fill=\"#FFF27A\"/><rect x=\"89\" y=\"18\" width=\"5\" height=\"80\" rx=\"0\" fill=\"#F0A800\"/><rect x=\"30\" y=\"40\" width=\"48\" height=\"44\" rx=\"0\" fill=\"#955A10\"/><rect x=\"30\" y=\"40\" width=\"48\" height=\"14\" rx=\"0\" fill=\"#7E4A0A\"/><rect x=\"30\" y=\"72\" width=\"48\" height=\"12\" rx=\"0\" fill=\"#AC6D1A\"/><rect x=\"14\" y=\"82\" width=\"80\" height=\"8\" rx=\"2\" fill=\"#F0A800\"/><rect x=\"14\" y=\"90\" width=\"80\" height=\"8\" rx=\"2\" fill=\"#FFC800\"/><rect x=\"8\" y=\"26\" width=\"92\" height=\"18\" rx=\"4\" fill=\"#FFE14A\"/><rect x=\"8\" y=\"38\" width=\"92\" height=\"6\" rx=\"3\" fill=\"#FFC800\"/><path d=\"M56 26L68 26L58 44L46 44Z\" fill=\"#FFF27A\" fill-opacity=\"0.9\"/><rect x=\"45\" y=\"25\" width=\"18\" height=\"22\" rx=\"5\" fill=\"#FFE600\"/><rect x=\"45\" y=\"40\" width=\"18\" height=\"7\" rx=\"4\" fill=\"#FFC800\"/><circle cx=\"54\" cy=\"33\" r=\"3.4\" fill=\"#9A5A06\"/><path d=\"M52.2 34L55.8 34L56.6 41L51.4 41Z\" fill=\"#9A5A06\" stroke=\"#9A5A06\" stroke-width=\"1\" stroke-linejoin=\"round\"/></svg>",
  "Открыт": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"104\" height=\"104\" viewBox=\"0 0 104 104\" fill=\"none\"><rect x=\"4\" y=\"58\" width=\"84\" height=\"44\" rx=\"10\" fill=\"#E5E5E5\"/><path d=\"M24 2L84 2L80 24L28 24Z\" fill=\"#D99200\" stroke=\"#D99200\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M30 6L78 6L75 20L33 20Z\" fill=\"#B87800\" stroke=\"#B87800\" stroke-width=\"2\" stroke-linejoin=\"round\"/><rect x=\"28\" y=\"24\" width=\"52\" height=\"18\" rx=\"2\" fill=\"#5A3205\"/><circle cx=\"40\" cy=\"32\" r=\"6\" fill=\"#FFC800\"/><circle cx=\"38.4\" cy=\"30.4\" r=\"2.4\" fill=\"#FFF27A\"/><circle cx=\"52\" cy=\"29\" r=\"6\" fill=\"#FFC800\"/><circle cx=\"50.4\" cy=\"27.4\" r=\"2.4\" fill=\"#FFF27A\"/><circle cx=\"64\" cy=\"32\" r=\"6\" fill=\"#FFC800\"/><circle cx=\"62.4\" cy=\"30.4\" r=\"2.4\" fill=\"#FFF27A\"/><rect x=\"14\" y=\"4\" width=\"16\" height=\"94\" rx=\"3\" fill=\"#FFC800\"/><rect x=\"14\" y=\"4\" width=\"16\" height=\"14\" rx=\"3\" fill=\"#FFF27A\"/><rect x=\"25\" y=\"18\" width=\"5\" height=\"80\" rx=\"0\" fill=\"#F0A800\"/><rect x=\"78\" y=\"4\" width=\"16\" height=\"94\" rx=\"3\" fill=\"#FFC800\"/><rect x=\"78\" y=\"4\" width=\"16\" height=\"14\" rx=\"3\" fill=\"#FFF27A\"/><rect x=\"89\" y=\"18\" width=\"5\" height=\"80\" rx=\"0\" fill=\"#F0A800\"/><rect x=\"30\" y=\"40\" width=\"48\" height=\"44\" rx=\"0\" fill=\"#955A10\"/><rect x=\"30\" y=\"40\" width=\"48\" height=\"14\" rx=\"0\" fill=\"#7E4A0A\"/><rect x=\"30\" y=\"72\" width=\"48\" height=\"12\" rx=\"0\" fill=\"#AC6D1A\"/><rect x=\"14\" y=\"82\" width=\"80\" height=\"8\" rx=\"2\" fill=\"#F0A800\"/><rect x=\"14\" y=\"90\" width=\"80\" height=\"8\" rx=\"2\" fill=\"#FFC800\"/><rect x=\"8\" y=\"38\" width=\"92\" height=\"8\" rx=\"3\" fill=\"#FFE14A\"/></svg>"
};

// Блик-полоса на верхней грани узла пути
const NODE_GLARE = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" fill=\"none\"><path d=\"M19.6 61.4L19.1 60.6L18.5 59.6L18 58.6L17.5 57.6L17.1 56.6L16.7 55.6L16.4 54.5L16 53.5L15.8 52.4L15.7 52.3L52.9 15.1L53.7 15.2L54.9 15.3L56.1 15.5L57.3 15.7L58.5 15.9L59.6 16.2L60.8 16.5L62 16.9L63.1 17.3L63.6 17.4Z\" fill=\"#FFFFFF\" fill-opacity=\".22\"/></svg>";

const GLYPH = {
  star: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" fill="#FFFFFF"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="#FFFFFF" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
  lock: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="5" y="10" width="14" height="11" rx="3" fill="#AFAFAF"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10" stroke="#AFAFAF" stroke-width="2.4" fill="none"/></svg>`,
  notebook: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="5" y="3" width="14" height="18" rx="2.5" stroke="#FFFFFF" stroke-width="2.2" fill="none"/><path d="M9 8h6M9 12h6" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" fill="none"/></svg>`,
  checkSmall: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="#58A700" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
  starSmall: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" fill="#FFFFFF"/></svg>`,
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
  let p = figma.root.children.find((x) => x.name === name) || figma.root.children.find((x) => x.name === LEGACY_PAGES[name]);
  if (p) { p.name = name; return p; }
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
  ct.appendChild(await T('UI Kit · v8', 'overline', 'color/text/on-color', { opacity: 0.85 }));
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
    ['Лиса-проводник', 'Лиса живёт по всей России — от Коми до Кавказа. Эмоции подкрепляют ответы: Радость — верно, Грусть — ошибка, Удивление — новое слово.'],
    ['Язык — герой', 'Слова на изучаемом языке — стилем «Слово урока», русский — обычным текстом.'],
    ['Графика', 'Как у Duolingo: пухлые плоские фигуры, три тона (светлый верх, основной фронт, тёмный бок), белые косые блики, серая тень под предметом. Никаких мелких деталей и текстур.'],
    ['Культура рядом', 'Места, флаги и сюжеты — из культуры народа курса. Без стереотипов и карикатур.'],
    ['Путь', 'Тема — 6–7 шагов: уроки, аудирование, практика, сундук с наградой и итог. Рядом — настоящее место края без подписей: по нажатию открывается задание о нём.'],
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
    const body = await section(root, 'Маскот · Лиса', 'Лиса по референсу в духе Duolingo: узкая мордочка, хитрый прищур, тёмные кончики ушей, хвост-пламя, тёмные лапы. Четыре эмоции, свойство «Эмоция». Замена варианта здесь обновит все экраны.');
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
    const body = await section(root, 'Плитка слова', 'Банк слов в упражнениях «собери предложение». «Пустая» — место, откуда слово уже забрали. Выбранные слова ложатся в «Поле ответа» — лоток с пунктирной рамкой (см. экраны уроков), без линий под словами.');
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
      if (!soon) tx.appendChild(await T(LANGS[0].native, 'caption', sel ? 'color/secondary/default' : soon ? 'color/text/disabled' : 'color/text/secondary', { name: 'Самоназвание' }));
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

  // ---- Значки шагов
  {
    const body = await section(root, 'Значки шагов', 'Белые значки 32×32 внутри узлов пути: урок, история, аудирование, практика, говорение, итог темы.');
    K.glyph = {};
    for (const [name, svg] of Object.entries(NODE_GLYPHS)) {
      const cell = AL('VERTICAL', name); cell.itemSpacing = 8; cell.counterAxisAlignItems = 'CENTER'; pad(cell, 'sm', 'sm'); fill(cell, 'color/primary/default'); rad(cell, 'md');
      body.appendChild(cell);
      const c = figma.createComponentFromNode(svgNode(svg, name));
      c.name = `Значок шага/${name}`; c.fills = []; STATS.components++;
      cell.appendChild(c);
      cell.appendChild(await T(name, 'caption', 'color/text/on-color'));
      K.glyph[name] = c;
    }
  }

  // ---- Узел пути
  {
    const body = await section(root, 'Узел пути', 'Объёмная «таблетка» шага. Цвет — цвет темы, Состояние: Открыт (пройден или доступен), Текущий (с кольцом прогресса), Закрыт (серый). Значок меняется через Instance swap.');
    const COLORS = [['Зелёный', 'primary'], ['Синий', 'secondary'], ['Оранжевый', 'brand'], ['Фиолетовый', 'premium']];
    const vs = [];
    const STATES = ['Открыт', ...Array.from({ length: LESSONS_PER_STEP }, (_, k) => `Текущий ${k}/${LESSONS_PER_STEP}`), 'Закрыт'];
    for (const [cl, role] of COLORS) for (const st of STATES) {
      const locked = st === 'Закрыт';
      const c = figma.createComponent(); c.name = `Цвет=${cl}, Состояние=${st}`; c.resize(100, 100); c.fills = []; c.clipsContent = false;
      STATS.components++;
      body.appendChild(c);
      if (st.startsWith('Текущий')) {
        // кольцо из сегментов: по одному на задание шага; пройденные — цветом темы, остальные — серые
        const done = +st.split(' ')[1].split('/')[0];
        const N = LESSONS_PER_STEP, gap = 0.26, sector = 2 * Math.PI / N;
        for (let k = 0; k < N; k++) {
          const seg = figma.createEllipse(); seg.name = `Сегмент ${k + 1}`; seg.resize(100, 100);
          seg.fills = [vpaint(k < done ? `color/${role}/default` : 'color/bg/muted')];
          const a0 = -Math.PI / 2 + k * sector + gap / 2;
          seg.arcData = { startingAngle: a0, endingAngle: a0 + sector - gap, innerRadius: 0.84 };
          c.appendChild(seg);
        }
      }
      const bot = figma.createEllipse(); bot.name = 'Грань'; bot.resize(70, 62); bot.x = 15; bot.y = 23; bot.fills = [vpaint(locked ? 'color/border/strong' : `color/${role}/shadow`)]; c.appendChild(bot);
      const top = figma.createEllipse(); top.name = 'Верх'; top.resize(70, 62); top.x = 15; top.y = 15; top.fills = [vpaint(locked ? 'color/bg/muted' : `color/${role}/default`)]; c.appendChild(top);
      c.appendChild(svgNode(NODE_GLARE, 'Блик'));
      const g = inst(K.glyph['Звезда']); g.name = 'Значок'; c.appendChild(g); g.x = 34; g.y = 30;
      if (locked) for (const n of g.findAll((x) => 'fills' in x)) { if (n.fills.length) n.fills = [solid('#B5B5B5')]; if ('strokes' in n && n.strokes.length) n.strokes = [solid('#B5B5B5')]; }
      vs.push(c);
    }
    K.node = combine(vs, body, 'Узел пути', 2 + LESSONS_PER_STEP, 'Шаг учебного пути. Свойства: Цвет (цвет темы), Состояние, Значок. У текущего шага кольцо из сегментов — по одному на задание (Текущий 0/3, 1/3, 2/3).');
    K.nodeGlyph = swapProp(K.node, 'Значок', K.glyph['Звезда'], 'Значок');
  }

  // ---- Сундук
  {
    const body = await section(root, 'Сундук', 'Награда посреди темы: закрыт, пока до него не дошли, и открыт после.');
    const vs = [];
    for (const [st, svg] of Object.entries(CHEST)) {
      const c = figma.createComponentFromNode(svgNode(svg, st)); c.name = `Состояние=${st}`; c.fills = [];
      STATS.components++;
      body.appendChild(c); vs.push(c);
    }
    K.chest = combine(vs, body, 'Сундук', 2, 'Сундук на учебном пути. Свойство «Состояние».');
  }

  // ---- Разделитель темы
  {
    const body = await section(root, 'Разделитель темы', 'Название следующей темы между линиями — как граница между темами на пути.');
    const c = COMP('Разделитель темы'); c.itemSpacing = 12; c.counterAxisAlignItems = 'CENTER';
    body.appendChild(c);
    const l1 = figma.createRectangle(); l1.name = 'Линия'; l1.resize(40, 2); l1.fills = [vpaint('color/bg/muted')]; c.appendChild(l1);
    const t = await T(LANGS[0].units[1] ? LANGS[0].units[1].title : 'Тема 2', 'h3', 'color/text/disabled', { name: 'Тема' }); c.appendChild(t);
    const l2 = figma.createRectangle(); l2.name = 'Линия'; l2.resize(40, 2); l2.fills = [vpaint('color/bg/muted')]; c.appendChild(l2);
    fixW(c, 343);
    l1.layoutGrow = 1; l2.layoutGrow = 1;
    c.description = 'Граница между темами. Свойство «Тема».';
    K.divider = c;
    K.dividerText = textProp(c, 'Тема', t.characters, 'Тема');
  }

  // ---- Баннер темы
  {
    const body = await section(root, 'Баннер темы', 'Закреплённый заголовок над путём: раздел и тема слева, справочник справа за вертикальным разделителем.');
    const vs = [];
    for (const [cl, role] of [['Зелёный', 'primary'], ['Синий', 'secondary'], ['Оранжевый', 'brand'], ['Фиолетовый', 'premium']]) {
      const c = COMP(`Цвет=${cl}`); c.counterAxisAlignItems = 'CENTER'; rad(c, 'lg');
      body.appendChild(c);
      fill(c, `color/${role}/default`); depth(c, `color/${role}/shadow`, 0, 4);
      const tx = AL('VERTICAL', 'Тексты'); tx.itemSpacing = 4; pad(tx, 'md', 'md'); c.appendChild(tx);
      tx.appendChild(await T('Раздел 1, тема 1', 'overline', 'color/text/on-color', { name: 'Раздел', opacity: 0.85 }));
      const topic = await T(LANGS[0].units[0].title, 'h2', 'color/text/on-color', { name: 'Тема' }); tx.appendChild(topic);
      const sep = figma.createRectangle(); sep.name = 'Разделитель'; sep.resize(2, 40); sep.fills = [vpaint(`color/${role}/shadow`)]; c.appendChild(sep);
      const bt = AL('HORIZONTAL', 'Справочник'); center(bt); c.appendChild(bt);
      bt.appendChild(svgNode(GLYPH.notebook, 'Глиф'));
      fixW(c, 343);
      tx.layoutGrow = 1; wrap(topic);
      sep.layoutSizingVertical = 'FILL';
      bt.resize(64, 40); bt.primaryAxisSizingMode = 'FIXED'; bt.layoutSizingVertical = 'FILL';
      vs.push(c);
    }
    K.unit = combine(vs, body, 'Баннер темы', 2, 'Баннер темы. Свойства: Цвет, Раздел, Тема.');
    K.unitNum = textProp(K.unit, 'Раздел', 'Раздел 1, тема 1', 'Раздел');
    K.unitTopic = textProp(K.unit, 'Тема', LANGS[0].units[0].title, 'Тема');
  }

  // ---- Достопримечательности + задание места
  const allLm = []; for (const l of LANGS) for (const u of (l.units || [])) if (u.place && !allLm.some((x) => x.art === u.place.art)) allLm.push(Object.assign({ lang: l.ru }, u.place));
  if (allLm.length) {
    const body = await section(root, 'Достопримечательности', 'Место края стоит рядом с путём темы — только картинка и три звезды прогресса, без подписей. По нажатию открывается «Задание места». Места — в LANGS[].units[].place, картинки — в ART и ART_WIDE.');
    K.art = {};
    const arts = AL('HORIZONTAL', 'Иллюстрации'); arts.itemSpacing = 24; body.appendChild(arts);
    for (const lm of allLm) {
      const c = figma.createComponentFromNode(svgNode(ART[lm.art], lm.name));
      c.name = `Место/${lm.name}`; c.fills = []; c.description = `${lm.name} · ${lm.sub}`;
      STATS.components++;
      arts.appendChild(c); K.art[lm.art] = c;
    }
    const lm0 = allLm[0];
    // Метка места на карте: картинка + три звезды прогресса, без подписей
    const vs = [];
    for (const n of [0, 1, 2, 3]) {
      const c = COMP(`Звёзды=${n}`, 'VERTICAL'); c.itemSpacing = 0; c.counterAxisAlignItems = 'CENTER';
      body.appendChild(c);
      const art = K.art[lm0.art].createInstance(); art.name = 'Иллюстрация'; c.appendChild(art);
      const row = figma.createFrame(); row.name = 'Звёзды'; row.resize(78, 30); row.fills = []; row.clipsContent = false; c.appendChild(row);
      for (let k = 0; k < 3; k++) {   // три звезды, средняя ниже — как под персонажами Duolingo
        const on = k < n;
        const st = svgNode(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" fill="${on ? '#FFC800' : '#E5E5E5'}" stroke="${on ? '#FFC800' : '#E5E5E5'}" stroke-width="2.6" stroke-linejoin="round"/></svg>`, 'Звезда');
        row.appendChild(st); st.x = k * 27; st.y = k === 1 ? 6 : 0;
      }
      vs.push(c);
    }
    K.landmark = combine(vs, body, 'Достопримечательность', 4, 'Место рядом с путём. Свойства: Звёзды (0–3), Иллюстрация. По нажатию — «Задание места».');
    K.lmArt = swapProp(K.landmark, 'Иллюстрация', K.art[lm0.art], 'Иллюстрация');

    // Широкие сцены для листа — расширенные версии иконок с карты
    K.artWide = {};
    const wides = AL('HORIZONTAL', 'Широкие иллюстрации'); wides.itemSpacing = 24; body.appendChild(wides);
    for (const lm of allLm) {
      const c = figma.createComponentFromNode(svgNode(ART_WIDE[lm.art], lm.name));
      c.name = `Место/${lm.name} · широкая`; c.fills = []; c.clipsContent = true; c.cornerRadius = 16;
      STATS.components++;
      wides.appendChild(c); K.artWide[lm.art] = c;
    }

    // Нижний лист «Задание места»: картинка во всю ширину → название → подзаголовок → задание → кнопка
    const sh = COMP('Задание места', 'VERTICAL'); sh.itemSpacing = 16; sh.paddingTop = 10; sh.paddingBottom = 32; sh.paddingLeft = 16; sh.paddingRight = 16;
    body.appendChild(sh);
    fill(sh, 'color/bg/default');
    for (const k of ['topLeftRadius', 'topRightRadius']) sh.setBoundVariable(k, V['radius/xl']);
    const hrow = AL('HORIZONTAL', 'Ручка'); hrow.primaryAxisAlignItems = 'CENTER'; sh.appendChild(hrow);
    const handle = figma.createRectangle(); handle.name = 'Ручка'; handle.resize(40, 5); handle.cornerRadius = 3; handle.fills = [vpaint('color/bg/muted')]; hrow.appendChild(handle);
    const pic = K.artWide[lm0.art].createInstance(); pic.name = 'Иллюстрация'; sh.appendChild(pic);
    const tx = AL('VERTICAL', 'Тексты'); tx.itemSpacing = 2; sh.appendChild(tx);
    const tName = await T(lm0.name, 'h1', 'color/text/primary', { name: 'Название' }); tx.appendChild(tName);
    const tSub = await T(lm0.sub, 'body', 'color/text/secondary', { name: 'Подзаголовок' }); tx.appendChild(tSub);
    const task = AL('HORIZONTAL', 'Задание'); task.itemSpacing = 12; task.counterAxisAlignItems = 'CENTER'; pad(task, 'sm', 'md'); fill(task, 'color/bg/subtle'); rad(task, 'lg');
    sh.appendChild(task);
    const ti = inst(K.icon['Мишень']); ti.name = 'Иконка'; task.appendChild(ti);
    const taskText = await T(lm0.task, 'bodyBold', 'color/text/primary', { name: 'Задание' }); task.appendChild(taskText);
    const b1 = inst(K.button, { 'Стиль': 'Брендовая', 'Состояние': 'Обычное' }); b1.setProperties({ [K.buttonText]: 'Начать задание' }); sh.appendChild(b1);
    fixW(sh, 375);
    for (const n of [hrow, tx, task, b1]) n.layoutSizingHorizontal = 'FILL';
    wrap(tName); wrap(tSub); wrap(taskText);
    sh.description = 'Нижний лист: открывается по нажатию на место. Свойства: Название, Подзаголовок, Задание, Иллюстрация (широкая сцена).';
    K.sheet = sh;
    K.shName = textProp(sh, 'Название', lm0.name, 'Название');
    K.shSub = textProp(sh, 'Подзаголовок', lm0.sub, 'Подзаголовок');
    K.shTask = textProp(sh, 'Задание', lm0.task, 'Задание');
    K.shArt = swapProp(sh, 'Иллюстрация', K.artWide[lm0.art], 'Иллюстрация');
  }

  // ---- Навигация: только значки, как у Duolingo
  {
    const body = await section(root, 'Нижняя навигация', 'Нора (учебный путь) · Задания · Рейтинг · Лента новостей · Профиль. Только значки, без подписей; активная вкладка — голубая плашка с рамкой.');
    const vs = [];
    for (const st of ['Активна', 'Неактивна']) {
      const act = st === 'Активна';
      const c = COMP(`Состояние=${st}`); center(c); rad(c, 'md');
      body.appendChild(c);
      const ic = inst(K.icon['Нора']); ic.name = 'Иконка'; ic.rescale(1.25); c.appendChild(ic);
      if (act) { fill(c, 'color/secondary/subtle'); depth(c, 'color/secondary/muted', 2, 2); }
      fixBox(c, 58, 54);
      vs.push(c);
    }
    K.tab = combine(vs, body, 'Вкладка', 2, 'Пункт нижней навигации: только значок. Свойства: Состояние, Иконка.');
    K.tabIcon = swapProp(K.tab, 'Иконка', K.icon['Нора'], 'Иконка');

    const bar = COMP('Нижняя навигация'); bar.primaryAxisAlignItems = 'SPACE_BETWEEN'; bar.counterAxisAlignItems = 'CENTER';
    bar.paddingTop = 10; bar.paddingBottom = 26; bar.paddingLeft = 14; bar.paddingRight = 14;
    body.appendChild(bar);
    fill(bar, 'color/bg/default'); bar.strokes = [vpaint('color/border/default')]; bar.strokeAlign = 'INSIDE'; bar.strokeTopWeight = 2; bar.strokeBottomWeight = 0; bar.strokeLeftWeight = 0; bar.strokeRightWeight = 0;
    [['Изучение', 'Нора'], ['Задания', 'Сундук'], ['Рейтинг', 'Рейтинг'], ['Лента новостей', 'Лента'], ['Профиль', 'Профиль']].forEach(([label, icon], i) => {
      const it = inst(K.tab, { 'Состояние': i === 0 ? 'Активна' : 'Неактивна' });
      it.setProperties({ [K.tabIcon]: K.icon[icon].id });
      it.name = label;
      bar.appendChild(it);
    });
    bar.resize(375, bar.height); bar.counterAxisSizingMode = 'AUTO';
    bar.description = 'Нижняя навигация: Нора · Задания · Рейтинг · Лента новостей · Профиль.';
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
  // Поле ответа — «лоток» с пунктирной рамкой: слова переносятся сами, линии не пересекают плитки
  const ans = AL('HORIZONTAL', 'Поле ответа'); ans.itemSpacing = 8; pad(ans, 'sm', 'sm'); rad(ans, 'lg');
  fill(ans, 'color/bg/subtle'); ans.strokes = [vpaint('color/border/default')]; ans.strokeWeight = 2; ans.strokeAlign = 'INSIDE'; ans.dashPattern = [8, 6];
  append(c, ans, { fillW: true });
  ans.layoutWrap = 'WRAP'; ans.counterAxisSpacing = 8; ans.minHeight = 132;
  for (const w of placed) { const t = inst(K.tile); t.setProperties({ [K.tileText]: w }); ans.appendChild(t); }

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

// Учебный путь: шаги темы «змейкой», сундук на пути, место — сбоку без подписей
const ZIG = [0, -44, -64, -44, 0, 44, 0];
const LESSONS_PER_STEP = 3;   // заданий в одном шаге = сегментов кольца у текущего шага
const STEP = 78;
function placeUnit(K, path, unit, y0, o) {
  // o: { from, to, mirror, done (сколько шагов пройдено), current (индекс текущего) | -1, lessons (заданий пройдено в текущем), place }
  const color = unit.color;
  let y = y0, firstCy = null, cys = [];
  for (let i = o.from; i <= o.to; i++) {
    if (i === o.current) y += 40;                                  // место под «Начать» и кольцо
    const kind = unit.steps[i];
    if (kind === 'Сундук') y += 14;                                 // сундуку нужно больше воздуха
    const dx = (o.mirror ? -1 : 1) * ZIG[i % ZIG.length];
    const cx = 171.5 + dx, cy = y + 44;
    cys[i] = [cx, cy]; if (firstCy === null) firstCy = cy;
    if (kind === 'Сундук') y += 14;
    if (kind === 'Сундук') {
      const ch = inst(K.chest, { 'Состояние': i < o.done ? 'Открыт' : 'Закрыт' }); ch.name = 'Сундук';
      ch.rescale(0.72); path.appendChild(ch); ch.x = cx - ch.width / 2 + 3; ch.y = cy - ch.height / 2 - 2;
    } else {
      const st = i < o.done ? 'Открыт' : i === o.current ? `Текущий ${Math.min(o.lessons || 0, LESSONS_PER_STEP - 1)}/${LESSONS_PER_STEP}` : 'Закрыт';
      const n = inst(K.node, { 'Цвет': color, 'Состояние': st });
      n.setProperties({ [K.nodeGlyph]: K.glyph[kind].id }); n.name = `Шаг ${i + 1} · ${kind}`;
      if (st === 'Закрыт') for (const v of n.findAll((x) => x.name === 'Значок')) for (const p of v.findAll((x) => 'fills' in x)) { if (p.fills.length) p.fills = [solid('#B5B5B5')]; if ('strokes' in p && p.strokes.length) p.strokes = [solid('#B5B5B5')]; }
      path.appendChild(n); n.x = cx - 50; n.y = cy - 48;
      if (st.startsWith('Текущий')) {
        const tag = inst(K.tag, { 'Цвет': color === 'Фиолетовый' ? 'Фиолетовый' : 'Зелёный' }); tag.setProperties({ [K.tagText]: 'Начать' });
        path.appendChild(tag); tag.x = cx - tag.width / 2; tag.y = cy - 48 - tag.height - 2;
      }
    }
    if (i === o.current) y += 10;                                  // кольцо снизу не должно касаться следующего шага
    y += STEP;
  }
  if (o.place && unit.place && K.landmark && cys[2]) {
    const right = !o.mirror;                                       // место — с противоположной от изгиба стороны
    const m = inst(K.landmark, { 'Звёзды': String(o.stars || 0) }); m.name = unit.place.name;
    m.setProperties({ [K.lmArt]: K.art[unit.place.art].id });
    path.appendChild(m); m.x = right ? 343 - 122 : 2; m.y = cys[2][1] - 66;
  }
  return y;
}
function homeTop(K, s, L, unitIdx) {
  const c = content(s, { grow: true, gap: 20 });
  const head = AL('HORIZONTAL', 'Шапка'); head.primaryAxisAlignItems = 'SPACE_BETWEEN'; head.counterAxisAlignItems = 'CENTER';
  append(c, head, { fillW: true });
  head.appendChild(inst(K.flag, { 'Язык': L.ru }));
  for (const [t, v] of [['Ударный режим', '12'], ['Кристаллы', '500'], ['Жизни', '5']]) { const st = inst(K.stat, { 'Тип': t }); st.setProperties({ [K.statText]: v }); head.appendChild(st); }
  const u = L.units[unitIdx];
  const unit = inst(K.unit, { 'Цвет': u.color }); unit.setProperties({ [K.unitNum]: `Раздел 1, тема ${unitIdx + 1}`, [K.unitTopic]: u.title }); append(c, unit, { fillW: true });
  const path = figma.createFrame(); path.name = 'Путь'; path.fills = []; path.clipsContent = false; path.resize(343, 640);
  append(c, path, { fillW: true });
  return path;
}
async function homeScreen(root, K, L, mode) {
  const names = { start: 'Главная · тема 1', next: 'Главная · переход к теме 2', sheet: 'Главная · задание места' };
  const s = screen(root, names[mode]);
  const u1 = L.units[0], u2 = L.units[1];
  const path = homeTop(K, s, L, 0);
  if (mode === 'next' && u2) {
    // тема 1 пройдена, видна её концовка; ниже — разделитель и начало темы 2
    let y = placeUnit(K, path, u1, -10, { from: 5, to: 6, done: 7, current: -1 });
    const d = inst(K.divider); d.setProperties({ [K.dividerText]: u2.title }); path.appendChild(d); d.x = 0; d.y = y + 4;
    placeUnit(K, path, u2, y + 54, { from: 0, to: 5, done: 0, current: 0, lessons: 0, mirror: true, place: true, stars: 0 });
  } else {
    placeUnit(K, path, u1, 0, { from: 0, to: 6, done: 2, current: 2, lessons: 1, place: true, stars: 1 });
  }
  append(s, inst(K.tabbar), { fillW: true });
  if (mode === 'sheet' && K.sheet && u1.place) {
    const p = u1.place;
    const ov = figma.createRectangle(); ov.name = 'Затемнение'; ov.resize(375, 812); ov.fills = [solid('#000000', 0.4)];
    s.appendChild(ov); ov.layoutPositioning = 'ABSOLUTE'; ov.x = 0; ov.y = 0;
    const sh = inst(K.sheet);
    sh.setProperties({ [K.shName]: p.name, [K.shSub]: p.sub, [K.shTask]: p.task, [K.shArt]: K.artWide[p.art].id });
    s.appendChild(sh); sh.layoutPositioning = 'ABSOLUTE'; sh.x = 0; sh.y = 812 - sh.height;
  }
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
    soon.setProperties({ [K.courseLang]: SOON.ru });
    append(c, soon, { fillW: true });
    spacer(c);
    append(c, button(K, 'Продолжить'), { fillW: true });
  }

  // --- Уроки: «верно» и «ошибка» для первого курса, «верно» — для остальных
  await lessonScreen(root, K, LANGS[0], true);
  await lessonScreen(root, K, LANGS[0], false);
  for (let i = 1; i < LANGS.length; i++) await lessonScreen(root, K, LANGS[i], true);

  // --- Главная: тема 1 → переход к теме 2 → задание места
  await homeScreen(root, K, LANGS[0], 'start');
  if (LANGS[0].units.length > 1) await homeScreen(root, K, LANGS[0], 'next');
  if (K.sheet) await homeScreen(root, K, LANGS[0], 'sheet');

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
  const kitPages = [...Object.values(PAGES), ...Object.values(LEGACY_PAGES)];
  const pages = figma.root.children.filter((p, i) => i === 0 || kitPages.includes(p.name));
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
  return `✅ ФОЛК · UI Kit v8 готов: ${STATS.components} компонентов (${STATS.sets} наборов), ${STATS.variables} переменных, ${STATS.textStyles} стилей, ${STATS.screens} экранов. Курсы: ${LANGS.map((l) => l.ru).join(', ')}.`;
}

main()
  .then((msg) => figma.closePlugin(msg))
  .catch((e) => figma.closePlugin('❌ Ошибка: ' + (e && e.message ? e.message : e)));
