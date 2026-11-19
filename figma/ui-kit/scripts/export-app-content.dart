import 'dart:convert';
import '../../../app/lib/data.dart';

void main() {
  print(jsonEncode({
    'topics': [
      for (final topic in topics)
        {
          'title': topic.title,
          'place': topic.place,
          'prompt': topic.prompt,
          'cardImage': topic.cardImage.split('/').last,
          'mapImage': topic.mapImage.split('/').last,
        }
    ],
    'tasks': [
      for (final task in tasks)
        {
          'id': task.id,
          'topic': task.topic,
          'title': task.title,
          'foxLine': task.foxLine,
          'words': [for (final pair in task.words) [pair.$1, pair.$2]],
          'steps': [
            for (final step in task.steps)
              {
                'kind': step.kind == QuizKind.choice ? 'choice' : 'arrange',
                'question': step.question,
                'options': step.options,
                'answer': step.answer,
                'correct': step.correct,
                'note': step.note,
                'image': step.image?.split('/').last,
              }
          ],
        }
    ],
  }));
}
