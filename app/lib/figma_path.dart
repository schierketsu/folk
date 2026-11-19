import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

import 'data.dart';
import 'progress.dart';
import 'ui.dart';

/// The editable Figma path, with the pester as a step between lesson nodes.
class FigmaPath extends StatefulWidget {
  const FigmaPath({
    super.key,
    required this.topic,
    required this.progress,
    required this.onTask,
    required this.onPlace,
    required this.onPester,
  });

  final int topic;
  final ProgressStore progress;
  final ValueChanged<QuizTask> onTask;
  final VoidCallback onPlace;
  final VoidCallback onPester;

  @override
  State<FigmaPath> createState() => _FigmaPathState();
}

class _FigmaPathState extends State<FigmaPath> {
  String? selectedTaskId;

  @override
  Widget build(BuildContext context) {
    final lessons = tasksForTopic(widget.topic);
    final active = lessons.firstWhere(
      (task) => !widget.progress.isDone(task.id),
      orElse: () => lessons.first,
    );
    final accent = widget.topic == 0 ? FolkColors.green : FolkColors.orange;
    final edge = widget.topic == 0
        ? FolkColors.greenDark
        : FolkColors.orangeDark;
    final dark = FolkColors.isDark(context);
    const positions = <double>[0, -.31, -.50, -.31, 0, .31];

    Widget stepAt(int index) => Column(
      children: [
        SizedBox(
          height: 96,
          child: Align(
            alignment: Alignment(positions[index], 0),
            child: _StepNode(
              key: Key('path-step-${widget.topic}-$index'),
              glyph: index == lessons.length - 1
                  ? 'step-book.svg'
                  : 'step-star.svg',
              color: accent,
              edge: edge,
              active: lessons[index].id == active.id,
              done: widget.progress.isDone(lessons[index].id),
              locked:
                  index > 0 &&
                  !widget.progress.isDone(lessons[index - 1].id) &&
                  !widget.progress.isDone(lessons[index].id),
              dark: dark,
              onTap: () {
                final available =
                    index == 0 ||
                    widget.progress.isDone(lessons[index - 1].id) ||
                    widget.progress.isDone(lessons[index].id);
                if (available) {
                  setState(() {
                    selectedTaskId = selectedTaskId == lessons[index].id
                        ? null
                        : lessons[index].id;
                  });
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Сначала завершите предыдущий этап'),
                      behavior: SnackBarBehavior.floating,
                    ),
                  );
                }
              },
            ),
          ),
        ),
        AnimatedSize(
          duration: const Duration(milliseconds: 220),
          curve: Curves.easeInOut,
          alignment: Alignment.topCenter,
          child: selectedTaskId == lessons[index].id
              ? _ActiveLessonCard(
                  task: lessons[index],
                  number: index + 1,
                  total: lessons.length,
                  accent: accent,
                  edge: edge,
                  done: widget.progress.isDone(lessons[index].id),
                  onTap: () => widget.onTask(lessons[index]),
                )
              : const SizedBox.shrink(),
        ),
      ],
    );

    return Column(
      children: [
        stepAt(0),
        stepAt(1),
        Stack(
          children: [
            Positioned(
              right: 0,
              bottom: 0,
              child: _PlaceMilestone(
                topic: widget.topic,
                progress: widget.progress,
                onTap: widget.onPlace,
              ),
            ),
            SizedBox(
              width: double.infinity,
              child: Column(children: [stepAt(2), stepAt(3)]),
            ),
          ],
        ),
        stepAt(4),
        stepAt(5),
        const SizedBox(height: 8),
        InkWell(
          onTap: widget.onPester,
          borderRadius: BorderRadius.circular(18),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
            child: Column(
              children: [
                PesterImage(
                  size: 82,
                  opened: widget.progress.chestOpened(widget.topic),
                ),
                const SizedBox(height: 5),
                Text(
                  widget.progress.chestOpened(widget.topic)
                      ? 'Награда получена'
                      : 'Награда за 6 этапов',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 20),
      ],
    );
  }
}

class _ActiveLessonCard extends StatelessWidget {
  const _ActiveLessonCard({
    required this.task,
    required this.number,
    required this.total,
    required this.accent,
    required this.edge,
    required this.done,
    required this.onTap,
  });

  final QuizTask task;
  final int number;
  final int total;
  final Color accent;
  final Color edge;
  final bool done;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.fromLTRB(10, 4, 10, 10),
    child: InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(18),
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.fromLTRB(18, 17, 18, 15),
        decoration: BoxDecoration(
          color: accent,
          borderRadius: BorderRadius.circular(18),
          border: Border(bottom: BorderSide(color: edge, width: 4)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              done ? 'Быстрое повторение' : task.title,
              style: Theme.of(
                context,
              ).textTheme.headlineMedium!.copyWith(color: Colors.white),
            ),
            const SizedBox(height: 5),
            Text(
              'Этап $number из $total · ${task.title.toLowerCase()}',
              style: Theme.of(context).textTheme.bodyLarge!.copyWith(
                color: Colors.white.withValues(alpha: .9),
              ),
            ),
            const SizedBox(height: 12),
            Container(
              height: 48,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
                border: Border(
                  bottom: BorderSide(
                    color: edge.withValues(alpha: .35),
                    width: 4,
                  ),
                ),
              ),
              child: Text(
                done ? 'ПОВТОРИТЬ' : 'УЧИТЬСЯ · +15 ОПЫТА',
                style: TextStyle(
                  color: edge,
                  fontWeight: FontWeight.w900,
                  letterSpacing: .8,
                ),
              ),
            ),
          ],
        ),
      ),
    ),
  );
}

class _PlaceMilestone extends StatelessWidget {
  const _PlaceMilestone({
    required this.topic,
    required this.progress,
    required this.onTap,
  });

  final int topic;
  final ProgressStore progress;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.only(right: 20),
    child: InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(18),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Image.asset(
            topics[topic].mapImage,
            width: 152,
            height: 122,
            fit: BoxFit.contain,
            semanticLabel: topics[topic].place,
          ),
          const SizedBox(height: 5),
          Row(
            mainAxisSize: MainAxisSize.min,
            children: List.generate(
              3,
              (i) => Icon(
                Icons.star_rounded,
                size: 24,
                color: i < progress.doneInTopic(topic)
                    ? FolkColors.yellow
                    : FolkColors.line,
              ),
            ),
          ),
        ],
      ),
    ),
  );
}

class _StepNode extends StatelessWidget {
  const _StepNode({
    super.key,
    required this.glyph,
    required this.color,
    required this.edge,
    required this.onTap,
    this.active = false,
    this.done = false,
    this.locked = false,
    this.dark = false,
  });
  final String glyph;
  final Color color;
  final Color edge;
  final VoidCallback onTap;
  final bool active;
  final bool done;
  final bool locked;
  final bool dark;

  @override
  Widget build(BuildContext context) {
    final face = active
        ? FolkColors.blue
        : done
        ? color
        : dark
        ? FolkColors.darkLine
        : const Color(0xFFE5E5E5);
    final rim = active
        ? const Color(0xFF1597CB)
        : done
        ? edge
        : dark
        ? const Color(0xFF293B41)
        : const Color(0xFFB5B5B5);
    final content = SizedBox(
      width: 96,
      height: 96,
      child: Stack(
        alignment: Alignment.center,
        children: [
          if (active)
            CustomPaint(
              size: const Size(96, 96),
              painter: _SegmentRing(
                color: dark ? FolkColors.darkLine : FolkColors.line,
              ),
            ),
          Positioned(
            top: 15,
            child: Container(
              width: 66,
              height: 66,
              decoration: BoxDecoration(
                color: face,
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: rim,
                    offset: const Offset(0, 5),
                    blurRadius: 0,
                  ),
                ],
              ),
              child: Center(
                child: active
                    ? const Icon(
                        Icons.sync_alt_rounded,
                        size: 36,
                        color: Colors.white,
                      )
                    : locked
                    ? Icon(
                        Icons.lock_rounded,
                        size: 30,
                        color: dark
                            ? FolkColors.darkMuted
                            : const Color(0xFFAAAAAA),
                      )
                    : SvgPicture.asset(
                        'assets/images/$glyph',
                        width: 30,
                        height: 30,
                        colorFilter: done
                            ? null
                            : ColorFilter.mode(
                                dark
                                    ? FolkColors.darkMuted
                                    : const Color(0xFFB5B5B5),
                                BlendMode.srcIn,
                              ),
                      ),
              ),
            ),
          ),
        ],
      ),
    );
    return InkWell(
      onTap: onTap,
      customBorder: const CircleBorder(),
      child: content,
    );
  }
}

class _SegmentRing extends CustomPainter {
  const _SegmentRing({required this.color});

  final Color color;

  @override
  void paint(Canvas canvas, Size size) {
    final rect = Rect.fromLTWH(4, 4, size.width - 8, size.height - 8);
    const sector = math.pi * 2 / 3;
    const gap = .22;
    for (var index = 0; index < 3; index++) {
      canvas.drawArc(
        rect,
        -math.pi / 2 + index * sector + gap / 2,
        sector - gap,
        false,
        Paint()
          ..color = color
          ..style = PaintingStyle.stroke
          ..strokeWidth = 7,
      );
    }
  }

  @override
  bool shouldRepaint(_SegmentRing oldDelegate) => color != oldDelegate.color;
}
