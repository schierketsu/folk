import 'package:flutter/material.dart';

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
      height: 540,
      child: LayoutBuilder(
        builder: (context, box) => Stack(
          clipBehavior: Clip.hardEdge,
          children: [
            Positioned(
              left: box.maxWidth / 2 - 44,
              top: 0,
              child: _StepNode(
                icon: Icons.star_rounded,
                color: accent,
                edge: edge,
                active: true,
                fraction: progress.doneInTopic(topic) / lessons.length,
                dark: dark,
                onTap: () => onTask(active),
              ),
            ),
            Positioned(
              left: box.maxWidth / 2 - 9,
              top: 101,
              child: Transform.rotate(
                angle: .785398,
                child: Container(width: 18, height: 18, color: accent),
              ),
            ),
            Positioned(
              left: 4,
              right: 4,
              top: 110,
              child: InkWell(
                onTap: () => onTask(active),
                borderRadius: BorderRadius.circular(18),
                child: Container(
                  padding: const EdgeInsets.fromLTRB(16, 16, 16, 14),
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
                      const SizedBox(height: 5),
                      Text(
                        'Урок ${lessons.indexOf(active) + 1} из ${lessons.length} · ${active.title.toLowerCase()}',
                        style: const TextStyle(color: Colors.white),
                      ),
                      const SizedBox(height: 13),
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
                            fontWeight: FontWeight.w900,
                            letterSpacing: .5,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            Positioned(
              left: box.maxWidth * .12,
              top: 280,
              child: _StepNode(
                icon: Icons.star_rounded,
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
                        width: 112, height: 94, fit: BoxFit.contain),
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
              left: box.maxWidth * .39,
              top: 386,
              child: InkWell(
                onTap: onPester,
                child: Image.asset(
                  progress.chestOpened(topic)
                      ? 'assets/images/chest-open.png'
                      : 'assets/images/chest-closed.png',
                  width: 98,
                  height: 98,
                  fit: BoxFit.contain,
                ),
              ),
            ),
            Positioned(
              right: 8,
              top: 460,
              child: _StepNode(
                icon: Icons.menu_book_rounded,
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
    required this.icon,
    required this.color,
    required this.edge,
    required this.onTap,
    this.active = false,
    this.done = false,
    this.dark = false,
    this.fraction = 0,
  });
  final IconData icon;
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
        width: 88,
        height: 88,
        child: Stack(
          alignment: Alignment.center,
          children: [
            if (active)
              SizedBox(
                width: 88,
                height: 88,
                child: CircularProgressIndicator(
                  value: fraction,
                  strokeWidth: 4,
                  color: color,
                  backgroundColor:
                      dark ? FolkColors.darkLine : FolkColors.line,
                ),
              ),
            Positioned(
              top: 17,
              child: Container(
                width: 68,
                height: 63,
                decoration: BoxDecoration(color: rim, shape: BoxShape.circle),
              ),
            ),
            Positioned(
              top: 9,
              child: ClipOval(
                child: Container(
                  width: 68,
                  height: 63,
                  color: face,
                  child: Stack(
                    children: [
                      Positioned(
                        left: -14,
                        top: -18,
                        child: Transform.rotate(
                          angle: -.75,
                          child: Container(
                            width: 30,
                            height: 110,
                            color: Colors.white.withValues(alpha: .18),
                          ),
                        ),
                      ),
                      Center(child: Icon(
                        done ? Icons.check_rounded : icon,
                        size: 31,
                        color: active || done
                            ? Colors.white
                            : dark ? FolkColors.darkMuted
                                : const Color(0xFFAFBFC4),
                      )),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
