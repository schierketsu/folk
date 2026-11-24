import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { Counter, LockedNode, StarRing } from '../../components/UI';
import { lessons, topics } from '../../data/course';
import { useProgress } from '../../state/ProgressContext';
import { font, topicPalettes } from '../../theme';

export default function Home() {
  const { width } = useWindowDimensions();
  const contentWidth = Math.min(width, 480);
  const { progress } = useProgress();
  const [selected, setSelected] = useState<string | null>(null);
  const [comingSoon, setComingSoon] = useState(false);
  const completedCount = lessons.filter(item => progress.completed.includes(item.id)).length;
  const berries = completedCount * 15 + progress.chests.length * 50;
  const palette = topicPalettes[0];

  return <SafeAreaView style={styles.page} edges={['top']}>
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={[styles.content, { maxWidth: contentWidth }]}>
        <View style={styles.stats}>
          <Pressable accessibilityLabel="Открыть профиль" accessibilityRole="button" onPress={() => router.push('/profile')} style={styles.avatar} />
          <View style={styles.counters}>
            <Counter image={images.cranberry} value={berries} color="#E94357" />
            <Counter image={images.fire} value={completedCount} color="#D98700" />
          </View>
        </View>
        <View style={[styles.banner, { backgroundColor: palette.primary, borderBottomColor: palette.shadow }]}>
          <Text style={styles.module}>МОДУЛЬ 1 · ТЕМА 1</Text>
          <Text style={styles.bannerTitle}>{topics[0].title}</Text>
          <Text style={styles.bannerDetail}>Первые слова на коми языке</Text>
        </View>

        <View style={styles.path}>
          {lessons.map((lesson, index) => {
            const done = progress.completed.includes(lesson.id);
            const unlocked = index === 0 || progress.completed.includes(lessons[index - 1].id);
            const isSelected = selected === lesson.id;
            const left = index === 0 ? contentWidth / 2 - 60 : contentWidth / 2 - 125;
            return <React.Fragment key={lesson.id}>
              <View style={styles.stage}>
                <View style={[styles.stageNode, { left }]}>
                  {unlocked ? <Pressable accessibilityRole="button" accessibilityLabel={lesson.title} accessibilityState={{ selected: isSelected }} onPress={() => { setComingSoon(false); setSelected(isSelected ? null : lesson.id); }}><StarRing active={!done} color={palette.primary} shadowColor={palette.shadow} /></Pressable> : <LockedNode />}
                </View>
                <Text style={[styles.stageLabel, { left: Math.max(12, left - 28) }]}>{lesson.title}</Text>
              </View>
              {isSelected && unlocked && <View style={[styles.lessonCard, { backgroundColor: palette.primary, borderBottomColor: palette.shadow }]}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Pressable accessibilityRole="button" onPress={() => router.push({ pathname: '/lesson/[id]', params: { id: lesson.id } })} style={styles.learnButton}><Text style={[styles.learnText, { color: palette.ink }]}>{done ? 'ПОВТОРИТЬ' : 'УЧИТЬСЯ · +15 ОПЫТА'}</Text></Pressable>
              </View>}
            </React.Fragment>;
          })}

          <Pressable accessibilityRole="button" accessibilityLabel="Маньпупунёр: отдельное событие" onPress={() => router.push({ pathname: '/place/[topic]', params: { topic: '0' } })} style={styles.placeCard}>
            <Image source={images.manpupuner} style={styles.placeImage} resizeMode="contain" />
            <View style={styles.placeCopy}><Text style={styles.placeKicker}>СОБЫТИЕ НА КАРТЕ</Text><Text style={styles.placeTitle}>Маньпупунёр</Text><Text style={styles.placeDetail}>Открыть карточку места</Text></View>
          </Pressable>

          <Pressable accessibilityRole="button" accessibilityLabel="Третий урок: скоро" onPress={() => { setSelected(null); setComingSoon(true); }} style={styles.lockedStage}>
            <LockedNode />
            <View><Text style={styles.lockedTitle}>Урок 3</Text><Text style={styles.lockedSubtitle}>Скоро</Text></View>
          </Pressable>
          {comingSoon && <View accessibilityRole="alert" style={styles.soonNotice}><Text style={styles.soonTitle}>Новые уроки появятся позже</Text><Text style={styles.soonCopy}>Пока доступны первые два урока. Следующие задания и темы уже в планах.</Text></View>}
        </View>

        <View style={styles.futureBanner}><Text style={styles.futureKicker}>МОДУЛЬ 1 · ТЕМА 2</Text><Text style={styles.futureTitle}>Новые слова и фразы</Text></View>
        {[1, 2].map(number => <View key={number} style={styles.futureLesson}><LockedNode /><View><Text style={styles.lockedTitle}>Урок {number}</Text><Text style={styles.lockedSubtitle}>Появится позже</Text></View></View>)}

        <View style={styles.fog} accessibilityLabel="Будущие уроки скрыты туманом">
          <View style={[styles.cloud, styles.cloudOne]} />
          <View style={[styles.cloud, styles.cloudTwo]} />
          <View style={[styles.cloud, styles.cloudThree]} />
          <View style={[styles.cloud, styles.cloudFour]} />
          <Text style={styles.fogMark}>✦</Text>
          <Text style={styles.fogTitle}>Продолжение пути</Text>
          <Text style={styles.fogCopy}>Новые уроки и темы откроются в будущем</Text>
          <Text style={styles.fogFoot}>СКОРО</Text>
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: 'white' },
  scroll: { paddingBottom: 34 },
  content: { width: '100%', alignSelf: 'center' },
  stats: { height: 84, paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#ADADAD' },
  counters: { flexDirection: 'row', gap: 27, alignItems: 'center' },
  banner: { marginHorizontal: 15, borderRadius: 18, borderBottomWidth: 5, minHeight: 119, paddingHorizontal: 18, paddingVertical: 17, justifyContent: 'center' },
  module: { fontFamily: font.black, fontSize: 14, letterSpacing: .4, color: 'white' },
  bannerTitle: { fontFamily: font.black, fontSize: 22, marginTop: 6, color: 'white' },
  bannerDetail: { fontFamily: font.bold, fontSize: 14, marginTop: 3, color: '#FFF7E9' },
  path: { paddingTop: 28 },
  stage: { height: 142, position: 'relative' },
  stageNode: { position: 'absolute', top: 0, width: 118, height: 108, alignItems: 'center', justifyContent: 'center' },
  stageLabel: { position: 'absolute', top: 109, width: 175, fontFamily: font.bold, fontSize: 15, color: '#776A5D', textAlign: 'center' },
  lessonCard: { marginHorizontal: 20, marginVertical: 5, padding: 17, borderRadius: 18, borderBottomWidth: 4 },
  lessonTitle: { fontFamily: font.black, fontSize: 21, color: 'white', textAlign: 'center' },
  learnButton: { minHeight: 49, marginTop: 16, borderRadius: 12, backgroundColor: 'white', borderBottomWidth: 3, borderBottomColor: '#D9E8D4', alignItems: 'center', justifyContent: 'center' },
  learnText: { fontFamily: font.black, fontSize: 17, letterSpacing: .7 },
  placeCard: { marginHorizontal: 25, marginTop: 5, marginBottom: 22, minHeight: 110, borderRadius: 20, borderWidth: 2, borderColor: '#E9E3DA', backgroundColor: '#FFFCF8', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 },
  placeImage: { width: 98, height: 90 },
  placeCopy: { flex: 1, paddingLeft: 8 },
  placeKicker: { fontFamily: font.black, fontSize: 11, color: '#A97949' },
  placeTitle: { fontFamily: font.black, fontSize: 19, color: '#4B311E', marginTop: 4 },
  placeDetail: { fontFamily: font.regular, fontSize: 13, color: '#777' },
  lockedStage: { marginHorizontal: 36, minHeight: 101, flexDirection: 'row', alignItems: 'center', gap: 16 },
  lockedTitle: { fontFamily: font.black, fontSize: 19, color: '#6D7479' },
  lockedSubtitle: { fontFamily: font.bold, fontSize: 15, color: '#A4ADB3' },
  soonNotice: { marginHorizontal: 22, marginTop: 2, marginBottom: 14, borderRadius: 17, backgroundColor: '#E5F7FD', padding: 17 },
  soonTitle: { fontFamily: font.black, fontSize: 17, color: '#15465E' },
  soonCopy: { fontFamily: font.regular, fontSize: 14, lineHeight: 20, color: '#3E5965', marginTop: 4 },
  futureBanner: { marginHorizontal: 15, marginTop: 18, borderRadius: 18, backgroundColor: '#B9CAD0', paddingHorizontal: 18, paddingVertical: 19 },
  futureKicker: { fontFamily: font.black, fontSize: 13, color: '#526F78' },
  futureTitle: { fontFamily: font.black, fontSize: 21, color: '#405E68', marginTop: 4 },
  futureLesson: { marginLeft: 53, minHeight: 94, flexDirection: 'row', alignItems: 'center', gap: 16 },
  fog: { marginHorizontal: 15, marginTop: 12, height: 285, borderRadius: 28, backgroundColor: '#DCE8EB', overflow: 'hidden', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 },
  cloud: { position: 'absolute', backgroundColor: '#F4FAFA', borderRadius: 100 },
  cloudOne: { width: 260, height: 110, left: -60, top: -28 },
  cloudTwo: { width: 250, height: 110, right: -65, top: 15 },
  cloudThree: { width: 300, height: 120, left: -105, bottom: -52 },
  cloudFour: { width: 280, height: 110, right: -65, bottom: -65 },
  fogMark: { fontSize: 37, color: '#89A5AC', marginBottom: 6 },
  fogTitle: { fontFamily: font.black, fontSize: 23, color: '#405E68', textAlign: 'center' },
  fogCopy: { fontFamily: font.regular, fontSize: 15, lineHeight: 21, color: '#5F7B83', textAlign: 'center', marginTop: 8 },
  fogFoot: { fontFamily: font.black, fontSize: 12, color: '#7B9BA4', letterSpacing: 2, marginTop: 18 },
});
