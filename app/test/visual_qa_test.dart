import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/services.dart';
import 'package:folk_app/main.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:folk_app/progress.dart';

void main() {
  testWidgets('снимок тёмных заданий', (tester) async {
    await (FontLoader('FolkRoboto')
          ..addFont(rootBundle.load('assets/fonts/roboto-regular.ttf'))
          ..addFont(rootBundle.load('assets/fonts/roboto-bold.ttf'))
          ..addFont(rootBundle.load('assets/fonts/roboto-black.ttf')))
        .load();
    await (FontLoader('MaterialIcons')
          ..addFont(rootBundle.load('assets/fonts/materialicons-regular.otf')))
        .load();
    tester.view.physicalSize = const Size(375, 812);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    SharedPreferences.setMockInitialValues({'dark_mode': true});
    final progress = await ProgressStore.load();
    await tester.pumpWidget(
      RepaintBoundary(child: FolkApp(progress: progress)),
    );
    await tester.tap(find.byIcon(Icons.backpack_rounded));
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
    await (FontLoader('FolkRoboto')
          ..addFont(rootBundle.load('assets/fonts/roboto-regular.ttf'))
          ..addFont(rootBundle.load('assets/fonts/roboto-bold.ttf'))
          ..addFont(rootBundle.load('assets/fonts/roboto-black.ttf')))
        .load();
    await (FontLoader('MaterialIcons')
          ..addFont(rootBundle.load('assets/fonts/materialicons-regular.otf')))
        .load();
    SharedPreferences.setMockInitialValues({'dark_mode': true});
    final progress = await ProgressStore.load();
    await tester.pumpWidget(
      RepaintBoundary(child: FolkApp(progress: progress)),
    );
    await tester.tap(find.byIcon(Icons.forum_rounded));
    await tester.pumpAndSettle();
    await expectLater(
      find.byType(RepaintBoundary).first,
      matchesGoldenFile('goldens/dark-news.png'),
    );
  });
}
