import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { Counter, LockedNode, StarRing } from '../../components/UI';
import { lessonsForTopic, topics } from '../../data/course';
import { useProgress } from '../../state/ProgressContext';
import { font, topicPalettes } from '../../theme';

const nodeOffsets = [0, -70, -98, -70, 0, 70];
const nodeWidth = 118;

export default function Home() {
  const { width } = useWindowDimensions();
  const contentWidth = Math.min(width, 480);
  const { progress } = useProgress();
  const [selected, setSelected] = useState<string | null>(null);
  const berries = progress.completed.length * 15 + progress.chests.length * 50;

  return <SafeAreaView style={styles.page} edges={['top']}>
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={[styles.content, { maxWidth: contentWidth }]}>
        <View style={styles.stats}>
          <Pressable accessibilityLabel="Открыть профиль" accessibilityRole="button" onPress={() => router.push('/profile')} style={styles.avatar} />
          <View style={styles.counters}>
            <Counter image={images.cranberry} value={berries} color="#E94357" />
            <Counter image={images.fire} value={progress.completed.length} color="#D98700" />
          </View>
        </View>

        {[0, 1].map(topic => {
          const palette = topicPalettes[topic];
          const taskList = lessonsForTopic(topic);
          const previousTopicComplete = topic === 0 || lessonsForTopic(topic - 1).every(item => progress.completed.includes(item.id));
          const complete = taskList.every(item => progress.completed.includes(item.id));
          return <View key={topic}>
            <View style={[styles.banner, topic > 0 && styles.nextBanner, { backgroundColor: palette.primary, borderBottomColor: palette.shadow }]}>
              <Text style={styles.module}>МОДУЛЬ 1, ТЕМА {topic + 1}</Text>
              <Text style={styles.bannerTitle}>{topics[topic].title}</Text>
            </View>

            <View style={styles.path}>
              {taskList.map((lesson, index) => {
                const done = progress.completed.includes(lesson.id);
                const unlocked = index === 0 ? previousTopicComplete : progress.completed.includes(taskList[index - 1].id);
                const isSelected = selected === lesson.id;
                const left = Math.max(20, Math.min(contentWidth - nodeWidth - 20, (contentWidth - nodeWidth) / 2 + nodeOffsets[index]));
                return <React.Fragment key={lesson.id}>
                  <View style={styles.stage}>
                    <View style={[styles.stageNode, { left }]}>
                      {unlocked ? <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={lesson.title}
                        accessibilityState={{ selected: isSelected }}
                        onPress={() => setSelected(isSelected ? null : lesson.id)}
                      ><StarRing active={!done} color={palette.primary} shadowColor={palette.shadow} /></Pressable> : <LockedNode />}
                    </View>
                    {index === 2 && <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`Место темы: ${topics[topic].place}`}
                      onPress={() => router.push({ pathname: '/place/[topic]', params: { topic: String(topic) } })}
                      style={styles.place}
                    >
                      <Image source={topic === 0 ? images.manpupuner : images.shanga} style={styles.placeImage} resizeMode="contain" />
                      <View style={styles.placeStars}>
                        <Image source={images.mapStar} style={styles.placeStar} resizeMode="contain" />
                        <Image source={images.mapStar} style={[styles.placeStar, styles.middleStar, styles.grayStar]} resizeMode="contain" />
                        <Image source={images.mapStar} style={[styles.placeStar, styles.grayStar]} resizeMode="contain" />
                      </View>
                    </Pressable>}
                  </View>

                  {isSelected && unlocked && <View style={[styles.lessonCard, { backgroundColor: palette.primary, borderBottomColor: palette.shadow }]}>
                    <View style={[styles.cardPointer, { left: left + nodeWidth / 2 - 30, backgroundColor: palette.primary }]} />
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => router.push({ pathname: '/lesson/[id]', params: { id: lesson.id } })}
                      style={styles.learnButton}
                    ><Text style={[styles.learnText, { color: palette.ink }]}>{done ? 'ПОВТОРИТЬ' : 'УЧИТЬСЯ · +15 ОПЫТА'}</Text></Pressable>
                  </View>}
                </React.Fragment>;
              })}
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={complete ? 'Открыть сундук' : 'Сундук закрыт'}
              disabled={!complete}
              onPress={() => router.push({ pathname: '/chest/[topic]', params: { topic: String(topic) } })}
              style={styles.chest}
            ><Image source={complete ? images.chestOpen : images.chestClosed} style={styles.chestImage} resizeMode="contain" /></Pressable>
          </View>;
        })}
      </View>
    </ScrollView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: 'white' },
  scroll: { paddingBottom: 28 },
  content: { width: '100%', alignSelf: 'center' },
  stats: { height: 84, paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#ADADAD' },
  counters: { flexDirection: 'row', gap: 27, alignItems: 'center' },
  banner: { marginHorizontal: 15, borderRadius: 18, borderBottomWidth: 5, minHeight: 106, paddingHorizontal: 18, paddingVertical: 17, justifyContent: 'center' },
  nextBanner: { marginTop: 28 },
  module: { fontFamily: font.black, fontSize: 16, letterSpacing: .4, color: 'white', textShadowColor: 'rgba(75, 49, 30, 0.28)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 },
  bannerTitle: { fontFamily: font.black, fontSize: 22, marginTop: 7, color: 'white', textShadowColor: 'rgba(75, 49, 30, 0.28)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 },
  path: { paddingTop: 18 },
  stage: { height: 114, position: 'relative' },
  stageNode: { position: 'absolute', top: 0, width: nodeWidth, height: 108, alignItems: 'center', justifyContent: 'center' },
  lessonCard: { marginHorizontal: 20, marginVertical: 8, padding: 17, borderRadius: 18, borderBottomWidth: 4 },
  cardPointer: { position: 'absolute', top: -9, width: 20, height: 20, transform: [{ rotate: '45deg' }] },
  lessonTitle: { fontFamily: font.black, fontSize: 21, color: 'white', textAlign: 'center', textShadowColor: 'rgba(75, 49, 30, 0.28)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 },
  learnButton: { minHeight: 49, marginTop: 16, borderRadius: 12, backgroundColor: 'white', borderBottomWidth: 3, borderBottomColor: '#D9E8D4', alignItems: 'center', justifyContent: 'center' },
  learnText: { fontFamily: font.black, fontSize: 17, letterSpacing: .7 },
  place: { position: 'absolute', right: 18, top: -8, width: 146, alignItems: 'center', zIndex: 2 },
  placeImage: { width: 135, height: 107 },
  placeStars: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginTop: 4 },
  placeStar: { width: 36, height: 36 },
  middleStar: { transform: [{ translateY: 8 }] },
  grayStar: { tintColor: '#E5E5E5' },
  chest: { alignItems: 'center', marginTop: 4 },
  chestImage: { width: 112, height: 112 },
});
