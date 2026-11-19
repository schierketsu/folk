"""Copy the course content from the original Flutter source into JSON."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "app" / "lib" / "data.dart"
TARGET = ROOT / "mobile" / "src" / "data" / "course.json"


def choice(question, options, correct, note):
    return {
        "kind": "choice",
        "question": question,
        "options": options,
        "correct": correct,
        "note": note,
    }


def arrange(question, options, answer, note):
    return {
        "kind": "arrange",
        "question": question,
        "options": options,
        "answer": answer,
        "note": note,
    }


def task(id, topic, title, fox_line, steps):
    return {
        "id": id,
        "topic": topic,
        "title": title,
        "foxLine": fox_line,
        "steps": steps,
    }


source = SOURCE.read_text(encoding="utf-8")
start = source.index("const tasks = <QuizTask>[") + len("const tasks = <QuizTask>[")
end = source.rfind("];", start, source.index("List<QuizTask> tasksForTopic"))
expression = "[" + source[start:end] + "]"
expression = expression.replace("QuizStep.choice(", "choice(")
expression = expression.replace("QuizStep.arrange(", "arrange(")
expression = expression.replace("QuizTask(", "task(")
tasks = eval(
    expression,
    {"__builtins__": {}},
    {"choice": choice, "arrange": arrange, "task": task},
)
assert len(tasks) == 12
assert sum(len(item["steps"]) for item in tasks) == 36
TARGET.parent.mkdir(parents=True, exist_ok=True)
TARGET.write_text(json.dumps(tasks, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Imported {len(tasks)} lessons and 36 questions into {TARGET}")
