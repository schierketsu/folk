import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { Counter, LockedNode, StarRing } from '../../components/UI';
import { lessonsForTopic, topics } from '../../data/course';
import { useProgress } from '../../state/ProgressContext';
import { c, font } from '../../theme';

const nodeOffsets = [0, -70, -98, -70, 0, 70];
const ringSize = 92;

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
          const taskList = lessonsForTopic(topic);
          const previousTopicComplete = topic === 0 || lessonsForTopic(topic - 1).every(item => progress.completed.includes(item.id));
          const complete = taskList.every(item => progress.completed.includes(item.id));
          return <View key={topic}>
            <View style={[styles.banner, topic > 0 && styles.nextBanner]}>
              <Text style={styles.module}>МОДУЛЬ 1, ТЕМА {topic + 1}</Text>
              <Text style={styles.bannerTitle}>{topics[topic].title}</Text>
            </View>

            <View style={styles.path}>
              {taskList.map((lesson, index) => {
                const done = progress.completed.includes(lesson.id);
                const unlocked = index === 0 ? previousTopicComplete : progress.completed.includes(taskList[index - 1].id);
                const isSelected = selected === lesson.id;
                const left = Math.max(20, Math.min(contentWidth - ringSize - 20, (contentWidth - ringSize) / 2 + nodeOffsets[index]));
                return <React.Fragment key={lesson.id}>
                  <View style={styles.stage}>
                    <View style={[styles.stageNode, { left }]}>
                      {unlocked ? <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={lesson.title}
                        accessibilityState={{ selected: isSelected }}
                        onPress={() => setSelected(isSelected ? null : lesson.id)}
                      ><StarRing size={ringSize} active={!done} /></Pressable> : <LockedNode size={72} />}
                    </View>
                    {index === 2 && <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`Место темы: ${topics[topic].place}`}
                      onPress={() => router.push({ pathname: '/place/[topic]', params: { topic: String(topic) } })}
                      style={styles.place}
                    >
                      <Image source={topic === 0 ? images.manpupuner : images.shanga} style={styles.placeImage} resizeMode="contain" />
                      <View style={styles.placeStars}><Text style={styles.goldStar}>★</Text><Text style={styles.grayStar}>★</Text><Text style={styles.grayStar}>★</Text></View>
                    </Pressable>}
                  </View>

                  {isSelected && unlocked && <View style={styles.lessonCard}>
                    <View style={[styles.cardPointer, { left: left + ringSize / 2 - 30 }]} />
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <Text style={styles.lessonMeta}>Этап {index + 1} из {taskList.length} · {done ? 'пройден' : 'новый урок'}</Text>
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => router.push({ pathname: '/lesson/[id]', params: { id: lesson.id } })}
                      style={styles.learnButton}
                    ><Text style={styles.learnText}>{done ? 'ПОВТОРИТЬ' : 'УЧИТЬСЯ · +15 ОПЫТА'}</Text></Pressable>
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
  avatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#ADADAD' },
  counters: { flexDirection: 'row', gap: 27, alignItems: 'center' },
  banner: { marginHorizontal: 15, borderRadius: 18, backgroundColor: c.green, borderBottomWidth: 5, borderBottomColor: c.greenDark, minHeight: 106, paddingHorizontal: 18, paddingVertical: 17, justifyContent: 'center' },
  nextBanner: { marginTop: 28 },
  module: { fontFamily: font.black, fontSize: 16, color: 'white', letterSpacing: .4 },
  bannerTitle: { fontFamily: font.black, fontSize: 22, color: 'white', marginTop: 7 },
  path: { paddingTop: 18 },
  stage: { height: 98, position: 'relative' },
  stageNode: { position: 'absolute', top: 3 },
  lessonCard: { marginHorizontal: 20, marginVertical: 8, padding: 17, borderRadius: 18, backgroundColor: c.green, borderBottomWidth: 4, borderBottomColor: c.greenDark },
  cardPointer: { position: 'absolute', top: -9, width: 20, height: 20, backgroundColor: c.green, transform: [{ rotate: '45deg' }] },
  lessonTitle: { fontFamily: font.black, color: 'white', fontSize: 21 },
  lessonMeta: { fontFamily: font.regular, color: 'white', fontSize: 16, marginTop: 4, marginBottom: 16 },
  learnButton: { minHeight: 49, borderRadius: 12, backgroundColor: 'white', borderBottomWidth: 3, borderBottomColor: '#D9E8D4', alignItems: 'center', justifyContent: 'center' },
  learnText: { fontFamily: font.black, color: c.greenDark, fontSize: 17, letterSpacing: .7 },
  place: { position: 'absolute', right: 18, top: -8, width: 146, alignItems: 'center', zIndex: 2 },
  placeImage: { width: 135, height: 107 },
  placeStars: { flexDirection: 'row', gap: 10, marginTop: -3 },
  goldStar: { color: '#FFC800', fontSize: 23 },
  grayStar: { color: c.gray, fontSize: 23 },
  chest: { alignItems: 'center', marginTop: 4 },
  chestImage: { width: 90, height: 90 },
});
