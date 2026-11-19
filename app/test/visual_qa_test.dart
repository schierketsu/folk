import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/services.dart';
import 'package:folk_app/main.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:folk_app/progress.dart';

Future<void> _loadFonts() async {
  await (FontLoader('FolkNunito')
        ..addFont(rootBundle.load('assets/fonts/nunito-regular.ttf'))
        ..addFont(rootBundle.load('assets/fonts/nunito-bold.ttf'))
        ..addFont(rootBundle.load('assets/fonts/nunito-extrabold.ttf'))
        ..addFont(rootBundle.load('assets/fonts/nunito-black.ttf')))
      .load();
  await (FontLoader(
    'MaterialIcons',
  )..addFont(rootBundle.load('assets/fonts/materialicons-regular.otf'))).load();
}

void main() {
  testWidgets('снимок выбора языка с флагом', (tester) async {
    await _loadFonts();
    tester.view.physicalSize = const Size(375, 812);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    SharedPreferences.setMockInitialValues({});
    final progress = await ProgressStore.load();
    await tester.pumpWidget(
      RepaintBoundary(child: FolkApp(progress: progress)),
    );
    await tester.pumpAndSettle();
    await expectLater(
      find.byType(RepaintBoundary).first,
      matchesGoldenFile('goldens/light-language.png'),
    );
  });

  testWidgets('снимок адаптивной сборки фразы', (tester) async {
    await _loadFonts();
    tester.view.physicalSize = const Size(375, 812);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    SharedPreferences.setMockInitialValues({});
    final progress = await ProgressStore.load();
    await tester.pumpWidget(
      RepaintBoundary(child: FolkApp(progress: progress)),
    );
    await tester.tap(find.text('ПРОДОЛЖИТЬ'));
    await tester.pumpAndSettle();
    for (final word in ['Я', 'изучаю', 'коми', 'язык']) {
      await tester.tap(find.text(word).last);
      await tester.pump();
    }
    await expectLater(
      find.byType(RepaintBoundary).first,
      matchesGoldenFile('goldens/light-phrase.png'),
    );
  });

  testWidgets('снимок начала маршрута из шести этапов', (tester) async {
    await _loadFonts();
    tester.view.physicalSize = const Size(375, 812);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    SharedPreferences.setMockInitialValues({'language_selected': true});
    final progress = await ProgressStore.load();
    await tester.pumpWidget(
      RepaintBoundary(child: FolkApp(progress: progress)),
    );
    await tester.runAsync(() async {
      final context = tester.element(find.byType(FolkApp));
      for (final asset in [
        'assets/images/place-manpupuner-map.png',
        'assets/images/cranberry.png',
        'assets/images/fire.png',
      ]) {
        await precacheImage(AssetImage(asset), context);
      }
    });
    await tester.pumpAndSettle();
    await expectLater(
      find.byType(RepaintBoundary).first,
      matchesGoldenFile('goldens/light-path.png'),
    );
  });

  testWidgets('снимок тёмных заданий', (tester) async {
    await _loadFonts();
    tester.view.physicalSize = const Size(375, 812);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    SharedPreferences.setMockInitialValues({
      'dark_mode': true,
      'language_selected': true,
    });
    final progress = await ProgressStore.load();
    await tester.pumpWidget(
      RepaintBoundary(child: FolkApp(progress: progress)),
    );
    await tester.tap(find.byKey(const Key('tab-1')));
    await tester.pumpAndSettle();
    await expectLater(
      find.byType(RepaintBoundary).first,
      matchesGoldenFile('goldens/dark-tasks.png'),
    );
  });

  testWidgets('снимок тёмной ленты', (tester) async {
    tester.view.physicalSize = const Size(375, 812);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    await _loadFonts();
    SharedPreferences.setMockInitialValues({
      'dark_mode': true,
      'language_selected': true,
    });
    final progress = await ProgressStore.load();
    await tester.pumpWidget(
      RepaintBoundary(child: FolkApp(progress: progress)),
    );
    await tester.tap(find.byKey(const Key('tab-3')));
    await tester.pumpAndSettle();
    await expectLater(
      find.byType(RepaintBoundary).first,
      matchesGoldenFile('goldens/dark-news.png'),
    );
  });
}
