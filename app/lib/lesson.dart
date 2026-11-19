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
  late final DateTime startedAt = DateTime.now();
  int stepIndex = 0;
  int mistakes = 0;
  int? selected;
  final arranged = <String>[];
  bool checked = false;
  bool correct = false;
  bool earned = false;

  QuizStep get step => widget.task.steps[stepIndex];
  bool get hasAnswer =>
      step.kind == QuizKind.choice ? selected != null : arranged.isNotEmpty;

  Future<void> _check() async {
    if (!hasAnswer) return;
    final answerIsCorrect = step.kind == QuizKind.choice
        ? selected == step.correct
        : arranged.join('\u0000') == step.answer.join('\u0000');
    if (answerIsCorrect && stepIndex == widget.task.steps.length - 1) {
      earned = await widget.progress.complete(widget.task);
    } else if (!answerIsCorrect) {
      mistakes++;
      await widget.progress.loseHeart();
    }
    if (!mounted) return;
    setState(() {
      checked = true;
      correct = answerIsCorrect;
    });
  }

  void _continue() {
    if (!correct) {
      setState(() {
        checked = false;
        selected = null;
        arranged.clear();
      });
      return;
    }
    if (stepIndex == widget.task.steps.length - 1) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute<void>(
          builder: (_) => ResultPage(
            progress: widget.progress,
            task: widget.task,
            earned: earned,
            accuracy:
                (widget.task.steps.length /
                        (widget.task.steps.length + mistakes) *
                        100)
                    .round(),
            elapsed: DateTime.now().difference(startedAt),
          ),
        ),
      );
    } else {
      setState(() {
        stepIndex++;
        checked = false;
        selected = null;
        arranged.clear();
      });
    }
  }

  Widget _choiceAnswers(BuildContext context) => Column(
    children: List.generate(step.options.length, (i) {
      final active = selected == i;
      final isCorrect = checked && i == step.correct;
      final wrong = checked && active && !correct;
      final stroke = isCorrect
          ? FolkColors.green
          : wrong
          ? FolkColors.red
          : active
          ? FolkColors.blue
          : FolkColors.line;
      final fill = isCorrect
          ? FolkColors.greenLight
          : wrong
          ? const Color(0xFFFFDFE0)
          : active
          ? FolkColors.blueLight
          : Colors.white;
      return Padding(
        padding: const EdgeInsets.only(bottom: 11),
        child: AnimatedScale(
          scale: active ? 1.015 : 1,
          duration: const Duration(milliseconds: 160),
          curve: Curves.easeOutBack,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 220),
            decoration: BoxDecoration(
              color: FolkColors.surface(context, fill),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                color: FolkColors.stroke(context, stroke),
                width: 2,
              ),
              boxShadow: [
                BoxShadow(
                  color: FolkColors.stroke(
                    context,
                    stroke,
                  ).withValues(alpha: .22),
                  offset: const Offset(0, 3),
                ),
              ],
            ),
            child: InkWell(
              onTap: checked ? null : () => setState(() => selected = i),
              borderRadius: BorderRadius.circular(16),
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 15,
                  vertical: 14,
                ),
                child: Row(
                  children: [
                    Container(
                      width: 31,
                      height: 31,
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        color: active || isCorrect
                            ? stroke.withValues(alpha: .12)
                            : null,
                        border: Border.all(color: stroke, width: 2),
                        borderRadius: BorderRadius.circular(9),
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
                        step.options[i],
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                    ),
                    if (isCorrect)
                      const Icon(
                        Icons.check_circle_rounded,
                        color: FolkColors.green,
                      ),
                    if (wrong)
                      const Icon(Icons.cancel_rounded, color: FolkColors.red),
                  ],
                ),
              ),
            ),
          ),
        ),
      );
    }),
  );

  Widget _arrangeAnswer(BuildContext context) => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      const Eyebrow('ВАШ ОТВЕТ'),
      const SizedBox(height: 8),
      AnimatedContainer(
        duration: const Duration(milliseconds: 220),
        constraints: const BoxConstraints(minHeight: 132),
        width: double.infinity,
        padding: const EdgeInsets.all(13),
        decoration: BoxDecoration(
          color: FolkColors.surface(context, FolkColors.light),
          border: Border.all(
            color: checked
                ? (correct ? FolkColors.green : FolkColors.red)
                : FolkColors.stroke(context, FolkColors.line),
            width: 2,
          ),
          borderRadius: BorderRadius.circular(16),
        ),
        child: arranged.isEmpty
            ? Center(
                child: Text(
                  'Нажимайте слова в нужном порядке',
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              )
            : Wrap(
                spacing: 8,
                runSpacing: 8,
                children: arranged
                    .map(
                      (word) => _LessonWordChip(
                        word: word,
                        active: true,
                        onTap: checked
                            ? null
                            : () => setState(() => arranged.remove(word)),
                      ),
                    )
                    .toList(),
              ),
      ),
      const SizedBox(height: 22),
      const Eyebrow('СЛОВА'),
      const SizedBox(height: 9),
      Wrap(
        spacing: 8,
        runSpacing: 9,
        children: step.options
            .map(
              (word) => _LessonWordChip(
                word: word,
                active: !arranged.contains(word),
                onTap: checked || arranged.contains(word)
                    ? null
                    : () => setState(() => arranged.add(word)),
              ),
            )
            .toList(),
      ),
    ],
  );

  @override
  Widget build(BuildContext context) {
    final topic = topics[widget.task.topic];
    final progressValue =
        (stepIndex + (checked && correct ? 1 : 0)) / widget.task.steps.length;
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
                    child: TweenAnimationBuilder<double>(
                      tween: Tween(end: progressValue),
                      duration: const Duration(milliseconds: 420),
                      curve: Curves.easeOutCubic,
                      builder: (context, value, _) => ClipRRect(
                        borderRadius: BorderRadius.circular(10),
                        child: LinearProgressIndicator(
                          value: value,
                          minHeight: 13,
                          backgroundColor: FolkColors.line,
                          valueColor: const AlwaysStoppedAnimation(
                            FolkColors.green,
                          ),
                        ),
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
                    'ТЕМА ${widget.task.topic + 1} · ${topic.title}',
                    color: widget.task.topic == 0
                        ? FolkColors.greenDark
                        : FolkColors.orangeDark,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    step.question,
                    style: Theme.of(context).textTheme.headlineLarge,
                  ),
                  const SizedBox(height: 19),
                  AnimatedSwitcher(
                    duration: const Duration(milliseconds: 280),
                    transitionBuilder: (child, animation) => FadeTransition(
                      opacity: animation,
                      child: SlideTransition(
                        position: Tween(
                          begin: const Offset(.08, 0),
                          end: Offset.zero,
                        ).animate(animation),
                        child: child,
                      ),
                    ),
                    child: MascotBubble(
                      key: ValueKey(stepIndex),
                      text: widget.task.foxLine,
                    ),
                  ),
                  const SizedBox(height: 22),
                  AnimatedSwitcher(
                    duration: const Duration(milliseconds: 260),
                    child: KeyedSubtree(
                      key: ValueKey((stepIndex, step.kind)),
                      child: step.kind == QuizKind.choice
                          ? _choiceAnswers(context)
                          : _arrangeAnswer(context),
                    ),
                  ),
                ],
              ),
            ),
            AnimatedSwitcher(
              duration: const Duration(milliseconds: 250),
              child: checked
                  ? Container(
                      key: ValueKey(correct),
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
                            style: Theme.of(context).textTheme.titleLarge!
                                .copyWith(
                                  color: correct
                                      ? FolkColors.greenDark
                                      : FolkColors.red,
                                ),
                          ),
                          const SizedBox(height: 3),
                          Text(
                            step.note,
                            style: Theme.of(context).textTheme.bodyMedium,
                          ),
                        ],
                      ),
                    )
                  : const SizedBox.shrink(),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 11, 20, 18),
              child: FolkButton(
                text: checked
                    ? (correct ? 'Продолжить' : 'Попробовать снова')
                    : 'Проверить',
                onPressed: checked
                    ? _continue
                    : !hasAnswer
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

class _LessonWordChip extends StatelessWidget {
  const _LessonWordChip({
    required this.word,
    required this.active,
    required this.onTap,
  });

  final String word;
  final bool active;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final width = (word.length * 10.5 + 34).clamp(76.0, 180.0);
    return AnimatedOpacity(
      opacity: active ? 1 : .25,
      duration: const Duration(milliseconds: 180),
      child: SizedBox(
        width: width,
        height: 48,
        child: Material(
          color: FolkColors.surface(context, Colors.white),
          borderRadius: BorderRadius.circular(11),
          child: InkWell(
            onTap: onTap,
            borderRadius: BorderRadius.circular(11),
            child: Container(
              alignment: Alignment.center,
              padding: const EdgeInsets.symmetric(horizontal: 12),
              decoration: BoxDecoration(
                border: Border.all(
                  color: FolkColors.stroke(context, FolkColors.line),
                  width: 2,
                ),
                borderRadius: BorderRadius.circular(11),
                boxShadow: active
                    ? [
                        const BoxShadow(
                          color: FolkColors.line,
                          offset: Offset(0, 2),
                        ),
                      ]
                    : null,
              ),
              child: Text(
                word,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: Theme.of(context).textTheme.titleMedium,
              ),
            ),
          ),
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
    required this.accuracy,
    required this.elapsed,
  });
  final ProgressStore progress;
  final QuizTask task;
  final bool earned;
  final int accuracy;
  final Duration elapsed;

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
                  Expanded(
                    child: _ResultStat(
                      label: 'ТОЧНОСТЬ',
                      value: '$accuracy%',
                      color: FolkColors.green,
                      icon: Icons.track_changes_rounded,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: _ResultStat(
                      label: 'ВРЕМЯ',
                      value:
                          '${elapsed.inMinutes}:${(elapsed.inSeconds % 60).toString().padLeft(2, '0')}',
                      color: FolkColors.blue,
                      icon: Icons.schedule_rounded,
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
              AnimatedOpacity(
                opacity: opening ? .68 : 1,
                duration: const Duration(milliseconds: 250),
                child: Image.asset(
                  opened || opening
                      ? 'assets/images/chest-open.png'
                      : 'assets/images/chest-closed.png',
                  key: ValueKey((opened, opening)),
                  width: 260,
                  height: 230,
                  fit: BoxFit.contain,
                ),
              ),
              const SizedBox(height: 20),
              Text(
                opening
                    ? 'Сундук открывается!'
                    : opened
                    ? 'Награда получена!'
                    : ready
                    ? 'Впереди награда!'
                    : 'Пестерь пока закрыт',
                style: Theme.of(context).textTheme.headlineLarge,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 9),
              Text(
                opening
                    ? 'Продолжайте задания темы'
                    : opened
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
                        await Future<void>.delayed(
                          const Duration(milliseconds: 700),
                        );
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
