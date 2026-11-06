import 'package:flutter/material.dart';

import 'progress.dart';
import 'feed.dart';
import 'screens.dart';
import 'ui.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final progress = await ProgressStore.load();
  runApp(FolkApp(progress: progress));
}

class FolkApp extends StatelessWidget {
  const FolkApp({super.key, required this.progress});
  final ProgressStore progress;

  @override
  Widget build(BuildContext context) => AnimatedBuilder(
    animation: progress,
    builder: (context, _) => MaterialApp(
      title: 'ФОЛК',
      debugShowCheckedModeBanner: false,
      theme: _theme(false),
      darkTheme: _theme(true),
      themeMode: progress.darkMode ? ThemeMode.dark : ThemeMode.light,
      home: AppShell(progress: progress),
    ),
  );

  ThemeData _theme(bool dark) {
    final ink = dark ? FolkColors.darkText : FolkColors.ink;
    final muted = dark ? FolkColors.darkMuted : FolkColors.muted;
    return ThemeData(
      useMaterial3: true,
      brightness: dark ? Brightness.dark : Brightness.light,
      scaffoldBackgroundColor: dark ? FolkColors.darkBg : Colors.white,
      colorScheme: ColorScheme.fromSeed(
        seedColor: FolkColors.green,
        brightness: dark ? Brightness.dark : Brightness.light,
        surface: dark ? FolkColors.darkBg : Colors.white,
      ),
      fontFamily: 'FolkRoboto',
      textTheme: TextTheme(
        headlineLarge: TextStyle(
          fontSize: 27,
          height: 1.16,
          fontWeight: FontWeight.w900,
          color: ink,
        ),
        headlineMedium: TextStyle(
          fontSize: 22,
          height: 1.2,
          fontWeight: FontWeight.w900,
          color: ink,
        ),
        titleLarge: TextStyle(
          fontSize: 19,
          fontWeight: FontWeight.w800,
          color: ink,
        ),
        titleMedium: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w800,
          color: ink,
        ),
        bodyLarge: TextStyle(fontSize: 16, height: 1.4, color: ink),
        bodyMedium: TextStyle(fontSize: 14, height: 1.35, color: muted),
        labelLarge: TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w900,
          letterSpacing: .5,
        ),
      ),
    );
  }
}

class AppShell extends StatefulWidget {
  const AppShell({super.key, required this.progress});
  final ProgressStore progress;

  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
  int index = 0;

  @override
  Widget build(BuildContext context) => AnimatedBuilder(
    animation: widget.progress,
    builder: (context, _) => Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: IndexedStack(
                index: index,
                children: [
                  HomePage(progress: widget.progress),
                  TasksPage(progress: widget.progress),
                  RankingPage(progress: widget.progress),
                  ActivityFeedPage(progress: widget.progress),
                  ProfilePage(progress: widget.progress),
                ],
              ),
            ),
            FolkBottomBar(
              index: index,
              onTap: (value) => setState(() => index = value),
            ),
          ],
        ),
      ),
    ),
  );
}
