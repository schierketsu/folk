import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

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
          border: Border(
            bottom: BorderSide(color: shadow, width: 4),
          ),
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
                  style: TextStyle(
                    color: shadow,
                    fontWeight: FontWeight.w900,
                  ),
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
          height: 42,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const KomiFlag(),
              StatPill(
                asset: 'cranberry.png',
                value: '${progress.cranberries}',
                color: FolkColors.red,
              ),
              StatPill(
                asset: 'fire.png',
                value: '${progress.fire}',
                color: FolkColors.orange,
              ),
              StatPill(
                asset: 'heart.png',
                value: '${progress.hearts}',
                color: const Color(0xFFD94F9D),
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
    height: 112,
    padding: const EdgeInsets.fromLTRB(16, 16, 0, 16),
    decoration: BoxDecoration(
      color: color,
      borderRadius: BorderRadius.circular(16),
      border: Border(bottom: BorderSide(color: shadow, width: 4)),
    ),
    child: Row(
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Eyebrow('РАЗДЕЛ 1, ТЕМА ${topic + 1}', color: Colors.white),
              const SizedBox(height: 5),
              Text(
                topics[topic].title,
                style: Theme.of(
                  context,
                ).textTheme.titleLarge!.copyWith(color: Colors.white),
              ),
            ],
          ),
        ),
        Container(width: 2, height: 80, color: shadow),
        SizedBox(
          width: 64,
          child: Center(
            child: SvgPicture.asset(
              'assets/images/banner-notebook.svg',
              width: 24,
              height: 24,
            ),
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
                    'Пройдите 6 заданий курса!',
                    style: Theme.of(context).textTheme.titleLarge!.copyWith(
                      color: Colors.white,
                    ),
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
          children: [
            _TopicChallenge(progress: progress),
            const SizedBox(height: 26),
            const Eyebrow('ЗАДАНИЯ ДНЯ'),
            const SizedBox(height: 12),
            _GoalRow(
              title: 'Поздоровайтесь по-коми',
              current: progress.isDone('hello') ? 1 : 0,
              total: 1,
            ),
            const SizedBox(height: 10),
            _GoalRow(
              title: 'Пройдите 3 задания',
              current: progress.completed.length.clamp(0, 3),
              total: 3,
            ),
            const SizedBox(height: 10),
            _GoalRow(
              title: 'Откройте оба пестеря',
              current: progress.openedChests.length,
              total: 2,
            ),
            const SizedBox(height: 25),
            const Eyebrow('ТЕМЫ КУРСА'),
            const SizedBox(height: 11),
            ...List.generate(
              topics.length,
              (i) => Padding(
                padding: const EdgeInsets.only(bottom: 16),
                child: _TopicTaskPanel(topic: i, progress: progress),
              ),
            ),
          ],
        ),
      ),
    ],
  );
}

class _TopicChallenge extends StatelessWidget {
  const _TopicChallenge({required this.progress});
  final ProgressStore progress;

  @override
  Widget build(BuildContext context) {
    final completed = progress.doneInTopic(0);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Eyebrow('ЗАДАНИЕ ТЕМЫ'),
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
              Image.asset('assets/images/mascot-sitting.png', width: 100, height: 100),
              Image.asset(topics[0].mapImage, height: 84, width: 86),
            ],
          ),
        ),
        const SizedBox(height: 17),
        Text(
          'Пройдите 3 урока без ошибок',
          style: Theme.of(context).textTheme.titleLarge,
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: LinearProgressIndicator(
                  value: completed / 3,
                  minHeight: 18,
                  backgroundColor: FolkColors.isDark(context)
                      ? FolkColors.darkLine
                      : FolkColors.line,
                  valueColor: const AlwaysStoppedAnimation(Color(0xFFB90D78)),
                ),
              ),
            ),
            const SizedBox(width: 10),
            PesterImage(
              size: 54.08,
              opened: progress.chestOpened(0),
            ),
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
              '$completed / 3 урока',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
        ),
        const SizedBox(height: 20),
        const Divider(thickness: 2),
      ],
    );
  }
}

class _GoalRow extends StatelessWidget {
  const _GoalRow({
    required this.title,
    required this.current,
    required this.total,
  });
  final String title;
  final int current;
  final int total;
  static const accent = Color(0xFFD94F9D);
  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.symmetric(vertical: 15),
    child: Row(
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: Theme.of(context).textTheme.titleMedium),
              const SizedBox(height: 10),
              ClipRRect(
                borderRadius: BorderRadius.circular(7),
                child: LinearProgressIndicator(
                  value: current / total,
                  minHeight: 16,
                  backgroundColor: FolkColors.isDark(context)
                      ? FolkColors.darkLine
                      : FolkColors.line,
                  valueColor: const AlwaysStoppedAnimation(accent),
                ),
              ),
              const SizedBox(height: 5),
              Center(
                child: Text(
                  '$current / $total',
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              ),
            ],
          ),
        ),
        const SizedBox(width: 12),
        Image.asset(
          current == total
              ? 'assets/images/chest-open.png'
              : 'assets/images/chest-closed.png',
          width: 76,
          height: 76,
          fit: BoxFit.contain,
        ),
      ],
    ),
  );
}

class _TopicTaskPanel extends StatelessWidget {
  const _TopicTaskPanel({required this.topic, required this.progress});
  final int topic;
  final ProgressStore progress;
  @override
  Widget build(BuildContext context) {
    final data = topics[topic];
    final tint = topic == 0 ? FolkColors.greenLight : FolkColors.orangeLight;
    final accent = topic == 0 ? FolkColors.greenDark : FolkColors.orangeDark;
    return FolkCard(
      color: tint,
      border: accent.withValues(alpha: .35),
      padding: EdgeInsets.zero,
      child: Column(
        children: [
          InkWell(
            onTap: () => openTopic(context, progress, topic),
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 10, 12),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Eyebrow(
                          'ТЕМА 0${topic + 1} · ${progress.doneInTopic(topic)}/3 ЗАДАНИЯ',
                          color: accent,
                        ),
                        const SizedBox(height: 6),
                        Text(
                          data.title,
                          style: Theme.of(context).textTheme.titleLarge,
                        ),
                        const SizedBox(height: 5),
                        Text(
                          data.prompt,
                          style: Theme.of(context).textTheme.bodyMedium,
                        ),
                        const SizedBox(height: 7),
                        Eyebrow('НАЧАТЬ  →', color: accent),
                      ],
                    ),
                  ),
                  Image.asset(
                    data.mapImage,
                    width: 86,
                    height: 86,
                    fit: BoxFit.contain,
                  ),
                ],
              ),
            ),
          ),
          Container(height: 1, color: accent.withValues(alpha: .2)),
          ...tasksForTopic(topic).map(
            (task) => ListTile(
              dense: true,
              contentPadding: const EdgeInsets.symmetric(horizontal: 15),
              leading: Icon(
                progress.isDone(task.id)
                    ? Icons.check_circle_rounded
                    : Icons.play_circle_fill_rounded,
                color: accent,
              ),
              title: Text(
                task.title,
                style: Theme.of(context).textTheme.titleMedium,
              ),
              trailing: const Icon(
                Icons.chevron_right_rounded,
                color: FolkColors.muted,
              ),
              onTap: () => openTask(context, progress, task),
            ),
          ),
          if (progress.chestReady(topic))
            Padding(
              padding: const EdgeInsets.fromLTRB(12, 5, 12, 12),
              child: FolkButton(
                text: progress.chestOpened(topic)
                    ? 'Посмотреть награду'
                    : 'Открыть пестерь',
                color: FolkColors.orange,
                shadow: FolkColors.orangeDark,
                onPressed: () => Navigator.push(
                  context,
                  MaterialPageRoute<void>(
                    builder: (_) => ChestPage(progress: progress, topic: topic),
                  ),
                ),
              ),
            ),
        ],
      ),
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
  const ProfilePage({super.key, required this.progress});
  final ProgressStore progress;
  @override
  Widget build(BuildContext context) => ListView(
    padding: const EdgeInsets.fromLTRB(16, 30, 16, 24),
    children: [
      const PageTitle('Профиль', 'Ваш путь в приложении «ФОЛК»'),
      const SizedBox(height: 18),
      FolkCard(
        color: FolkColors.light,
        border: Colors.transparent,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Курс · Коми', style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 6),
            Text(
              'Две темы в MVP',
              style: Theme.of(context).textTheme.bodyLarge!.copyWith(
                color: FolkColors.isDark(context)
                    ? FolkColors.darkMuted
                    : FolkColors.muted,
              ),
            ),
          ],
        ),
      ),
      const SizedBox(height: 18),
      FolkCard(
        color: FolkColors.light,
        border: Colors.transparent,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Опыт · ${progress.experience}',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 6),
            Text(
              'Собирайте ягоды и открывайте новые места',
              style: Theme.of(context).textTheme.bodyLarge!.copyWith(
                color: FolkColors.isDark(context)
                    ? FolkColors.darkMuted
                    : FolkColors.muted,
              ),
            ),
          ],
        ),
      ),
      const SizedBox(height: 500),
      const Eyebrow('НАСТРОЙКИ'),
      const SizedBox(height: 12),
      FolkCard(
        color: FolkColors.light,
        padding: EdgeInsets.zero,
        child: SwitchListTile(
          secondary: const Icon(
            Icons.dark_mode_rounded,
            color: FolkColors.blue,
          ),
          title: Text(
            'Тёмная тема',
            style: Theme.of(context).textTheme.titleMedium,
          ),
          subtitle: const Text('Сохраняется на устройстве'),
          value: progress.darkMode,
          activeThumbColor: FolkColors.green,
          onChanged: progress.setDarkMode,
        ),
      ),
      const SizedBox(height: 24),
      TextButton.icon(
        onPressed: () async {
          final confirmed = await showDialog<bool>(
            context: context,
            builder: (dialogContext) => AlertDialog(
              title: const Text('Сбросить прогресс?'),
              content: const Text(
                'Задания, ягоды и пестери вернутся к началу.',
              ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(dialogContext, false),
                  child: const Text('Отмена'),
                ),
                TextButton(
                  onPressed: () => Navigator.pop(dialogContext, true),
                  child: const Text('Сбросить'),
                ),
              ],
            ),
          );
          if (confirmed == true) await progress.reset();
        },
        icon: const Icon(Icons.restart_alt_rounded),
        label: const Text('Начать заново'),
      ),
    ],
  );
}
