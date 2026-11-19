import 'package:flutter/material.dart';

import 'progress.dart';
import 'ui.dart';

class LanguagePage extends StatefulWidget {
  const LanguagePage({super.key, required this.progress});

  final ProgressStore progress;

  @override
  State<LanguagePage> createState() => _LanguagePageState();
}

class _LanguagePageState extends State<LanguagePage> {
  bool showIntro = false;

  @override
  Widget build(BuildContext context) {
    if (showIntro) {
      return _IntroPhrasePage(onDone: widget.progress.selectLanguage);
    }
    return Scaffold(
    body: SafeArea(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(16, 22, 16, 24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Icon(Icons.chevron_left_rounded, color: FolkColors.muted),
            const SizedBox(height: 27),
            Row(
              children: [
                Image.asset(
                  'assets/images/mascot-explaining.png',
                  width: 132,
                  height: 116,
                  fit: BoxFit.contain,
                ),
                const SizedBox(width: 7),
                Expanded(
                  child: FolkCard(
                    padding: const EdgeInsets.fromLTRB(18, 14, 14, 14),
                    child: Row(
                      children: [
                        const Icon(Icons.volume_up_rounded, color: FolkColors.blue, size: 21),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Text(
                            'Какой язык\nбудем\nизучать?',
                            style: Theme.of(context).textTheme.titleLarge,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 17),
            FolkCard(
              color: FolkColors.blueLight,
              border: const Color(0xFF84D8FF),
              padding: const EdgeInsets.fromLTRB(16, 12, 14, 12),
              child: Row(
                children: [
                  const KomiFlag(),
                  const SizedBox(width: 15),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Коми', style: TextStyle(color: FolkColors.blue, fontSize: 17, fontWeight: FontWeight.w800)),
                        Text('Коми кыв', style: TextStyle(color: FolkColors.blue, fontWeight: FontWeight.w700)),
                      ],
                    ),
                  ),
                  const Icon(Icons.chevron_right_rounded, color: FolkColors.muted),
                ],
              ),
            ),
            const SizedBox(height: 12),
            Opacity(
              opacity: .55,
              child: FolkCard(
                color: FolkColors.light,
                padding: const EdgeInsets.fromLTRB(16, 11, 14, 11),
                child: Row(
                  children: [
                    Container(
                      width: 45,
                      height: 34,
                      alignment: Alignment.center,
                      decoration: BoxDecoration(color: FolkColors.line, borderRadius: BorderRadius.circular(8)),
                      child: const Icon(Icons.add_rounded, color: FolkColors.muted),
                    ),
                    const SizedBox(width: 15),
                    const Expanded(child: Text('Новые языки', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700))),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(color: FolkColors.line, borderRadius: BorderRadius.circular(12)),
                      child: const Text('СКОРО', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w900)),
                    ),
                  ],
                ),
              ),
            ),
            const Spacer(),
            FolkButton(
              text: 'Продолжить',
              onPressed: () => setState(() => showIntro = true),
            ),
          ],
        ),
      ),
    ),
    );
  }
}

class _IntroPhrasePage extends StatefulWidget {
  const _IntroPhrasePage({required this.onDone});

  final Future<void> Function() onDone;

  @override
  State<_IntroPhrasePage> createState() => _IntroPhrasePageState();
}

class _IntroPhrasePageState extends State<_IntroPhrasePage> {
  static const answer = ['Я', 'изучаю', 'коми', 'язык'];
  static const bank = ['читаю', 'дом', 'изучаю', 'Я', 'коми', 'язык'];
  final selected = <String>[];
  bool checked = false;

  bool get correct => selected.join(' ') == answer.join(' ');

  @override
  Widget build(BuildContext context) => Scaffold(
    body: SafeArea(
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 14, 16, 10),
            child: Row(
              children: [
                const Icon(Icons.close_rounded, color: FolkColors.muted),
                const SizedBox(width: 14),
                Expanded(
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(9),
                    child: const LinearProgressIndicator(
                      value: .7,
                      minHeight: 13,
                      backgroundColor: FolkColors.line,
                      valueColor: AlwaysStoppedAnimation(FolkColors.green),
                    ),
                  ),
                ),
                const SizedBox(width: 13),
                const StatPill(asset: 'heart.png', value: '5', color: FolkColors.red),
              ],
            ),
          ),
          Expanded(
            child: ListView(
              padding: const EdgeInsets.fromLTRB(20, 12, 20, 18),
              children: [
                Text('Переведите предложение', style: Theme.of(context).textTheme.headlineLarge),
                const SizedBox(height: 28),
                const MascotBubble(text: 'Ме велӧда коми кыв.'),
                const SizedBox(height: 24),
                Container(
                  constraints: const BoxConstraints(minHeight: 150),
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: FolkColors.light,
                    border: Border.all(color: FolkColors.line, width: 2),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Wrap(
                    spacing: 9,
                    runSpacing: 9,
                    children: selected
                        .map(
                          (word) => _WordChip(
                            word: word,
                            onTap: checked
                                ? null
                                : () => setState(() => selected.remove(word)),
                          ),
                        )
                        .toList(),
                  ),
                ),
                const SizedBox(height: 25),
                Wrap(
                  spacing: 9,
                  runSpacing: 9,
                  children: bank
                      .map(
                        (word) => _WordChip(
                          word: selected.contains(word) ? '' : word,
                          onTap: checked || selected.contains(word)
                              ? null
                              : () => setState(() => selected.add(word)),
                        ),
                      )
                      .toList(),
                ),
              ],
            ),
          ),
          if (checked)
            Container(
              width: double.infinity,
              color: correct ? FolkColors.greenLight : const Color(0xFFFFDFE0),
              padding: const EdgeInsets.fromLTRB(20, 15, 20, 10),
              child: Text(
                correct ? '✓  Отлично!' : '✕  Правильный ответ:\nЯ изучаю коми язык',
                style: Theme.of(context).textTheme.titleLarge!.copyWith(
                  color: correct ? FolkColors.greenDark : FolkColors.red,
                ),
              ),
            ),
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 10, 20, 18),
            child: FolkButton(
              text: checked ? 'Продолжить' : 'Проверить',
              color: checked && !correct ? FolkColors.red : FolkColors.green,
              shadow: checked && !correct ? const Color(0xFFEA2B2B) : FolkColors.greenDark,
              onPressed: selected.isEmpty
                  ? null
                  : () async {
                      if (!checked) {
                        setState(() => checked = true);
                      } else if (correct) {
                        await widget.onDone();
                      } else {
                        setState(() {
                          checked = false;
                          selected.clear();
                        });
                      }
                    },
            ),
          ),
        ],
      ),
    ),
  );
}

class _WordChip extends StatelessWidget {
  const _WordChip({required this.word, required this.onTap});

  final String word;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final width = (word.length * 10.5 + 34).clamp(76.0, 168.0);
    return SizedBox(
      width: width,
      height: 48,
      child: Material(
        color: word.isEmpty ? FolkColors.line : Colors.white,
        borderRadius: BorderRadius.circular(11),
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(11),
          child: Container(
            alignment: Alignment.center,
            padding: const EdgeInsets.symmetric(horizontal: 13),
            decoration: BoxDecoration(
              border: Border.all(color: FolkColors.line, width: 2),
              borderRadius: BorderRadius.circular(11),
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
    );
  }
}
