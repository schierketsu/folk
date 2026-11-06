class Topic {
  const Topic({
    required this.title,
    required this.place,
    required this.prompt,
    required this.cardImage,
    required this.mapImage,
  });

  final String title;
  final String place;
  final String prompt;
  final String cardImage;
  final String mapImage;
}

const topics = <Topic>[
  Topic(
    title: 'Знакомство и приветствия',
    place: 'Маньпупунёр',
    prompt: 'Отправьтесь в путешествие на Север',
    cardImage: 'assets/images/place-manpupuner-card.png',
    mapImage: 'assets/images/place-manpupuner-map.png',
  ),
  Topic(
    title: 'Еда и традиции',
    place: 'Шаньга',
    prompt: 'Вместе приготовим традиционные пирожки',
    cardImage: 'assets/images/place-shanga-card.png',
    mapImage: 'assets/images/place-shanga-map.png',
  ),
];

class QuizTask {
  const QuizTask({
    required this.id,
    required this.topic,
    required this.title,
    required this.question,
    required this.options,
    required this.correct,
    required this.foxLine,
  });

  final String id;
  final int topic;
  final String title;
  final String question;
  final List<String> options;
  final int correct;
  final String foxLine;
}

const tasks = <QuizTask>[
  QuizTask(
    id: 'hello',
    topic: 0,
    title: 'Первое приветствие',
    question: 'Как сказать «Привет!» по-коми?',
    options: ['Чолӧм!', 'Шаньга', 'Маньпупунёр'],
    correct: 0,
    foxLine: 'Чолӧм!',
  ),
  QuizTask(
    id: 'north',
    topic: 0,
    title: 'Знакомство с краем',
    question: 'Как называется место со столбами выветривания?',
    options: ['Шаньга', 'Маньпупунёр', 'Клюква'],
    correct: 1,
    foxLine: 'Отправимся на Север!',
  ),
  QuizTask(
    id: 'fox',
    topic: 0,
    title: 'Помощник в путешествии',
    question: 'Кто сопровождает вас в уроках?',
    options: ['Лиса', 'Пестерь', 'Пирожок'],
    correct: 0,
    foxLine: 'Я рядом!',
  ),
  QuizTask(
    id: 'food',
    topic: 1,
    title: 'Традиционное блюдо',
    question: 'Что такое шаньга?',
    options: ['Открытый пирожок', 'Горный хребет', 'Река'],
    correct: 0,
    foxLine: 'Попробуем шаньгу!',
  ),
  QuizTask(
    id: 'cook',
    topic: 1,
    title: 'Готовим вместе',
    question: 'Что приготовим в задании этой темы?',
    options: ['Шаньгу', 'Суп', 'Кашу'],
    correct: 0,
    foxLine: 'Готовим вместе!',
  ),
  QuizTask(
    id: 'traditions',
    topic: 1,
    title: 'Еда и традиции',
    question: 'К какой теме относится шаньга?',
    options: ['Знакомство и приветствия', 'Еда и традиции', 'Рейтинг'],
    correct: 1,
    foxLine: 'Еда хранит традиции.',
  ),
];

List<QuizTask> tasksForTopic(int topic) =>
    tasks.where((task) => task.topic == topic).toList();
