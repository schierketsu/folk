import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { Button } from '../../components/UI';
import { lessons } from '../../data/course';
import { useProgress } from '../../state/ProgressContext';
import { c, font, topicPalettes } from '../../theme';

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = lessons.find(item => item.id === id);
  const { progress, complete, loseHeart, resetHearts } = useProgress();
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  if (!lesson) return <SafeAreaView><Text>Урок не найден</Text></SafeAreaView>;

  const palette = topicPalettes[lesson.topic];
  const step = lesson.steps[stepIndex];
  const response = selected.map(index => step.options[index]);
  const foxSpeech = stepIndex === 0 ? `${lesson.foxLine} ${step.question}` : step.question;

  const evaluate = () => {
    const success = step.kind === 'choice'
      ? selected[0] === step.correct
      : JSON.stringify(response) === JSON.stringify(step.answer);
    setCorrect(success);
    setChecked(true);
    if (!success) loseHeart();
  };

  const next = () => {
    if (!correct) {
      if (progress.hearts <= 0) resetHearts();
      setSelected([]);
      setChecked(false);
      return;
    }
    if (stepIndex + 1 < lesson.steps.length) {
      setStepIndex(stepIndex + 1);
      setSelected([]);
      setChecked(false);
    } else {
      complete(lesson.id);
      router.replace({ pathname: '/result/[id]', params: { id: lesson.id } });
    }
  };

  const choose = (index: number) => {
    if (checked) return;
    if (step.kind === 'choice') setSelected([index]);
    else setSelected(old => old.includes(index) ? old.filter(item => item !== index) : [...old, index]);
  };

  return <SafeAreaView style={styles.page}>
    <View style={styles.header}>
      <Pressable accessibilityRole="button" accessibilityLabel="Закрыть урок" onPress={() => router.back()} hitSlop={12} style={styles.closeButton}><Text style={styles.close}>×</Text></Pressable>
      <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${stepIndex / lesson.steps.length * 100}%`, backgroundColor: palette.primary }]} /></View>
      <Image source={images.heart} style={styles.heart} resizeMode="contain" />
      <Text style={styles.heartCount}>{progress.hearts}</Text>
    </View>

    <ScrollView contentContainerStyle={styles.body}>
      <View style={styles.character}>
        <Image source={images.fox} style={styles.fox} resizeMode="contain" />
        <View style={styles.speech}><Text style={styles.speechText}>{foxSpeech}</Text></View>
      </View>

      {step.kind === 'arrange' && <View style={styles.answer}>
        {response.map((word, index) => <Text key={`${word}-${index}`} style={styles.word}>{word}</Text>)}
      </View>}

      <View style={styles.options}>
        {step.options.map((option, index) => {
          const active = selected.includes(index);
          return <Pressable
            key={`${option}-${index}`}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={() => choose(index)}
            style={[styles.option, active && !checked && { borderColor: palette.shadow, backgroundColor: palette.soft }, checked && active && (correct ? { borderColor: palette.shadow, backgroundColor: palette.soft } : styles.wrong)]}
          ><Text style={styles.optionText}>{option}</Text></Pressable>;
        })}
      </View>
    </ScrollView>

    {checked && <View style={[styles.feedback, { backgroundColor: correct ? palette.soft : '#FFE7E9' }]}>
      <Text style={[styles.feedbackTitle, { color: correct ? palette.ink : '#D54B57' }]}>{correct ? 'Отлично!' : 'Попробуйте ещё раз'}</Text>
      <Text style={styles.feedbackNote}>{step.note}</Text>
    </View>}
    <View style={styles.footer}><Button title={checked ? correct ? 'ПРОДОЛЖИТЬ' : 'ЕЩЁ РАЗ' : 'ПРОВЕРИТЬ'} onPress={checked ? next : evaluate} disabled={!checked && selected.length === 0} color={checked && !correct ? '#E95465' : palette.primary} shadowColor={checked && !correct ? '#C43D4C' : palette.shadow} textColor={checked && !correct ? 'white' : palette.ink} /></View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: 'white' },
  header: { height: 60, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', gap: 12 },
  closeButton: { width: 32, alignItems: 'center', justifyContent: 'center' },
  close: { fontFamily: font.regular, color: c.grayDark, fontSize: 37, lineHeight: 43 },
  progressTrack: { flex: 1, height: 14, borderRadius: 7, backgroundColor: c.gray, overflow: 'hidden' },
  progressFill: { height: 14, borderRadius: 7 },
  heart: { width: 27, height: 27 },
  heartCount: { fontFamily: font.black, fontSize: 17, color: '#E94863' },
  body: { paddingHorizontal: 21, paddingTop: 42, paddingBottom: 24, flexGrow: 1 },
  character: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 30 },
  fox: { width: 85, height: 102 },
  speech: { flex: 1, minHeight: 75, justifyContent: 'center', borderRadius: 17, borderWidth: 2, borderColor: c.gray, paddingHorizontal: 14, paddingVertical: 11 },
  speechText: { fontFamily: font.regular, fontSize: 17, lineHeight: 23, color: c.text },
  answer: { minHeight: 70, borderBottomWidth: 2, borderBottomColor: c.gray, flexDirection: 'row', gap: 7, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' },
  word: { fontFamily: font.bold, color: c.text, padding: 8, borderRadius: 8, backgroundColor: '#DDF6D4' },
  options: { gap: 10 },
  option: { borderWidth: 2, borderBottomWidth: 4, borderColor: c.gray, borderRadius: 15, paddingHorizontal: 15, paddingVertical: 15, minHeight: 58, justifyContent: 'center' },
  wrong: { borderColor: '#E95465', backgroundColor: '#FFE7E9' },
  optionText: { fontFamily: font.bold, fontSize: 17, color: c.text },
  feedback: { paddingHorizontal: 22, paddingVertical: 12 },
  feedbackTitle: { fontFamily: font.black, fontSize: 18 },
  feedbackNote: { fontFamily: font.regular, fontSize: 15, color: c.text },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#F4F4F4' },
});
