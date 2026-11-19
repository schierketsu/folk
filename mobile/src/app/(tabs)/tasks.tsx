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
        <View style={styles.weekGoal}>
          <Text style={styles.goalTitle}>Пройдите 6 заданий курса!</Text>
          <View style={styles.track}><View style={[styles.fill, { width: `${done / 6 * 100}%` }]} /><Text style={styles.trackLabel}>{done} / 6</Text></View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>ПАРНОЕ ЗАДАНИЕ</Text>
        <View style={styles.illustration}><Image source={images.mapStar} style={styles.placeholderStar} resizeMode="contain" /></View>
      </View>
    </ScrollView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: 'white' },
  content: { paddingBottom: 28 },
  weekHeader: { backgroundColor: '#D949A3', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 },
  weekTitle: { fontFamily: font.black, color: 'white', fontSize: 23 },
  weekGoal: { backgroundColor: '#18282D', borderRadius: 15, padding: 14, marginTop: 14 },
  goalTitle: { fontFamily: font.bold, color: 'white', fontSize: 16, marginBottom: 10 },
  track: { height: 18, borderRadius: 10, backgroundColor: '#435A60', overflow: 'hidden', justifyContent: 'center' },
  fill: { height: 18, backgroundColor: '#E347A3', borderRadius: 10 },
  trackLabel: { position: 'absolute', alignSelf: 'center', fontFamily: font.bold, color: 'white', fontSize: 12 },
  section: { paddingHorizontal: 20, paddingTop: 18 },
  sectionLabel: { fontFamily: font.black, fontSize: 13, letterSpacing: 1, color: '#7B8A90', marginBottom: 13 },
  illustration: { height: 107, borderRadius: 15, backgroundColor: '#573454', alignItems: 'center', justifyContent: 'center' },
  placeholderStar: { width: 48, height: 48 },
});
