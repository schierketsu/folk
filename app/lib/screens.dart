import 'package:flutter/material.dart';

import 'data.dart';
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
  showModalBottomSheet<void>(
    context: context,
    backgroundColor: Colors.transparent,
    builder: (sheetContext) => SafeArea(
      top: false,
      child: Container(
        padding: const EdgeInsets.fromLTRB(20, 20, 20, 24),
        decoration: BoxDecoration(
          color: FolkColors.blue,
          borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
          border: const Border(
            bottom: BorderSide(color: Color(0xFF1899D6), width: 4),
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
                color: Color(0xFFE7F8FF),
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
                  border: const Border(
                    bottom: BorderSide(color: Color(0xFFBDEBFF), width: 4),
                  ),
                ),
                child: Text(
                  progress.isDone(task.id)
                      ? 'ПОВТОРИТЬ'
                      : 'УЧИТЬСЯ · +15 ОПЫТА',
                  style: const TextStyle(
                    color: Color(0xFF1899D6),
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
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 13),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                const Icon(
                  Icons.flag_rounded,
                  color: FolkColors.green,
                  size: 28,
                ),
                const SizedBox(width: 5),
                Text('КОМИ', style: Theme.of(context).textTheme.titleMedium),
              ],
            ),
            StatPill(
              asset: 'fire.png',
              value: '${progress.fire}',
              color: FolkColors.orange,
            ),
            StatPill(
              asset: 'cranberry.png',
              value: '${progress.cranberries}',
              color: FolkColors.red,
            ),
            StatPill(
              asset: 'heart.png',
              value: '${progress.hearts}',
              color: FolkColors.red,
            ),
            IconButton(
              tooltip: 'Уведомления',
              onPressed: () => Navigator.push(
                context,
                MaterialPageRoute<void>(
                  builder: (_) => NotificationsPage(progress: progress),
                ),
              ),
              icon: const Icon(
                Icons.notifications_none_rounded,
                color: FolkColors.blue,
              ),
            ),
          ],
        ),
      ),
      Expanded(
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 6, 16, 24),
          children: [
            const PageTitle(
              'Ваш путь',
              'Изучайте язык и открывайте культуру коми',
            ),
            const SizedBox(height: 20),
            _TopicBanner(
              topic: 0,
              color: FolkColors.green,
              shadow: FolkColors.greenDark,
            ),
            const SizedBox(height: 16),
            _PathNodes(topic: 0, progress: progress),
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
            const SizedBox(height: 16),
            _PathNodes(topic: 1, progress: progress),
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
    padding: const EdgeInsets.fromLTRB(17, 15, 17, 18),
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
        const Icon(Icons.menu_book_rounded, color: Colors.white, size: 30),
      ],
    ),
  );
}

class _PathNodes extends StatelessWidget {
  const _PathNodes({required this.topic, required this.progress});
  final int topic;
  final ProgressStore progress;
  @override
  Widget build(BuildContext context) {
    final themeTasks = tasksForTopic(topic);
    final color = topic == 0 ? FolkColors.green : FolkColors.orange;
    return Column(
      children: [
        ...List.generate(themeTasks.length, (i) {
          final task = themeTasks[i];
          final done = progress.isDone(task.id);
          return Padding(
            padding: const EdgeInsets.only(bottom: 9),
            child: Row(
              mainAxisAlignment: i.isEven
                  ? MainAxisAlignment.center
                  : MainAxisAlignment.end,
              children: [
                if (i.isOdd) const Spacer(),
                GestureDetector(
                  onTap: () => showLessonPreview(context, progress, task),
                  child: Column(
                    children: [
                      Container(
                        width: 66,
                        height: 66,
                        decoration: BoxDecoration(
                          color: done ? FolkColors.green : color,
                          shape: BoxShape.circle,
                          border: Border(
                            bottom: BorderSide(
                              color: done
                                  ? FolkColors.greenDark
                                  : topic == 0
                                  ? FolkColors.greenDark
                                  : FolkColors.orangeDark,
                              width: 5,
                            ),
                          ),
                        ),
                        child: Icon(
                          done
                              ? Icons.check_rounded
                              : [
                                  Icons.star_rounded,
                                  Icons.mic_rounded,
                                  Icons.emoji_events_rounded,
                                ][i],
                          color: Colors.white,
                          size: 33,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        task.title,
                        style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ],
                  ),
                ),
                if (i.isOdd) const SizedBox(width: 42),
              ],
            ),
          );
        }),
        Row(
          children: [
            Expanded(
              child: GestureDetector(
                onTap: () => showPlace(context, progress, topic),
                child: Image.asset(
                  topics[topic].mapImage,
                  height: 115,
                  fit: BoxFit.contain,
                ),
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: GestureDetector(
                onTap: () => Navigator.push(
                  context,
                  MaterialPageRoute<void>(
                    builder: (_) => ChestPage(progress: progress, topic: topic),
                  ),
                ),
                child: Column(
                  children: [
                    Image.asset(
                      progress.chestOpened(topic)
                          ? 'assets/images/chest-open.png'
                          : 'assets/images/chest-closed.png',
                      height: 90,
                      fit: BoxFit.contain,
                    ),
                    Text(
                      progress.chestReady(topic)
                          ? 'Открыть сундук'
                          : '${progress.doneInTopic(topic)}/3 задания',
                      style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class TasksPage extends StatelessWidget {
  const TasksPage({super.key, required this.progress});
  final ProgressStore progress;
  @override
  Widget build(BuildContext context) => ListView(
    padding: EdgeInsets.zero,
    children: [
      Container(
        padding: const EdgeInsets.fromLTRB(20, 30, 20, 23),
        color: const Color(0xFFD94F9D),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Задания коми',
              style: Theme.of(
                context,
              ).textTheme.headlineLarge!.copyWith(color: Colors.white),
            ),
            const SizedBox(height: 6),
            const Text(
              'Две темы · шесть открытий',
              style: TextStyle(
                color: Color(0xFFFFE8F5),
                fontWeight: FontWeight.w700,
              ),
            ),
            const SizedBox(height: 24),
            Container(
              padding: const EdgeInsets.all(17),
              decoration: BoxDecoration(
                color: FolkColors.darkBg,
                borderRadius: BorderRadius.circular(18),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Пройдите обе темы!',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 19,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                  const SizedBox(height: 12),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(8),
                    child: LinearProgressIndicator(
                      value: progress.completed.length / tasks.length,
                      minHeight: 13,
                      backgroundColor: FolkColors.darkLine,
                      valueColor: const AlwaysStoppedAnimation(
                        Color(0xFFD94F9D),
                      ),
                    ),
                  ),
                  const SizedBox(height: 6),
                  Align(
                    alignment: Alignment.centerRight,
                    child: Text(
                      '${progress.completed.length} / ${tasks.length}',
                      style: const TextStyle(
                        color: FolkColors.darkMuted,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
      Padding(
        padding: const EdgeInsets.fromLTRB(16, 23, 16, 24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Eyebrow('ЦЕЛИ ПУТЕШЕСТВИЯ'),
            const SizedBox(height: 12),
            _GoalRow(
              title: 'Выучите первое приветствие',
              current: progress.isDone('hello') ? 1 : 0,
              total: 1,
              icon: Icons.chat_bubble_rounded,
              color: FolkColors.green,
            ),
            const SizedBox(height: 10),
            _GoalRow(
              title: 'Пройдите 3 задания',
              current: progress.completed.length.clamp(0, 3),
              total: 3,
              icon: Icons.track_changes_rounded,
              color: FolkColors.blue,
            ),
            const SizedBox(height: 10),
            _GoalRow(
              title: 'Откройте оба сундука',
              current: progress.openedChests.length,
              total: 2,
              icon: Icons.card_giftcard_rounded,
              color: FolkColors.orange,
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

class _GoalRow extends StatelessWidget {
  const _GoalRow({
    required this.title,
    required this.current,
    required this.total,
    required this.icon,
    required this.color,
  });
  final String title;
  final int current;
  final int total;
  final IconData icon;
  final Color color;
  @override
  Widget build(BuildContext context) => FolkCard(
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
                  minHeight: 11,
                  backgroundColor: FolkColors.isDark(context)
                      ? FolkColors.darkLine
                      : FolkColors.line,
                  valueColor: AlwaysStoppedAnimation(color),
                ),
              ),
              const SizedBox(height: 5),
              Text(
                '$current / $total',
                style: Theme.of(context).textTheme.bodyMedium,
              ),
            ],
          ),
        ),
        const SizedBox(width: 16),
        Icon(icon, color: color, size: 34),
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
                    : 'Открыть сундук',
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
      padding: const EdgeInsets.fromLTRB(16, 30, 16, 24),
      children: [
        const PageTitle('Рейтинг', 'Каждое открытие приближает к вершине'),
        const SizedBox(height: 18),
        FolkCard(
          color: FolkColors.yellow,
          border: const Color(0xFFE6A700),
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
                      fontSize: 42,
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
        const Eyebrow('ЛИДЕРЫ НЕДЕЛИ · ДЕМО'),
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
                    'Сундук с наградой',
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
                          ? 'Сундук можно открыть!'
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
      const SizedBox(height: 22),
      Center(
        child: Image.asset('assets/images/mascot-sitting.png', height: 150),
      ),
      const SizedBox(height: 14),
      Center(
        child: Text(
          'Исследователь коми',
          style: Theme.of(context).textTheme.headlineMedium,
        ),
      ),
      const SizedBox(height: 18),
      FolkCard(
        color: FolkColors.greenLight,
        border: FolkColors.green,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            _ProfileStat(value: '${progress.experience}', label: 'опыт'),
            _ProfileStat(
              value: '${progress.completed.length}/${tasks.length}',
              label: 'задания',
            ),
            _ProfileStat(
              value: '${progress.openedChests.length}/2',
              label: 'сундуки',
            ),
          ],
        ),
      ),
      const SizedBox(height: 14),
      FolkCard(
        color: FolkColors.light,
        child: Row(
          children: [
            const Icon(Icons.language_rounded, color: FolkColors.blue),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                'Курс · Коми',
                style: Theme.of(context).textTheme.titleMedium,
              ),
            ),
            Text('2 темы', style: Theme.of(context).textTheme.bodyMedium),
          ],
        ),
      ),
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
                'Задания, ягоды и сундуки вернутся к началу.',
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

class _ProfileStat extends StatelessWidget {
  const _ProfileStat({required this.value, required this.label});
  final String value;
  final String label;
  @override
  Widget build(BuildContext context) => Column(
    children: [
      Text(value, style: Theme.of(context).textTheme.headlineMedium),
      const SizedBox(height: 2),
      Text(label, style: Theme.of(context).textTheme.bodyMedium),
    ],
  );
}
