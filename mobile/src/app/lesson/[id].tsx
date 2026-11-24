import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { Button } from '../../components/UI';
import { SpeakerIcon, WordIllustration } from '../../components/WordIllustration';
import { lessons } from '../../data/course';
import { useProgress } from '../../state/ProgressContext';
import { c, font, topicPalettes } from '../../theme';

const totalSteps = 6;
const answerOrder = [2, 0, 1];

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = lessons.find(item => item.id === id);
  const { progress, complete, loseHeart, resetHearts } = useProgress();
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [left, setLeft] = useState<number | null>(null);
  const [right, setRight] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [audioNotice, setAudioNotice] = useState(false);

  if (!lesson) return <SafeAreaView style={styles.page}><Text>Урок не найден</Text></SafeAreaView>;
  const palette = topicPalettes[lesson.topic];
  const words = lesson.words;
  const extraPicture = lessons.find(item => item.id !== lesson.id)?.words[0] ?? words[0];
  const pictureWords = [...words, extraPicture];
  const phrase = lesson.phrase;
  const bank = [phrase.tokens[1], phrase.distractor, phrase.tokens[0]];
  const response = selected.map(index => bank[index]);

  const fail = () => {
    setCorrect(false);
    setChecked(true);
    setMistakes(value => value + 1);
    loseHeart();
  };
  const evaluate = () => {
    const success = stepIndex === 1 ? selected[0] === 0
      : stepIndex === 2 ? selected[0] === 1
      : stepIndex === 3 ? JSON.stringify(response) === JSON.stringify(phrase.tokens)
      : selected[0] === 2;
    if (success) { setCorrect(true); setChecked(true); }
    else fail();
  };
  const next = () => {
    if (checked && !correct) {
      if (progress.hearts <= 0) resetHearts();
      setSelected([]);
      setLeft(null);
      setRight(null);
      setChecked(false);
      return;
    }
    if (stepIndex + 1 === totalSteps) {
      const first = !progress.completed.includes(lesson.id);
      complete(lesson.id);
      router.replace({ pathname: '/result/[id]', params: { id: lesson.id, mistakes: String(mistakes), first: first ? '1' : '0' } });
      return;
    }
    setStepIndex(value => value + 1);
    setSelected([]);
    setMatched([]);
    setLeft(null);
    setRight(null);
    setChecked(false);
    setAudioNotice(false);
  };
  const chooseMatch = (side: 'left' | 'right', index: number) => {
    if (checked || matched.includes(index)) return;
    const nextLeft = side === 'left' ? index : left;
    const nextRight = side === 'right' ? index : right;
    if (nextLeft !== null && nextRight !== null) {
      setLeft(null);
      setRight(null);
      if (nextLeft === nextRight) {
        const updated = [...matched, nextLeft];
        setMatched(updated);
        if (updated.length === words.length) { setCorrect(true); setChecked(true); }
      } else fail();
    } else {
      setLeft(nextLeft);
      setRight(nextRight);
    }
  };

  const title = ['Новые слова', 'Выберите картинку', 'Что значит слово?', 'Соберите фразу', 'Найдите пары', 'Выберите слово'][stepIndex];
  const note = stepIndex === 1 ? `${words[0].komi} — ${words[0].russian}`
    : stepIndex === 2 ? `${words[1].komi} — ${words[1].russian}`
    : stepIndex === 3 ? `${phrase.komi} — ${phrase.russian}`
    : stepIndex === 4 ? 'Соедините коми слова с их значениями.'
    : `${words[2].komi} — ${words[2].russian}`;

  return <SafeAreaView style={styles.page}>
    <View style={styles.header}>
      <Pressable accessibilityRole="button" accessibilityLabel="Закрыть урок" onPress={() => router.back()} hitSlop={12} style={styles.closeButton}><Text style={styles.close}>×</Text></Pressable>
      <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${stepIndex / totalSteps * 100}%`, backgroundColor: palette.primary }]} /></View>
      <Image source={images.heart} style={styles.heart} resizeMode="contain" />
      <Text style={styles.heartCount}>{progress.hearts}</Text>
    </View>

    <ScrollView contentContainerStyle={styles.body}>
      <Text style={styles.kicker}>{stepIndex === 0 ? 'УРОК · КОМИ ЯЗЫК' : `ЗАДАНИЕ ${stepIndex} ИЗ ${totalSteps - 1}`}</Text>
      <Text style={styles.title}>{title}</Text>
      {stepIndex === 0 ? <>
        <View style={styles.foxIntro}><Image source={images.fox} style={styles.fox} resizeMode="contain" /><Text style={styles.introText}>Познакомьтесь со словами. Затем вы найдёте их на картинках и соберёте фразу.</Text></View>
        {words.map((word, index) => <View key={index} style={styles.wordCard}>
          <View style={[styles.artCircle, { backgroundColor: palette.soft }]}><WordIllustration art={word.art} size={48} /></View>
          <View style={styles.wordCopy}><Text style={styles.komi}>{word.komi}</Text><Text style={styles.russian}>{word.russian}</Text></View>
          <Pressable accessibilityRole="button" accessibilityLabel={`Озвучить ${word.komi}`} onPress={() => setAudioNotice(true)} style={styles.audioButton}><SpeakerIcon /></Pressable>
        </View>)}
      </> : null}

      {stepIndex === 1 && <>
        <View style={styles.promptRow}><Text style={styles.promptWord}>{words[0].komi}</Text><Pressable accessibilityRole="button" accessibilityLabel="Озвучить слово" onPress={() => setAudioNotice(true)} style={styles.audioButton}><SpeakerIcon /></Pressable></View>
        <Text style={styles.helper}>Найдите изображение, которое подходит к слову.</Text>
        <View style={styles.pictureGrid}>{pictureWords.map((word, index) => <Pressable key={index} accessibilityRole="button" accessibilityState={{ selected: selected[0] === index }} onPress={() => !checked && setSelected([index])} style={[styles.pictureCard, selected[0] === index && { borderColor: palette.shadow, backgroundColor: palette.soft }]}>
          <WordIllustration art={word.art} size={72} /><Text style={styles.pictureLabel}>{word.russian}</Text>
        </Pressable>)}</View>
      </>}

      {stepIndex === 2 && <>
        <View style={styles.promptRow}><Text style={styles.promptWord}>{words[1].komi}</Text><Pressable accessibilityRole="button" accessibilityLabel="Озвучить слово" onPress={() => setAudioNotice(true)} style={styles.audioButton}><SpeakerIcon /></Pressable></View>
        <View style={styles.options}>{words.map((word, index) => <Pressable key={index} accessibilityRole="button" accessibilityState={{ selected: selected[0] === index }} onPress={() => !checked && setSelected([index])} style={[styles.option, selected[0] === index && { borderColor: palette.shadow, backgroundColor: palette.soft }]}><Text style={styles.optionText}>{word.russian}</Text></Pressable>)}</View>
      </>}

      {stepIndex === 3 && <>
        <Text style={styles.helper}>Переведите на коми:</Text><Text style={styles.phrasePrompt}>{phrase.russian}</Text>
        <View style={styles.answerArea}>{response.length ? selected.map((bankIndex, index) => <Pressable key={index} accessibilityRole="button" accessibilityLabel={`Убрать ${bank[bankIndex]}`} onPress={() => !checked && setSelected(old => old.filter((_, position) => position !== index))} style={[styles.chip, { backgroundColor: palette.soft, borderColor: palette.shadow }]}><Text style={styles.chipText}>{bank[bankIndex]}</Text></Pressable>) : <Text style={styles.placeholder}>Коснитесь слов внизу</Text>}</View>
        <View style={styles.bank}>{bank.map((token, index) => <Pressable key={index} accessibilityRole="button" disabled={selected.includes(index) || checked} onPress={() => setSelected(old => [...old, index])} style={[styles.chip, selected.includes(index) && styles.chipUsed]}><Text style={styles.chipText}>{selected.includes(index) ? ' ' : token}</Text></Pressable>)}</View>
      </>}

      {stepIndex === 4 && <>
        <Text style={styles.helper}>Коснитесь слова слева, затем его перевода справа.</Text>
        <View style={styles.matchGrid}>
          <View style={styles.matchColumn}>{words.map((word, index) => <Pressable key={index} accessibilityRole="button" disabled={matched.includes(index) || checked} onPress={() => chooseMatch('left', index)} style={[styles.matchCard, matched.includes(index) && styles.matched, left === index && { borderColor: palette.shadow, backgroundColor: palette.soft }]}><Text style={styles.matchText}>{matched.includes(index) ? '✓' : word.komi}</Text></Pressable>)}</View>
          <View style={styles.matchColumn}>{answerOrder.map(index => <Pressable key={index} accessibilityRole="button" disabled={matched.includes(index) || checked} onPress={() => chooseMatch('right', index)} style={[styles.matchCard, matched.includes(index) && styles.matched, right === index && { borderColor: palette.shadow, backgroundColor: palette.soft }]}><Text style={styles.matchText}>{matched.includes(index) ? '✓' : words[index].russian}</Text></Pressable>)}</View>
        </View>
      </>}

      {stepIndex === 5 && <>
        <Text style={styles.helper}>Как будет по-коми?</Text><Text style={styles.phrasePrompt}>{words[2].russian}</Text>
        <View style={styles.options}>{words.map((word, index) => <Pressable key={index} accessibilityRole="button" accessibilityState={{ selected: selected[0] === index }} onPress={() => !checked && setSelected([index])} style={[styles.option, selected[0] === index && { borderColor: palette.shadow, backgroundColor: palette.soft }]}><Text style={styles.optionText}>{word.komi}</Text></Pressable>)}</View>
      </>}
      {audioNotice && <Text accessibilityRole="alert" style={styles.audioNotice}>Озвучка слов появится позже</Text>}
    </ScrollView>

    {checked && <View style={[styles.feedback, { backgroundColor: correct ? '#EAF6DF' : '#FFF0E2' }]}>
      <Text style={[styles.feedbackTitle, { color: correct ? '#367327' : '#AC6322' }]}>{correct ? 'Верно!' : 'Попробуйте ещё раз'}</Text>
      <Text style={styles.feedbackNote}>{correct ? note : stepIndex === 4 ? 'Эти слова не составляют пару.' : 'Посмотрите на новые слова и попробуйте снова.'}</Text>
    </View>}
    <View style={styles.footer}><Button title={stepIndex === 0 ? 'НАЧАТЬ' : checked ? correct ? 'ПРОДОЛЖИТЬ' : 'ЕЩЁ РАЗ' : stepIndex === 4 ? 'СОЕДИНИТЕ ПАРЫ' : 'ПРОВЕРИТЬ'} onPress={stepIndex === 0 || checked ? next : evaluate} disabled={stepIndex !== 0 && !checked && (stepIndex === 4 || selected.length === 0)} color={palette.primary} shadowColor={palette.shadow} textColor={palette.ink} /></View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#FFFCF8' },
  header: { height: 62, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', gap: 12 },
  closeButton: { width: 32, alignItems: 'center' },
  close: { fontFamily: font.regular, color: c.grayDark, fontSize: 37, lineHeight: 43 },
  progressTrack: { flex: 1, height: 14, borderRadius: 7, backgroundColor: '#E9E3DA', overflow: 'hidden' },
  progressFill: { height: 14, borderRadius: 7 },
  heart: { width: 27, height: 27 },
  heartCount: { fontFamily: font.black, fontSize: 17, color: '#E94863' },
  body: { paddingHorizontal: 22, paddingTop: 27, paddingBottom: 30, flexGrow: 1 },
  kicker: { fontFamily: font.black, color: '#A97949', fontSize: 13, letterSpacing: 1.5 },
  title: { fontFamily: font.black, color: '#322D28', fontSize: 29, lineHeight: 35, marginTop: 9, marginBottom: 24 },
  foxIntro: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 18 },
  fox: { width: 78, height: 96 },
  introText: { flex: 1, fontFamily: font.regular, fontSize: 16, lineHeight: 22, color: c.text },
  wordCard: { minHeight: 89, borderRadius: 18, borderWidth: 2, borderColor: '#E9E3DA', backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, marginBottom: 10, gap: 12 },
  artCircle: { width: 58, height: 58, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  wordCopy: { flex: 1 },
  komi: { fontFamily: font.black, fontSize: 21, color: '#322D28' },
  russian: { fontFamily: font.regular, fontSize: 15, color: c.lightText },
  audioButton: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#E5F7FD', alignItems: 'center', justifyContent: 'center' },
  promptRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 15 },
  promptWord: { fontFamily: font.black, fontSize: 30, color: '#322D28' },
  helper: { fontFamily: font.regular, fontSize: 17, lineHeight: 24, color: c.lightText, marginBottom: 24 },
  pictureGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  pictureCard: { width: '48%', minHeight: 155, backgroundColor: 'white', borderWidth: 2, borderBottomWidth: 4, borderColor: '#E3DDD4', borderRadius: 20, alignItems: 'center', justifyContent: 'center', padding: 12 },
  pictureLabel: { fontFamily: font.bold, color: c.text, fontSize: 17, marginTop: 11, textAlign: 'center' },
  options: { gap: 12, marginTop: 12 },
  option: { minHeight: 65, borderWidth: 2, borderBottomWidth: 4, borderColor: '#E3DDD4', borderRadius: 17, backgroundColor: 'white', justifyContent: 'center', paddingHorizontal: 18 },
  optionText: { fontFamily: font.bold, fontSize: 19, color: '#322D28' },
  phrasePrompt: { fontFamily: font.black, color: '#322D28', fontSize: 25, marginBottom: 22 },
  answerArea: { minHeight: 90, borderTopWidth: 2, borderBottomWidth: 2, borderColor: '#E3DDD4', flexDirection: 'row', flexWrap: 'wrap', gap: 9, alignItems: 'center', paddingVertical: 12 },
  placeholder: { fontFamily: font.regular, fontSize: 16, color: c.grayDark },
  bank: { flexDirection: 'row', flexWrap: 'wrap', gap: 9, marginTop: 30 },
  chip: { minHeight: 51, borderWidth: 2, borderBottomWidth: 4, borderRadius: 14, borderColor: '#D6CEC4', backgroundColor: 'white', paddingHorizontal: 15, justifyContent: 'center' },
  chipUsed: { backgroundColor: '#EEEAE5', borderColor: '#EEEAE5' },
  chipText: { fontFamily: font.bold, fontSize: 18, color: '#322D28' },
  matchGrid: { flexDirection: 'row', gap: 10 },
  matchColumn: { flex: 1, gap: 10 },
  matchCard: { minHeight: 74, borderWidth: 2, borderBottomWidth: 4, borderColor: '#E3DDD4', borderRadius: 15, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 6 },
  matched: { backgroundColor: '#EAF6DF', borderColor: '#B9DDA4' },
  matchText: { fontFamily: font.bold, fontSize: 17, color: '#322D28', textAlign: 'center' },
  audioNotice: { fontFamily: font.bold, fontSize: 14, color: '#168DC0', marginTop: 20 },
  feedback: { paddingHorizontal: 22, paddingVertical: 14 },
  feedbackTitle: { fontFamily: font.black, fontSize: 19 },
  feedbackNote: { fontFamily: font.regular, fontSize: 15, color: c.text, marginTop: 2 },
  footer: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 18, backgroundColor: '#FFFCF8' },
});
