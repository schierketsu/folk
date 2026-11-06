import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'data.dart';

class ProgressStore extends ChangeNotifier {
  ProgressStore._(this._prefs) {
    completed.addAll(_prefs.getStringList('completed') ?? const []);
    openedChests.addAll(
      _prefs.getStringList('opened_chests')?.map(int.parse) ?? const <int>[],
    );
    hearts = _prefs.getInt('hearts') ?? 5;
    darkMode = _prefs.getBool('dark_mode') ?? false;
  }

  final SharedPreferences _prefs;
  final Set<String> completed = {};
  final Set<int> openedChests = {};
  int hearts = 5;
  bool darkMode = false;

  Future<void> setDarkMode(bool enabled) async {
    darkMode = enabled;
    notifyListeners();
    await _prefs.setBool('dark_mode', enabled);
  }

  static Future<ProgressStore> load() async =>
      ProgressStore._(await SharedPreferences.getInstance());

  int get experience => completed.length * 15;
  int get cranberries => completed.length * 15 + openedChests.length * 50;
  int get fire => completed.length;
  bool isDone(String taskId) => completed.contains(taskId);
  int doneInTopic(int topic) =>
      tasksForTopic(topic).where((task) => isDone(task.id)).length;
  bool chestReady(int topic) =>
      doneInTopic(topic) == tasksForTopic(topic).length;
  bool chestOpened(int topic) => openedChests.contains(topic);

  Future<bool> complete(QuizTask task) async {
    final fresh = completed.add(task.id);
    if (fresh) {
      notifyListeners();
      await _prefs.setStringList('completed', completed.toList());
    }
    return fresh;
  }

  Future<void> loseHeart() async {
    if (hearts > 0) hearts--;
    notifyListeners();
    await _prefs.setInt('hearts', hearts);
  }

  Future<void> openChest(int topic) async {
    if (!chestReady(topic) || !openedChests.add(topic)) return;
    notifyListeners();
    await _prefs.setStringList(
      'opened_chests',
      openedChests.map((index) => '$index').toList(),
    );
  }

  Future<void> reset() async {
    completed.clear();
    openedChests.clear();
    hearts = 5;
    notifyListeners();
    await _prefs.remove('completed');
    await _prefs.remove('opened_chests');
    await _prefs.remove('hearts');
  }
}
