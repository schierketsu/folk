import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'data.dart';
import 'lesson.dart';
import 'progress.dart';
import 'screens.dart';
import 'ui.dart';

class ActivityFeedPage extends StatelessWidget {
  const ActivityFeedPage({super.key, required this.progress});
  final ProgressStore progress;

  @override
  Widget build(BuildContext context) => ListView(
    padding: const EdgeInsets.fromLTRB(16, 30, 16, 24),
    children: [
      Text('Лента новостей', style: Theme.of(context).textTheme.headlineLarge),
      const SizedBox(height: 22),
      if (progress.openedChests.isNotEmpty) ...[
        _FeedStory(
          author: 'Вы',
          time: 'Ваше достижение',
          title: 'Вы получили пестерь за задания!',
          detail:
              'Пройдено ${progress.completed.length} из ${tasks.length} заданий. Награда за тему открыта!',
          image: 'assets/images/chest-open.png',
          onOpen: () => Navigator.push(
            context,
            MaterialPageRoute<void>(
              builder: (_) => ChestPage(
                progress: progress,
                topic: progress.openedChests.first,
              ),
            ),
          ),
        ),
        const Divider(height: 38, thickness: 2),
      ],
      _FeedStory(
        author: 'ФОЛК',
        time: 'Начало пути',
        title: 'Первый день путешествия по языку коми!',
        detail: 'Открывайте новые темы и собирайте награды.',
        image: 'assets/images/fire.png',
        onOpen: () => showPlace(context, progress, 0),
      ),
      const Divider(height: 38, thickness: 2),
      _FeedStory(
        author: 'ФОЛК',
        time: 'Традиции коми',
        title: 'Шаньга объединяет за столом',
        detail: topics[1].prompt,
        image: topics[1].mapImage,
        onOpen: () => showPlace(context, progress, 1),
      ),
      const Divider(height: 38, thickness: 2),
      Row(
        children: [
          Image.asset(
            'assets/images/chest-closed.png',
            width: 63,
            height: 63,
            fit: BoxFit.contain,
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
                  'Пройдите три задания и откройте пестерь с клюквой',
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              ],
            ),
          ),
        ],
      ),
    ],
  );
}

class _FeedStory extends StatefulWidget {
  const _FeedStory({
    required this.author,
    required this.time,
    required this.title,
    required this.detail,
    required this.image,
    required this.onOpen,
  });
  final String author;
  final String time;
  final String title;
  final String detail;
  final String image;
  final VoidCallback onOpen;

  @override
  State<_FeedStory> createState() => _FeedStoryState();
}

class _FeedStoryState extends State<_FeedStory> {
  bool liked = false;
  final List<String> comments = [];

  void _showComments() {
    final controller = TextEditingController();
    showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      builder: (sheetContext) => StatefulBuilder(
        builder: (sheetContext, refresh) => Padding(
          padding: EdgeInsets.fromLTRB(
            18,
            20,
            18,
            MediaQuery.viewInsetsOf(sheetContext).bottom + 20,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Обсуждение',
                style: Theme.of(sheetContext).textTheme.headlineMedium,
              ),
              const SizedBox(height: 13),
              if (comments.isEmpty)
                Text(
                  'Оставьте первый комментарий',
                  style: Theme.of(sheetContext).textTheme.bodyMedium,
                ),
              ...comments.map(
                (comment) => Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Text(comment),
                ),
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: controller,
                      maxLength: 200,
                      decoration: const InputDecoration(
                        hintText: 'Ваш комментарий',
                        border: OutlineInputBorder(),
                      ),
                    ),
                  ),
                  IconButton(
                    tooltip: 'Отправить',
                    onPressed: () {
                      final text = controller.text.trim();
                      if (text.isEmpty) return;
                      setState(() => comments.add(text));
                      refresh(() {});
                      controller.clear();
                    },
                    icon: const Icon(
                      Icons.send_rounded,
                      color: FolkColors.blue,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    ).whenComplete(controller.dispose);
  }

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.symmetric(vertical: 8),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            CircleAvatar(
              radius: 20,
              backgroundColor: FolkColors.darkBlue,
              child: widget.author == 'Вы'
                  ? const Icon(Icons.person_rounded, color: Colors.white)
                  : Image.asset(
                      'assets/images/mascot-sitting.png',
                      width: 29,
                      height: 29,
                      fit: BoxFit.contain,
                    ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    widget.author,
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  Text(
                    widget.time,
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                ],
              ),
            ),
            InkWell(
              onTap: widget.onOpen,
              child: Image.asset(
                widget.image,
                width: 76,
                height: 76,
                fit: BoxFit.contain,
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        Text(widget.title, style: Theme.of(context).textTheme.titleLarge),
        const SizedBox(height: 5),
        Text(widget.detail, style: Theme.of(context).textTheme.bodyLarge),
        const SizedBox(height: 14),
        Row(
          children: [
            _ActionIcon(
              icon: liked
                  ? Icons.favorite_rounded
                  : Icons.favorite_border_rounded,
              label: liked ? '1' : '0',
              color: liked ? FolkColors.red : null,
              onTap: () => setState(() => liked = !liked),
            ),
            const SizedBox(width: 9),
            _ActionIcon(
              icon: Icons.chat_bubble_outline_rounded,
              label: '${comments.length}',
              onTap: _showComments,
            ),
            const Spacer(),
            _ActionIcon(
              icon: Icons.ios_share_rounded,
              label: '',
              onTap: () async {
                await Clipboard.setData(
                  ClipboardData(text: '${widget.title}\n${widget.detail}'),
                );
                if (context.mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Текст истории скопирован')),
                  );
                }
              },
            ),
          ],
        ),
      ],
    ),
  );
}

class _ActionIcon extends StatelessWidget {
  const _ActionIcon({
    required this.icon,
    required this.label,
    required this.onTap,
    this.color,
  });
  final IconData icon;
  final String label;
  final VoidCallback onTap;
  final Color? color;
  @override
  Widget build(BuildContext context) => InkWell(
    onTap: onTap,
    borderRadius: BorderRadius.circular(10),
    child: Container(
      padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 8),
      decoration: BoxDecoration(
        border: Border.all(
          color: FolkColors.isDark(context)
              ? FolkColors.darkLine
              : FolkColors.line,
          width: 1.5,
        ),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            icon,
            size: 18,
            color: color ?? Theme.of(context).textTheme.bodyMedium!.color,
          ),
          if (label.isNotEmpty) ...[
            const SizedBox(width: 4),
            Text(label, style: Theme.of(context).textTheme.bodyMedium),
          ],
        ],
      ),
    ),
  );
}
