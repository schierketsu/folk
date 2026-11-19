import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { useProgress } from '../../state/ProgressContext';
import { font } from '../../theme';

export default function Tasks() {
  const { progress } = useProgress();
  const done = Math.min(progress.completed.length, 6);
  return <SafeAreaView style={styles.page} edges={['top']}>
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.weekHeader}>
        <Text style={styles.weekTitle}>Задания недели</Text>
        <Text style={styles.daysLeft}>◷  5 ДНЕЙ</Text>
        <View style={styles.weekGoal}>
          <Text style={styles.goalTitle}>Пройдите 6 заданий курса!</Text>
          <View style={styles.track}><View style={[styles.fill, { width: `${done / 6 * 100}%` }]} /><Text style={styles.trackLabel}>{done} / 6</Text></View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>ПАРНОЕ ЗАДАНИЕ</Text>
        <View style={styles.illustration}><Image source={images.manpupuner} style={styles.place} resizeMode="contain" /><Text style={styles.sparkle}>✦</Text><Image source={images.shanga} style={styles.place} resizeMode="contain" /></View>
        <Text style={styles.pairTitle}>Пройдите вместе 6 заданий курса</Text>
        <View style={styles.pairProgress}><View style={styles.pairTrack}><View style={[styles.pairFill, { width: `${done / 6 * 100}%` }]} /><Text style={styles.pairTrackLabel}>{done} / 6</Text></View><Image source={images.chestClosed} style={styles.reward} resizeMode="contain" /></View>
        <View style={styles.personRow}><View style={styles.pinkDot} /><Text style={styles.personName}>Вы</Text><Text style={styles.personValue}>{done} / 6 заданий</Text></View>
        <View style={styles.personRow}><View style={styles.purpleDot} /><Text style={styles.personName}>Друг</Text><Text style={styles.personValue}>Пока не подключён</Text></View>
      </View>
    </ScrollView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: 'white' },
  content: { paddingBottom: 28 },
  weekHeader: { backgroundColor: '#D949A3', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 },
  weekTitle: { fontFamily: font.black, color: 'white', fontSize: 23 },
  daysLeft: { fontFamily: font.bold, color: 'white', fontSize: 12, marginTop: 5 },
  weekGoal: { backgroundColor: '#18282D', borderRadius: 15, padding: 14, marginTop: 9 },
  goalTitle: { fontFamily: font.bold, color: 'white', fontSize: 16, marginBottom: 10 },
  track: { height: 18, borderRadius: 10, backgroundColor: '#435A60', overflow: 'hidden', justifyContent: 'center' },
  fill: { height: 18, backgroundColor: '#E347A3', borderRadius: 10 },
  trackLabel: { position: 'absolute', alignSelf: 'center', fontFamily: font.bold, color: 'white', fontSize: 12 },
  section: { paddingHorizontal: 20, paddingTop: 18 },
  sectionLabel: { fontFamily: font.black, fontSize: 13, letterSpacing: 1, color: '#7B8A90', marginBottom: 13 },
  illustration: { height: 107, borderRadius: 15, backgroundColor: '#573454', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 17 },
  place: { width: 78, height: 78 },
  sparkle: { fontSize: 25, color: '#FFDB70' },
  pairTitle: { fontFamily: font.bold, fontSize: 16, color: '#273238', marginTop: 12 },
  pairProgress: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 12, marginBottom: 9 },
  pairTrack: { flex: 1, height: 19, borderRadius: 10, backgroundColor: '#DDE7EA', overflow: 'hidden', justifyContent: 'center' },
  pairFill: { height: 19, backgroundColor: '#AD0B75', borderRadius: 10 },
  pairTrackLabel: { position: 'absolute', alignSelf: 'center', fontFamily: font.bold, color: '#415258', fontSize: 12 },
  reward: { width: 43, height: 43 },
  personRow: { flexDirection: 'row', alignItems: 'center', height: 34, gap: 9 },
  pinkDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#E347A3' },
  purpleDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#AD0B75' },
  personName: { fontFamily: font.bold, fontSize: 15, color: '#C7278F', flex: 1 },
  personValue: { fontFamily: font.bold, fontSize: 13, color: '#7B8A90' },
});
