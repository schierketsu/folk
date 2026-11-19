import 'package:flutter/material.dart';

import 'data.dart';
import 'figma_path.dart';
import 'lesson.dart';
import 'progress.dart';
import 'ui.dart';

void openTask(BuildContext context, ProgressStore progress, QuizTask task) {
  Navigator.of(context).push(
    MaterialPageRoute<void>(
      builder: (_) => QuizPage(progress: progress, task: task),
    ),
  );
}

void openTopic(BuildContext context, ProgressStore progress, int topic) {
  final options = tasksForTopic(topic);
  final next = options.where((task) => !progress.isDone(task.id));
  openTask(context, progress, next.isEmpty ? options.first : next.first);
}

void showLessonPreview(
  BuildContext context,
  ProgressStore progress,
  QuizTask task,
) {
  final accent = task.topic == 0 ? FolkColors.green : FolkColors.orange;
  final shadow = task.topic == 0 ? FolkColors.greenDark : FolkColors.orangeDark;
  showModalBottomSheet<void>(
    context: context,
    backgroundColor: Colors.transparent,
    builder: (sheetContext) => SafeArea(
      top: false,
      child: Container(
        padding: const EdgeInsets.fromLTRB(20, 20, 20, 24),
        decoration: BoxDecoration(
          color: accent,
          borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
          border: Border(bottom: BorderSide(color: shadow, width: 4)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              progress.isDone(task.id) ? 'Быстрое повторение' : task.title,
              style: Theme.of(
                context,
              ).textTheme.headlineMedium!.copyWith(color: Colors.white),
            ),
            const SizedBox(height: 6),
            Text(
              topics[task.topic].title,
              style: const TextStyle(
                color: Color(0xFFF3FFE9),
                fontWeight: FontWeight.w700,
              ),
            ),
            const SizedBox(height: 18),
            GestureDetector(
              onTap: () {
                Navigator.pop(sheetContext);
                openTask(context, progress, task);
              },
              child: Container(
                width: double.infinity,
                height: 53,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(14),
                  border: Border(
                    bottom: BorderSide(
                      color: task.topic == 0
                          ? const Color(0xFFD7FFB8)
                          : const Color(0xFFFFD6A1),
                      width: 4,
                    ),
                  ),
                ),
                child: Text(
                  progress.isDone(task.id)
                      ? 'ПОВТОРИТЬ'
                      : 'УЧИТЬСЯ · +15 ОПЫТА',
                  style: TextStyle(color: shadow, fontWeight: FontWeight.w900),
                ),
              ),
            ),
          ],
        ),
      ),
    ),
  );
}

void showPlace(BuildContext context, ProgressStore progress, int index) {
  final topic = topics[index];
  showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (sheetContext) => SafeArea(
      top: false,
      child: Container(
        padding: const EdgeInsets.fromLTRB(16, 10, 16, 24),
        decoration: BoxDecoration(
          color: FolkColors.isDark(context) ? FolkColors.darkBg : Colors.white,
          borderRadius: const BorderRadius.vertical(top: Radius.circular(25)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 38,
              height: 5,
              decoration: BoxDecoration(
                color: FolkColors.isDark(context)
                    ? FolkColors.darkLine
                    : FolkColors.line,
                borderRadius: BorderRadius.circular(5),
              ),
            ),
            const SizedBox(height: 16),
            ClipRRect(
              borderRadius: BorderRadius.circular(16),
              child: Image.asset(
                topic.cardImage,
                height: 190,
                width: double.infinity,
                fit: BoxFit.cover,
              ),
            ),
            const SizedBox(height: 14),
            Text(
              topic.place,
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 14),
            FolkCard(
              color: FolkColors.light,
              border: FolkColors.light,
              child: Row(
                children: [
                  const Icon(
                    Icons.track_changes_rounded,
                    color: FolkColors.green,
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      topic.prompt,
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 14),
            FolkButton(
              text: 'Начать задание',
              color: FolkColors.orange,
              shadow: FolkColors.orangeDark,
              onPressed: () {
                Navigator.pop(sheetContext);
                openTopic(context, progress, index);
              },
            ),
          ],
        ),
      ),
    ),
  );
}

class HomePage extends StatelessWidget {
  const HomePage({super.key, required this.progress});
  final ProgressStore progress;

  @override
  Widget build(BuildContext context) => Column(
    children: [
      Padding(
        padding: const EdgeInsets.fromLTRB(16, 24, 16, 13),
        child: SizedBox(
          height: 50,
          child: Row(
            children: [
              IconButton(
                key: const Key('home-profile'),
                tooltip: 'Профиль',
                onPressed: () => Navigator.of(context).push(
                  MaterialPageRoute<void>(
                    builder: (profileContext) => Scaffold(
                      body: SafeArea(
                        child: ProfilePage(
                          onClose: () => Navigator.of(profileContext).pop(),
                        ),
                      ),
                    ),
                  ),
                ),
                icon: const CircleAvatar(
                  radius: 22,
                  backgroundColor: Color(0xFFB0B0B0),
                ),
              ),
              const Spacer(),
              StatPill(
                asset: 'cranberry.png',
                value: '${progress.cranberries}',
                color: FolkColors.red,
                iconSize: 34,
                fontSize: 20,
              ),
              const SizedBox(width: 24),
              StatPill(
                asset: 'fire.png',
                value: '${progress.fire}',
                color: FolkColors.orange,
                iconSize: 34,
                fontSize: 20,
              ),
            ],
          ),
        ),
      ),
      Expanded(
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 0, 16, 24),
          children: [
            _TopicBanner(
              topic: 0,
              color: FolkColors.green,
              shadow: FolkColors.greenDark,
            ),
            const SizedBox(height: 13),
            FigmaPath(
              topic: 0,
              progress: progress,
              onTask: (task) => showLessonPreview(context, progress, task),
              onPlace: () => showPlace(context, progress, 0),
              onPester: () => Navigator.push(
                context,
                MaterialPageRoute<void>(
                  builder: (_) => ChestPage(progress: progress, topic: 0),
                ),
              ),
            ),
            const SizedBox(height: 20),
            Row(
              children: [
                Expanded(
                  child: Divider(
                    color: FolkColors.isDark(context)
                        ? FolkColors.darkLine
                        : FolkColors.line,
                    thickness: 2,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 12),
                  child: Text(
                    'Еда и традиции',
                    style: Theme.of(context).textTheme.titleMedium!.copyWith(
                      color: FolkColors.isDark(context)
                          ? FolkColors.darkMuted
                          : FolkColors.muted,
                    ),
                  ),
                ),
                Expanded(
                  child: Divider(
                    color: FolkColors.isDark(context)
                        ? FolkColors.darkLine
                        : FolkColors.line,
                    thickness: 2,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),
            _TopicBanner(
              topic: 1,
              color: FolkColors.orange,
              shadow: FolkColors.orangeDark,
            ),
            const SizedBox(height: 13),
            FigmaPath(
              topic: 1,
              progress: progress,
              onTask: (task) => showLessonPreview(context, progress, task),
              onPlace: () => showPlace(context, progress, 1),
              onPester: () => Navigator.push(
                context,
                MaterialPageRoute<void>(
                  builder: (_) => ChestPage(progress: progress, topic: 1),
                ),
              ),
            ),
          ],
        ),
      ),
    ],
  );
}

class _TopicBanner extends StatelessWidget {
  const _TopicBanner({
    required this.topic,
    required this.color,
    required this.shadow,
  });
  final int topic;
  final Color color;
  final Color shadow;
  @override
  Widget build(BuildContext context) => Container(
    constraints: const BoxConstraints(minHeight: 112),
    padding: const EdgeInsets.fromLTRB(18, 12, 18, 14),
    decoration: BoxDecoration(
      color: color,
      borderRadius: BorderRadius.circular(16),
      border: Border(bottom: BorderSide(color: shadow, width: 4)),
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          'МОДУЛЬ 1, ТЕМА ${topic + 1}',
          style: const TextStyle(
            color: Colors.white,
            fontSize: 16,
            height: 1.3,
            fontWeight: FontWeight.w800,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          topics[topic].title,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 23,
            height: 1.25,
            fontWeight: FontWeight.w800,
          ),
        ),
      ],
    ),
  );
}

class TasksPage extends StatelessWidget {
  const TasksPage({super.key, required this.progress});
  final ProgressStore progress;
  @override
  Widget build(BuildContext context) => ListView(
    padding: EdgeInsets.zero,
    children: [
      Container(
        height: 213,
        padding: const EdgeInsets.fromLTRB(22, 38, 22, 16),
        color: const Color(0xFFD94F9D),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Задания недели',
              style: Theme.of(
                context,
              ).textTheme.headlineLarge!.copyWith(color: Colors.white),
            ),
            const SizedBox(height: 9),
            const Text(
              '◷  5 ДНЕЙ',
              style: TextStyle(
                color: Color(0xFFFFE8F5),
                fontWeight: FontWeight.w700,
              ),
            ),
            const SizedBox(height: 9),
            Container(
              height: 83,
              padding: const EdgeInsets.fromLTRB(14, 12, 14, 12),
              decoration: BoxDecoration(
                color: FolkColors.darkBg,
                borderRadius: BorderRadius.circular(15),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Пройдите ${tasks.length} заданий курса!',
                    style: Theme.of(
                      context,
                    ).textTheme.titleLarge!.copyWith(color: Colors.white),
                  ),
                  const SizedBox(height: 8),
                  SizedBox(
                    height: 18,
                    child: Stack(
                      fit: StackFit.expand,
                      children: [
                        ClipRRect(
                          borderRadius: BorderRadius.circular(9),
                          child: LinearProgressIndicator(
                            value: progress.completed.length / tasks.length,
                            minHeight: 18,
                            backgroundColor: FolkColors.darkLine,
                            valueColor: const AlwaysStoppedAnimation(
                              Color(0xFFD94F9D),
                            ),
                          ),
                        ),
                        Center(
                          child: Text(
                            '${progress.completed.length} / ${tasks.length}',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 13,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
      Padding(
        padding: const EdgeInsets.fromLTRB(22, 19, 22, 24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [_TopicChallenge(progress: progress)],
        ),
      ),
    ],
  );
}

class _TopicChallenge extends StatefulWidget {
  const _TopicChallenge({required this.progress});
  final ProgressStore progress;

  @override
  State<_TopicChallenge> createState() => _TopicChallengeState();
}

class _TopicChallengeState extends State<_TopicChallenge> {
  bool friendConnected = false;

  @override
  Widget build(BuildContext context) {
    final progress = widget.progress;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Eyebrow('ПАРНОЕ ЗАДАНИЕ'),
        const SizedBox(height: 13),
        Container(
          width: double.infinity,
          height: 103,
          padding: const EdgeInsets.symmetric(horizontal: 22),
          decoration: BoxDecoration(
            color: FolkColors.isDark(context)
                ? const Color(0xFF49314B)
                : const Color(0xFF54314F),
            borderRadius: BorderRadius.circular(16),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset(topics[0].mapImage, height: 73, width: 88),
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 20),
                child: Icon(
                  Icons.auto_awesome_rounded,
                  color: FolkColors.yellow,
                ),
              ),
              Image.asset(topics[1].mapImage, height: 73, width: 88),
            ],
          ),
        ),
        const SizedBox(height: 17),
        Text(
          'Пройдите вместе ${tasks.length} заданий курса',
          style: Theme.of(context).textTheme.titleLarge,
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: LinearProgressIndicator(
                  value: progress.completed.length / tasks.length,
                  minHeight: 18,
                  backgroundColor: FolkColors.isDark(context)
                      ? FolkColors.darkLine
                      : FolkColors.line,
                  valueColor: const AlwaysStoppedAnimation(Color(0xFFB90D78)),
                ),
              ),
            ),
            const SizedBox(width: 10),
            PesterImage(size: 54.08, opened: progress.chestOpened(0)),
          ],
        ),
        const SizedBox(height: 6),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text(
              '●  Вы',
              style: TextStyle(
                color: Color(0xFFD94F9D),
                fontWeight: FontWeight.w800,
              ),
            ),
            Text(
              '${progress.completed.length} / ${tasks.length} заданий',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
        ),
        const SizedBox(height: 8),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              friendConnected ? '●  Демо-друг' : '●  Друг',
              style: const TextStyle(
                color: Color(0xFFB90D78),
                fontWeight: FontWeight.w800,
              ),
            ),
            AnimatedSwitcher(
              duration: const Duration(milliseconds: 250),
              child: Text(
                friendConnected ? 'Подключён' : 'Пока не подключён',
                key: ValueKey(friendConnected),
                style: Theme.of(context).textTheme.bodyMedium,
              ),
            ),
          ],
        ),
        const SizedBox(height: 14),
        SizedBox(
          height: 48,
          width: double.infinity,
          child: OutlinedButton(
            onPressed: friendConnected
                ? null
                : () {
                    setState(() => friendConnected = true);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Демо-друг присоединился к заданию'),
                        behavior: SnackBarBehavior.floating,
                      ),
                    );
                  },
            style: OutlinedButton.styleFrom(
              side: BorderSide(
                color: FolkColors.isDark(context)
                    ? FolkColors.darkLine
                    : FolkColors.line,
                width: 2,
              ),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(14),
              ),
            ),
            child: AnimatedSwitcher(
              duration: const Duration(milliseconds: 250),
              child: Text(
                friendConnected ? 'ДРУГ ПОДКЛЮЧЁН' : 'ПРИГЛАСИТЬ ДРУГА',
                key: ValueKey(friendConnected),
                style: const TextStyle(fontWeight: FontWeight.w900),
              ),
            ),
          ),
        ),
        const SizedBox(height: 12),
      ],
    );
  }
}

class RankingPage extends StatelessWidget {
  const RankingPage({super.key, required this.progress});
  final ProgressStore progress;
  @override
  Widget build(BuildContext context) {
    final leaders = <(String, int, bool)>[
      ('Аня', 105, false),
      ('Марк', 75, false),
      ('Лена', 45, false),
      ('Вы', progress.experience, true),
    ];
    leaders.sort((a, b) => b.$2.compareTo(a.$2));
    final yourRank = leaders.indexWhere((item) => item.$3) + 1;
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 24, 16, 24),
      children: [
        const PageTitle('Рейтинг', 'Каждое открытие приближает к вершине'),
        const SizedBox(height: 18),
        FolkCard(
          color: FolkColors.yellow,
          border: const Color(0xFFE6A700),
          padding: const EdgeInsets.fromLTRB(20, 18, 20, 18),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Eyebrow('ВАШЕ МЕСТО', color: FolkColors.ink),
              const SizedBox(height: 6),
              Row(
                children: [
                  Text(
                    '№ $yourRank',
                    style: const TextStyle(
                      fontSize: 32,
                      fontWeight: FontWeight.w900,
                      color: FolkColors.ink,
                    ),
                  ),
                  const SizedBox(width: 17),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '${progress.experience} опыта',
                        style: Theme.of(context).textTheme.headlineMedium,
                      ),
                      const Text(
                        'Лига исследователей',
                        style: TextStyle(
                          color: FolkColors.ink,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 6),
              const Text(
                'Продолжайте путь и собирайте клюкву',
                style: TextStyle(color: FolkColors.ink),
              ),
            ],
          ),
        ),
        const SizedBox(height: 22),
        const Eyebrow('ЛИДЕРЫ НЕДЕЛИ'),
        const SizedBox(height: 10),
        ...List.generate(leaders.length, (i) {
          final item = leaders[i];
          return Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: FolkCard(
              color: item.$3 ? FolkColors.greenLight : FolkColors.light,
              border: item.$3 ? FolkColors.green : FolkColors.line,
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 11),
              child: Row(
                children: [
                  CircleAvatar(
                    radius: 19,
                    backgroundColor: item.$3
                        ? FolkColors.green
                        : FolkColors.line,
                    child: Text(
                      '${i + 1}',
                      style: TextStyle(
                        color: item.$3 ? Colors.white : FolkColors.ink,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      item.$1,
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                  ),
                  Text(
                    '${item.$2} XP',
                    style: TextStyle(
                      color: item.$3 ? FolkColors.greenDark : FolkColors.muted,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                ],
              ),
            ),
          );
        }),
        const SizedBox(height: 12),
        Text(
          'Участники добавлены для примера. Ваш опыт сохраняется на устройстве.',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
      ],
    );
  }
}

class NewsPage extends StatelessWidget {
  const NewsPage({super.key, required this.progress});
  final ProgressStore progress;
  @override
  Widget build(BuildContext context) => ListView(
    padding: const EdgeInsets.fromLTRB(16, 30, 16, 24),
    children: [
      const PageTitle('Лента новостей', 'Истории из вашего путешествия'),
      const SizedBox(height: 18),
      FolkCard(
        color: FolkColors.blueLight,
        border: const Color(0xFF84D8FF),
        padding: const EdgeInsets.all(13),
        onTap: () => showPlace(context, progress, 0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(13),
              child: Image.asset(
                topics[0].cardImage,
                width: double.infinity,
                height: 180,
                fit: BoxFit.cover,
              ),
            ),
            const SizedBox(height: 12),
            const Eyebrow('НОВОЕ МЕСТО · КОМИ', color: FolkColors.blue),
            const SizedBox(height: 4),
            Text(
              'Маньпупунёр',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 4),
            Text(
              topics[0].prompt,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
        ),
      ),
      const SizedBox(height: 22),
      const Eyebrow('ЕЩЁ ИСТОРИИ'),
      const SizedBox(height: 10),
      FolkCard(
        color: FolkColors.orangeLight,
        border: const Color(0xFFFFC782),
        onTap: () => showPlace(context, progress, 1),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Eyebrow('ЕДА И ТРАДИЦИИ', color: FolkColors.orangeDark),
                  const SizedBox(height: 5),
                  Text('Шаньга', style: Theme.of(context).textTheme.titleLarge),
                  const SizedBox(height: 5),
                  Text(
                    topics[1].prompt,
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                ],
              ),
            ),
            Image.asset(
              topics[1].mapImage,
              width: 92,
              height: 92,
              fit: BoxFit.contain,
            ),
          ],
        ),
      ),
      const SizedBox(height: 12),
      FolkCard(
        color: FolkColors.yellowLight,
        border: const Color(0xFFFFE066),
        onTap: () => Navigator.push(
          context,
          MaterialPageRoute<void>(
            builder: (_) => ChestPage(
              progress: progress,
              topic: progress.chestReady(0) ? 0 : 1,
            ),
          ),
        ),
        child: Row(
          children: [
            Image.asset(
              'assets/images/chest-closed.png',
              width: 66,
              height: 66,
              fit: BoxFit.contain,
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Пестерь с наградой',
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Завершите задания темы и откройте его',
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    ],
  );
}

class NotificationsPage extends StatelessWidget {
  const NotificationsPage({super.key, required this.progress});
  final ProgressStore progress;
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Уведомления')),
    body: ListView(
      padding: const EdgeInsets.all(16),
      children: [
        const PageTitle('Что нового?', 'Важное по вашему обучению'),
        const SizedBox(height: 20),
        FolkCard(
          color: FolkColors.greenLight,
          border: FolkColors.green,
          child: Row(
            children: [
              const Icon(Icons.explore_rounded, color: FolkColors.greenDark),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Пора продолжить путешествие',
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '${tasks.length - progress.completed.length} заданий ждут вас',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        FolkCard(
          color: FolkColors.yellowLight,
          border: FolkColors.yellow,
          child: Row(
            children: [
              const Icon(
                Icons.card_giftcard_rounded,
                color: FolkColors.orangeDark,
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Награда за тему',
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      progress.chestReady(0) || progress.chestReady(1)
                          ? 'Пестерь можно открыть!'
                          : 'Пройдите три задания одной темы',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    ),
  );
}

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key, required this.onClose});
  final VoidCallback onClose;

  @override
  Widget build(BuildContext context) => Column(
    children: [
      SizedBox(
        width: double.infinity,
        height: 64,
        child: Stack(
          alignment: Alignment.center,
          children: [
            Text('Профиль', style: Theme.of(context).textTheme.headlineMedium),
            Positioned(
              right: 12,
              child: IconButton(
                tooltip: 'Закрыть профиль',
                onPressed: onClose,
                icon: const Icon(Icons.close_rounded),
              ),
            ),
          ],
        ),
      ),
      const Expanded(child: SizedBox()),
    ],
  );
}
