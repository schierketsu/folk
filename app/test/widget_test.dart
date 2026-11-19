import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:folk_app/main.dart';
import 'package:folk_app/data.dart';
import 'package:folk_app/progress.dart';
import 'package:folk_app/ui.dart';
import 'package:shared_preferences/shared_preferences.dart';

Future<void> openFirstLesson(WidgetTester tester) async {
  await tester.tap(find.byKey(const Key('path-step-0-0')));
  await tester.pumpAndSettle();
  await tester.tap(find.text('Первое приветствие'));
  await tester.pumpAndSettle();
  await tester.tap(find.text('УЧИТЬСЯ · +15 ОПЫТА').last);
  await tester.pumpAndSettle();
}

void main() {
  test('в каждой теме ровно шесть этапов', () {
    expect(tasksForTopic(0), hasLength(6));
    expect(tasksForTopic(1), hasLength(6));
  });

  testWidgets('карточка этапа раскрывается и сдвигает путь вниз', (
    tester,
  ) async {
    SharedPreferences.setMockInitialValues({
      'language_selected': true,
      'completed': ['hello'],
    });
    final progress = await ProgressStore.load();
    await tester.pumpWidget(FolkApp(progress: progress));
    await tester.pumpAndSettle();

    final nextStep = find.byKey(const Key('path-step-0-2'));
    final before = tester.getTopLeft(nextStep).dy;
    expect(find.text('Знакомство с краем'), findsNothing);

    await tester.tap(find.byKey(const Key('path-step-0-1')));
    await tester.pumpAndSettle();
    expect(find.text('Знакомство с краем'), findsOneWidget);
    expect(find.text('УЧИТЬСЯ · +15 ОПЫТА'), findsOneWidget);
    expect(tester.getTopLeft(nextStep).dy, greaterThan(before));
  });

  testWidgets('иллюстрация места открывает место темы', (tester) async {
    SharedPreferences.setMockInitialValues({'language_selected': true});
    final progress = await ProgressStore.load();
    await tester.pumpWidget(FolkApp(progress: progress));
    await tester.pumpAndSettle();

    final placeImage = find.byWidgetPredicate(
      (widget) => widget is Image && widget.semanticLabel == 'Маньпупунёр',
    );
    await tester.tap(placeImage);
    await tester.pumpAndSettle();
    expect(find.text('Маньпупунёр'), findsOneWidget);
  });

  testWidgets('прохождение задания начисляет опыт и сохраняет ответ', (
    tester,
  ) async {
    SharedPreferences.setMockInitialValues({'language_selected': true});
    final progress = await ProgressStore.load();
    await tester.pumpWidget(FolkApp(progress: progress));

    await openFirstLesson(tester);
    await tester.tap(find.text('Чолӧм!').last);
    await tester.pump();
    await tester.tap(find.text('ПРОВЕРИТЬ'));
    await tester.pumpAndSettle();
    expect(find.text('Отлично!'), findsOneWidget);
    expect(progress.experience, 0);

    await tester.tap(find.text('ПРОДОЛЖИТЬ'));
    await tester.pumpAndSettle();
    await tester.ensureVisible(find.text('Видза'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Видза'));
    await tester.ensureVisible(find.text('олан!'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('олан!'));
    await tester.pump();
    await tester.tap(find.text('ПРОВЕРИТЬ'));
    await tester.pumpAndSettle();
    expect(find.text('Отлично!'), findsOneWidget);

    await tester.tap(find.text('ПРОДОЛЖИТЬ'));
    await tester.pumpAndSettle();
    await tester.ensureVisible(find.text('Привет!'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Привет!'));
    await tester.pump();
    await tester.tap(find.text('ПРОВЕРИТЬ'));
    await tester.pumpAndSettle();

    expect(find.text('Отлично!'), findsOneWidget);
    expect(progress.experience, 15);
    expect(progress.cranberries, 15);
    expect(progress.hearts, 5);
  });

  testWidgets('ошибка списывает сердце и позволяет повторить шаг', (
    tester,
  ) async {
    SharedPreferences.setMockInitialValues({'language_selected': true});
    final progress = await ProgressStore.load();
    await tester.pumpWidget(FolkApp(progress: progress));
    await openFirstLesson(tester);

    await tester.ensureVisible(find.text('Аттьӧ!'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Аттьӧ!'));
    await tester.pump();
    await tester.tap(find.text('ПРОВЕРИТЬ'));
    await tester.pumpAndSettle();

    expect(progress.hearts, 4);
    expect(find.text('Попробуйте ещё раз'), findsOneWidget);
    await tester.tap(find.text('ПОПРОБОВАТЬ СНОВА'));
    await tester.pumpAndSettle();
    expect(find.text('Попробуйте ещё раз'), findsNothing);
  });

  testWidgets('парное задание подключает демо-друга', (tester) async {
    SharedPreferences.setMockInitialValues({'language_selected': true});
    final progress = await ProgressStore.load();
    await tester.pumpWidget(FolkApp(progress: progress));
    await tester.tap(find.byKey(const Key('tab-1')));
    await tester.pumpAndSettle();
    expect(find.text('ЗАДАНИЯ ДНЯ'), findsNothing);
    expect(find.text('ТЕМЫ КУРСА'), findsNothing);

    await tester.ensureVisible(find.text('ПРИГЛАСИТЬ ДРУГА'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('ПРИГЛАСИТЬ ДРУГА'));
    await tester.pumpAndSettle();

    expect(find.text('ДРУГ ПОДКЛЮЧЁН'), findsOneWidget);
    expect(find.text('Демо-друг присоединился к заданию'), findsOneWidget);
  });

  testWidgets('иконка открывает пустой профиль и крестик закрывает его', (
    tester,
  ) async {
    SharedPreferences.setMockInitialValues({'language_selected': true});
    final progress = await ProgressStore.load();
    await tester.pumpWidget(FolkApp(progress: progress));

    expect(find.byType(StatPill), findsNWidgets(2));
    expect(find.byKey(const Key('tab-4')), findsNothing);
    await tester.tap(find.byKey(const Key('home-profile')));
    await tester.pumpAndSettle();
    expect(find.text('Профиль'), findsOneWidget);
    expect(find.byTooltip('Закрыть профиль'), findsOneWidget);
    final profileContext = tester.element(find.text('Профиль'));
    expect(
      tester.getCenter(find.text('Профиль')).dx,
      closeTo(MediaQuery.sizeOf(profileContext).width / 2, 1),
    );
    expect(find.text('Курс · Коми'), findsNothing);
    expect(find.text('НАСТРОЙКИ'), findsNothing);

    await tester.tap(find.byTooltip('Закрыть профиль'));
    await tester.pumpAndSettle();
    expect(find.byKey(const Key('home-profile')), findsOneWidget);
    expect(find.text('Профиль'), findsNothing);
  });

  testWidgets('тёмная тема сохраняется', (tester) async {
    SharedPreferences.setMockInitialValues({'language_selected': true});
    final progress = await ProgressStore.load();
    await progress.setDarkMode(true);
    await tester.pumpWidget(FolkApp(progress: progress));
    expect(progress.darkMode, isTrue);
    expect(
      tester.widget<MaterialApp>(find.byType(MaterialApp)).themeMode,
      ThemeMode.dark,
    );
    expect((await ProgressStore.load()).darkMode, isTrue);
  });
}
