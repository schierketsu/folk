import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProgress } from '../../state/ProgressContext';
import { c, font } from '../../theme';

export default function Ranking() {
  const { progress } = useProgress();
  const experience = progress.completed.length * 15;
  return <SafeAreaView style={styles.page} edges={['top']}>
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Рейтинг</Text>
      <Text style={styles.subtitle}>Каждое открытие приближает к вершине</Text>
      <View style={styles.summary}>
        <Text style={styles.summaryLabel}>ВАШЕ МЕСТО</Text>
        <View style={styles.summaryLine}><Text style={styles.place}>№ 1</Text><View><Text style={styles.experience}>{experience} опыта</Text><Text style={styles.league}>Лига исследователей</Text></View></View>
        <Text style={styles.summaryNote}>Продолжайте путь и собирайте клюкву</Text>
      </View>
      <Text style={styles.sectionTitle}>ЛИДЕРЫ НЕДЕЛИ</Text>
      <View style={styles.userRow}><View style={styles.badge}><Text style={styles.badgeText}>1</Text></View><Text style={styles.userName}>Вы</Text><Text style={styles.userXp}>{experience} XP</Text></View>
      <Text style={styles.empty}>Другие путешественники появятся здесь позже.</Text>
    </ScrollView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: 'white' },
  content: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 32 },
  title: { fontFamily: font.black, fontSize: 26, color: c.text },
  subtitle: { fontFamily: font.regular, fontSize: 15, color: c.lightText, marginTop: 4, marginBottom: 16 },
  summary: { backgroundColor: '#FFC900', borderRadius: 16, paddingHorizontal: 20, paddingVertical: 17 },
  summaryLabel: { fontFamily: font.black, fontSize: 12, color: '#6E5200', letterSpacing: .6 },
  summaryLine: { flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 8 },
  place: { fontFamily: font.black, fontSize: 31, color: c.text },
  experience: { fontFamily: font.black, fontSize: 20, color: c.text },
  league: { fontFamily: font.bold, fontSize: 13, color: c.text },
  summaryNote: { fontFamily: font.regular, fontSize: 14, color: c.text, marginTop: 8 },
  sectionTitle: { fontFamily: font.black, fontSize: 13, letterSpacing: .8, color: '#858585', marginTop: 16, marginBottom: 10 },
  userRow: { minHeight: 62, flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#D6FFB8', borderRadius: 16, borderWidth: 1, borderColor: c.greenDark, paddingHorizontal: 15 },
  badge: { width: 35, height: 35, borderRadius: 18, backgroundColor: c.green, alignItems: 'center', justifyContent: 'center' },
  badgeText: { fontFamily: font.black, fontSize: 16, color: 'white' },
  userName: { fontFamily: font.bold, fontSize: 17, color: c.text, flex: 1 },
  userXp: { fontFamily: font.bold, fontSize: 14, color: c.greenDark },
  empty: { fontFamily: font.regular, fontSize: 15, color: c.lightText, textAlign: 'center', marginTop: 25 },
});
