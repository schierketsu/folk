import 'dart:async';

import 'package:flutter/material.dart';

import 'data.dart';
import 'progress.dart';
import 'ui.dart';

class QuizPage extends StatefulWidget {
  const QuizPage({super.key, required this.progress, required this.task});
  final ProgressStore progress;
  final QuizTask task;
  @override
  State<QuizPage> createState() => _QuizPageState();
}

class _QuizPageState extends State<QuizPage> {
  int? selected;
  bool checked = false;
  bool correct = false;
  bool earned = false;

  Future<void> _check() async {
    if (selected == null) return;
    final answerIsCorrect = selected == widget.task.correct;
    if (answerIsCorrect) {
      earned = await widget.progress.complete(widget.task);
    } else {
      await widget.progress.loseHeart();
    }
    if (!mounted) return;
    setState(() {
      checked = true;
      correct = answerIsCorrect;
    });
  }

  void _continue() {
    if (correct) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute<void>(
          builder: (_) => ResultPage(
            progress: widget.progress,
            task: widget.task,
            earned: earned,
          ),
        ),
      );
    } else {
      setState(() {
        checked = false;
        selected = null;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final topic = topics[widget.task.topic];
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 10),
              child: Row(
                children: [
                  IconButton(
                    onPressed: () => Navigator.pop(context),
                    icon: const Icon(
                      Icons.close_rounded,
                      color: FolkColors.muted,
                    ),
                  ),
                  Expanded(
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(10),
                      child: const LinearProgressIndicator(
                        value: .7,
                        minHeight: 13,
                        backgroundColor: FolkColors.line,
                        valueColor: AlwaysStoppedAnimation(FolkColors.green),
                      ),
                    ),
                  ),
                  const SizedBox(width: 13),
                  StatPill(
                    asset: 'heart.png',
                    value: '${widget.progress.hearts}',
                    color: FolkColors.red,
                  ),
                ],
              ),
            ),
            Expanded(
              child: ListView(
                padding: const EdgeInsets.fromLTRB(20, 12, 20, 12),
                children: [
                  Eyebrow(
                    topic.title,
                    color: widget.task.topic == 0
                        ? FolkColors.greenDark
                        : FolkColors.orangeDark,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    widget.task.question,
                    style: Theme.of(context).textTheme.headlineLarge,
                  ),
                  const SizedBox(height: 24),
                  MascotBubble(text: widget.task.foxLine),
                  const SizedBox(height: 22),
                  ...List.generate(widget.task.options.length, (i) {
                    final active = selected == i;
                    final isCorrect = checked && i == widget.task.correct;
                    final wrong = checked && active && !correct;
                    final stroke = isCorrect
                        ? FolkColors.green
                        : wrong
                        ? FolkColors.red
                        : active
                        ? FolkColors.blue
                        : FolkColors.line;
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 11),
                      child: FolkCard(
                        color: isCorrect
                            ? FolkColors.greenLight
                            : wrong
                            ? const Color(0xFFFFDFE0)
                            : active
                            ? FolkColors.blueLight
                            : Colors.white,
                        border: stroke,
                        onTap: checked
                            ? null
                            : () => setState(() => selected = i),
                        child: Row(
                          children: [
                            Container(
                              width: 29,
                              height: 29,
                              alignment: Alignment.center,
                              decoration: BoxDecoration(
                                border: Border.all(color: stroke, width: 2),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Text(
                                '${i + 1}',
                                style: TextStyle(
                                  color: stroke == FolkColors.line
                                      ? FolkColors.ink
                                      : stroke,
                                  fontWeight: FontWeight.w900,
                                ),
                              ),
                            ),
                            const SizedBox(width: 13),
                            Expanded(
                              child: Text(
                                widget.task.options[i],
                                style: Theme.of(context).textTheme.titleMedium,
                              ),
                            ),
                            if (isCorrect)
                              const Icon(
                                Icons.check_circle_rounded,
                                color: FolkColors.green,
                              ),
                          ],
                        ),
                      ),
                    );
                  }),
                ],
              ),
            ),
            if (checked)
              Container(
                width: double.infinity,
                padding: const EdgeInsets.fromLTRB(20, 14, 20, 12),
                color: correct
                    ? FolkColors.greenLight
                    : const Color(0xFFFFDFE0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      correct ? 'Отлично!' : 'Попробуйте ещё раз',
                      style: Theme.of(context).textTheme.titleLarge!.copyWith(
                        color: correct ? FolkColors.greenDark : FolkColors.red,
                      ),
                    ),
                    if (!correct)
                      Text(
                        'Правильный ответ: ${widget.task.options[widget.task.correct]}',
                        style: Theme.of(context).textTheme.bodyMedium,
                      ),
                  ],
                ),
              ),
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 11, 20, 18),
              child: FolkButton(
                text: checked
                    ? (correct ? 'Продолжить' : 'Повторить')
                    : 'Проверить',
                onPressed: checked
                    ? _continue
                    : selected == null
                    ? null
                    : _check,
                color: checked && !correct ? FolkColors.red : FolkColors.green,
                shadow: checked && !correct
                    ? const Color(0xFFEA2B2B)
                    : FolkColors.greenDark,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class ResultPage extends StatelessWidget {
  const ResultPage({
    super.key,
    required this.progress,
    required this.task,
    required this.earned,
  });
  final ProgressStore progress;
  final QuizTask task;
  final bool earned;

  @override
  Widget build(BuildContext context) {
    final chestReady =
        progress.chestReady(task.topic) && !progress.chestOpened(task.topic);
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(18, 25, 18, 18),
          child: Column(
            children: [
              const Spacer(),
              const FoxSprite(),
              const SizedBox(height: 25),
              Text(
                'Урок пройден!',
                style: Theme.of(context).textTheme.headlineLarge!.copyWith(
                  color: FolkColors.orangeDark,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              Text(
                'Впереди у вас ещё много открытий!',
                style: Theme.of(context).textTheme.bodyMedium,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 19),
              Row(
                children: [
                  Expanded(
                    child: _ResultStat(
                      label: 'ОПЫТ',
                      value: earned ? '+15' : '0',
                      color: FolkColors.yellow,
                      icon: Icons.bolt_rounded,
                    ),
                  ),
                  const SizedBox(width: 8),
                  const Expanded(
                    child: _ResultStat(
                      label: 'ТОЧНОСТЬ',
                      value: '100%',
                      color: FolkColors.green,
                      icon: Icons.track_changes_rounded,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: _ResultStat(
                      label: 'КЛЮКВА',
                      value: earned ? '+15' : '0',
                      color: FolkColors.blue,
                      icon: Icons.circle,
                    ),
                  ),
                ],
              ),
              const Spacer(flex: 2),
              FolkButton(
                text: chestReady ? 'Открыть пестерь' : 'Продолжить',
                onPressed: () {
                  if (chestReady) {
                    Navigator.of(context).pushReplacement(
                      MaterialPageRoute<void>(
                        builder: (_) =>
                            ChestPage(progress: progress, topic: task.topic),
                      ),
                    );
                  } else {
                    Navigator.pop(context);
                  }
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ResultStat extends StatelessWidget {
  const _ResultStat({
    required this.label,
    required this.value,
    required this.color,
    required this.icon,
  });
  final String label;
  final String value;
  final Color color;
  final IconData icon;
  @override
  Widget build(BuildContext context) => Container(
    decoration: BoxDecoration(
      color: Colors.white,
      border: Border.all(color: color, width: 2),
      borderRadius: BorderRadius.circular(12),
    ),
    child: Column(
      children: [
        Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(vertical: 3),
          color: color,
          child: Text(
            label,
            textAlign: TextAlign.center,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 10,
              fontWeight: FontWeight.w900,
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 9),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, color: color, size: 17),
              const SizedBox(width: 3),
              Text(
                value,
                style: TextStyle(color: color, fontWeight: FontWeight.w900),
              ),
            ],
          ),
        ),
      ],
    ),
  );
}

class FoxSprite extends StatefulWidget {
  const FoxSprite({super.key});
  @override
  State<FoxSprite> createState() => _FoxSpriteState();
}

class _FoxSpriteState extends State<FoxSprite> {
  int frame = 0;
  Timer? timer;

  @override
  void initState() {
    super.initState();
    timer = Timer.periodic(const Duration(milliseconds: 120), (_) {
      if (mounted) setState(() => frame = (frame + 1) % 20);
    });
  }

  @override
  void dispose() {
    timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final sheet = frame ~/ 4 + 1;
    final cell = frame % 4;
    return ClipRRect(
      borderRadius: BorderRadius.circular(20),
      child: SizedBox(
        width: 260,
        height: 174,
        child: ClipRect(
          child: Stack(
            children: [
              Positioned(
                left: -(cell % 2) * 260.0,
                top: -(cell ~/ 2) * 174.0,
                child: Image.asset(
                  'assets/images/fox-animation-0$sheet.png',
                  width: 520,
                  height: 348,
                  fit: BoxFit.fill,
                  gaplessPlayback: true,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class ChestPage extends StatefulWidget {
  const ChestPage({super.key, required this.progress, required this.topic});
  final ProgressStore progress;
  final int topic;
  @override
  State<ChestPage> createState() => _ChestPageState();
}

class _ChestPageState extends State<ChestPage> {
  bool opening = false;
  @override
  Widget build(BuildContext context) {
    final ready = widget.progress.chestReady(widget.topic);
    final opened = widget.progress.chestOpened(widget.topic);
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(20, 12, 20, 18),
          child: Column(
            children: [
              Align(
                alignment: Alignment.centerLeft,
                child: IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(
                    Icons.close_rounded,
                    color: FolkColors.muted,
                  ),
                ),
              ),
              const Spacer(),
              Eyebrow('ТЕМА ${widget.topic + 1} · НАГРАДА'),
              const SizedBox(height: 30),
              AnimatedSwitcher(
                duration: const Duration(milliseconds: 500),
                child: Image.asset(
                  opened
                      ? 'assets/images/chest-open.png'
                      : 'assets/images/chest-closed.png',
                  key: ValueKey(opened),
                  width: 260,
                  height: 230,
                  fit: BoxFit.contain,
                ),
              ),
              const SizedBox(height: 20),
              Text(
                opened
                    ? 'Награда получена!'
                    : ready
                    ? 'Впереди награда!'
                    : 'Пестерь пока закрыт',
                style: Theme.of(context).textTheme.headlineLarge,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 9),
              Text(
                opened
                    ? '+50 ягод клюквы'
                    : ready
                    ? 'Откройте пестерь за пройденную тему'
                    : 'Пройдите все три задания темы',
                style: Theme.of(context).textTheme.bodyMedium,
                textAlign: TextAlign.center,
              ),
              const Spacer(flex: 2),
              FolkButton(
                text: opened
                    ? 'Продолжить'
                    : ready
                    ? 'Открыть пестерь'
                    : 'К заданиям',
                onPressed: opening
                    ? null
                    : () async {
                        if (opened || !ready) {
                          Navigator.pop(context);
                          return;
                        }
                        setState(() => opening = true);
                        await widget.progress.openChest(widget.topic);
                        if (mounted) setState(() => opening = false);
                      },
                color: ready && !opened ? FolkColors.orange : FolkColors.green,
                shadow: ready && !opened
                    ? FolkColors.orangeDark
                    : FolkColors.greenDark,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
