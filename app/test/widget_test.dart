import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:folk_app/main.dart';
import 'package:folk_app/progress.dart';
import 'package:folk_app/ui.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  testWidgets('прохождение задания начисляет опыт и сохраняет ответ', (
    tester,
  ) async {
    SharedPreferences.setMockInitialValues({});
    final progress = await ProgressStore.load();
    await tester.pumpWidget(FolkApp(progress: progress));

    await tester.tap(find.byIcon(Icons.backpack_rounded));
    await tester.pumpAndSettle();
    await tester.ensureVisible(find.text('Первое приветствие').first);
    await tester.pumpAndSettle();
    await tester.tap(find.text('Первое приветствие').first);
    await tester.pumpAndSettle();
    await tester.tap(find.text('Чолӧм!').last);
    await tester.pump();
    await tester.tap(find.text('ПРОВЕРИТЬ'));
    await tester.pumpAndSettle();

    expect(find.text('Отлично!'), findsOneWidget);
    expect(progress.experience, 15);
    expect(progress.cranberries, 15);
    expect(progress.hearts, 5);
  });

  testWidgets('тёмная тема переключается и сохраняется', (tester) async {
    SharedPreferences.setMockInitialValues({});
    final progress = await ProgressStore.load();
    await tester.pumpWidget(FolkApp(progress: progress));
    await tester.tap(
      find.descendant(
        of: find.byType(FolkBottomBar),
        matching: find.byIcon(Icons.person_rounded),
      ),
    );
    await tester.pumpAndSettle();
    await tester.ensureVisible(find.byType(SwitchListTile));
    await tester.tap(find.byType(SwitchListTile));
    await tester.pumpAndSettle();

    expect(progress.darkMode, isTrue);
    expect(
      tester.widget<MaterialApp>(find.byType(MaterialApp)).themeMode,
      ThemeMode.dark,
    );
    expect((await ProgressStore.load()).darkMode, isTrue);
  });
}
