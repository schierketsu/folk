import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

import 'data.dart';
import 'progress.dart';
import 'ui.dart';

/// The editable Figma path, with the pester as a step between lesson nodes.
class FigmaPath extends StatelessWidget {
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
  Widget build(BuildContext context) {
    final lessons = tasksForTopic(topic);
    final active = lessons.firstWhere(
      (task) => !progress.isDone(task.id),
      orElse: () => lessons.first,
    );
    final others = lessons.where((task) => task.id != active.id).toList();
    final accent = topic == 0 ? FolkColors.green : FolkColors.orange;
    final edge = topic == 0 ? FolkColors.greenDark : FolkColors.orangeDark;
    final dark = FolkColors.isDark(context);

    return SizedBox(
      height: 505,
      child: LayoutBuilder(
        builder: (context, box) => Stack(
          clipBehavior: Clip.hardEdge,
          children: [
            Positioned(
              left: box.maxWidth / 2 - 50,
              top: 8,
              child: _StepNode(
                glyph: 'step-star.svg',
                color: accent,
                edge: edge,
                active: true,
                fraction: progress.doneInTopic(topic) / lessons.length,
                dark: dark,
                onTap: () => onTask(active),
              ),
            ),
            Positioned(
              left: box.maxWidth / 2 - 15,
              top: 102,
              child: SvgPicture.asset(
                'assets/images/path-pointer.svg',
                width: 30,
                height: 16,
                colorFilter: topic == 0
                    ? null
                    : ColorFilter.mode(accent, BlendMode.srcIn),
              ),
            ),
            Positioned(
              left: 10,
              right: 10,
              top: 114,
              child: InkWell(
                onTap: () => onTask(active),
                borderRadius: BorderRadius.circular(18),
                child: Container(
                  height: 154,
                  padding: const EdgeInsets.fromLTRB(16, 17, 16, 15),
                  decoration: BoxDecoration(
                    color: accent,
                    borderRadius: BorderRadius.circular(18),
                    border: Border(
                      left: BorderSide(color: edge, width: 2),
                      right: BorderSide(color: edge, width: 2),
                      bottom: BorderSide(color: edge, width: 4),
                    ),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Быстрое повторение',
                        style: Theme.of(context).textTheme.headlineMedium!
                            .copyWith(color: Colors.white),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Урок ${lessons.indexOf(active) + 1} из ${lessons.length} · ${active.title.toLowerCase()}',
                        style: Theme.of(context).textTheme.bodyLarge!.copyWith(
                          color: const Color(0xFFE8F8FF),
                        ),
                      ),
                      const SizedBox(height: 8),
                      Container(
                        height: 48,
                        width: double.infinity,
                        alignment: Alignment.center,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(12),
                          border: Border(
                            bottom: BorderSide(
                              color: topic == 0
                                  ? const Color(0xFFD7FFB8)
                                  : const Color(0xFFFFD6A1),
                              width: 4,
                            ),
                          ),
                        ),
                        child: Text(
                          progress.isDone(active.id)
                              ? 'ПОВТОРИТЬ'
                              : 'УЧИТЬСЯ · +15 ОПЫТА',
                          style: TextStyle(
                            color: edge,
                            fontSize: 15,
                            fontWeight: FontWeight.w800,
                            letterSpacing: .8,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            Positioned(
              left: box.maxWidth / 2 - 126.5,
              top: 280,
              child: _StepNode(
                glyph: 'step-star.svg',
                color: accent,
                edge: edge,
                done: progress.isDone(others.first.id),
                dark: dark,
                onTap: () => onTask(others.first),
              ),
            ),
            Positioned(
              right: 0,
              top: 270,
              child: InkWell(
                onTap: onPlace,
                child: Column(
                  children: [
                    Image.asset(topics[topic].mapImage,
                        width: 120, height: 116, fit: BoxFit.contain),
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: List.generate(3, (i) => Icon(
                        Icons.star_rounded,
                        size: 21,
                        color: i < progress.doneInTopic(topic)
                            ? FolkColors.yellow
                            : dark ? FolkColors.darkLine : FolkColors.line,
                      )),
                    ),
                  ],
                ),
              ),
            ),
            Positioned(
              left: box.maxWidth / 2 - 46.5,
              top: 376,
              child: InkWell(
                onTap: onPester,
                child: PesterImage(
                  size: 74.88,
                  opened: progress.chestOpened(topic),
                ),
              ),
            ),
            Positioned(
              right: 13,
              top: 460,
              child: _StepNode(
                glyph: 'step-book.svg',
                color: accent,
                edge: edge,
                done: progress.isDone(others.last.id),
                dark: dark,
                onTap: () => onTask(others.last),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _StepNode extends StatelessWidget {
  const _StepNode({
    required this.glyph,
    required this.color,
    required this.edge,
    required this.onTap,
    this.active = false,
    this.done = false,
    this.dark = false,
    this.fraction = 0,
  });
  final String glyph;
  final Color color;
  final Color edge;
  final VoidCallback onTap;
  final bool active;
  final bool done;
  final bool dark;
  final double fraction;

  @override
  Widget build(BuildContext context) {
    final face = active || done
        ? color
        : dark ? FolkColors.darkLine : const Color(0xFFE5E5E5);
    final rim = active || done
        ? edge
        : dark ? const Color(0xFF293B41) : const Color(0xFFB5B5B5);
    return InkWell(
      onTap: onTap,
      customBorder: const CircleBorder(),
      child: SizedBox(
        width: 100,
        height: 100,
        child: Stack(
          alignment: Alignment.center,
          children: [
            if (active)
              CustomPaint(
                size: const Size(100, 100),
                painter: _SegmentRing(
                  completed: (fraction * 3).round(),
                  color: color,
                  background: dark ? FolkColors.darkLine : FolkColors.line,
                ),
              ),
            Positioned(
              top: 23,
              child: Container(
                width: 70,
                height: 62,
                decoration: BoxDecoration(color: rim, shape: BoxShape.circle),
              ),
            ),
            Positioned(
              top: 15,
              child: ClipOval(
                child: Container(
                  width: 70,
                  height: 62,
                  color: face,
                ),
              ),
            ),
            SvgPicture.asset(
              'assets/images/node-glare.svg',
              width: 100,
              height: 100,
            ),
            Positioned(
              left: 34,
              top: 30,
              child: SvgPicture.asset(
                'assets/images/$glyph',
                width: 32,
                height: 32,
                colorFilter: active || done
                    ? null
                    : ColorFilter.mode(
                        dark ? FolkColors.darkMuted : const Color(0xFFB5B5B5),
                        BlendMode.srcIn,
                      ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _SegmentRing extends CustomPainter {
  const _SegmentRing({
    required this.completed,
    required this.color,
    required this.background,
  });

  final int completed;
  final Color color;
  final Color background;

  @override
  void paint(Canvas canvas, Size size) {
    final rect = Rect.fromLTWH(4, 4, size.width - 8, size.height - 8);
    const sector = math.pi * 2 / 3;
    const gap = .26;
    for (var index = 0; index < 3; index++) {
      canvas.drawArc(
        rect,
        -math.pi / 2 + index * sector + gap / 2,
        sector - gap,
        false,
        Paint()
          ..color = index < completed ? color : background
          ..style = PaintingStyle.stroke
          ..strokeWidth = 8,
      );
    }
  }

  @override
  bool shouldRepaint(_SegmentRing oldDelegate) =>
      completed != oldDelegate.completed ||
      color != oldDelegate.color ||
      background != oldDelegate.background;
}
