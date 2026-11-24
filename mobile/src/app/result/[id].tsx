import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/UI';
import { lessons } from '../../data/course';
import { c, font, topicPalettes } from '../../theme';

export default function Result() {
  const { id, mistakes, first } = useLocalSearchParams<{ id: string; mistakes?: string; first?: string }>();
  const lesson = lessons.find(item => item.id === id);
  const palette = topicPalettes[lesson?.topic ?? 0];
  const errors = Math.max(0, Number(mistakes) || 0);
  const accuracy = Math.round(5 / (5 + errors) * 100);
  const reward = first === '0' ? 0 : 15;
  return <SafeAreaView style={styles.page}>
    <View style={styles.main}>
      <View style={[styles.badge, { backgroundColor: palette.soft, borderColor: palette.primary }]}><Text style={styles.badgeSymbol}>✦</Text></View>
      <Text style={[styles.title, { color: palette.ink }]}>Урок пройден!</Text>
      <Text style={styles.subtitle}>{lesson?.title}</Text>
      <Text style={styles.summary}>Вы повторили три коми слова и собрали новую фразу.</Text>
      <View style={styles.awards}>
        <View style={[styles.award, { borderColor: palette.primary }]}><Text style={styles.awardTitle}>ТОЧНОСТЬ</Text><Text style={[styles.awardValue, { color: palette.ink }]}>{accuracy}%</Text></View>
        <View style={[styles.award, { borderColor: palette.primary }]}><Text style={styles.awardTitle}>ОПЫТ</Text><Text style={[styles.awardValue, { color: palette.ink }]}>+{reward}</Text></View>
      </View>
    </View>
    <View style={styles.footer}><Button title="НА КАРТУ" onPress={() => router.replace('/(tabs)/home')} color={palette.primary} shadowColor={palette.shadow} textColor={palette.ink} /></View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#FFFCF8' },
  main: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  badge: { width: 154, height: 154, borderRadius: 77, borderWidth: 5, justifyContent: 'center', alignItems: 'center', marginBottom: 25 },
  badgeSymbol: { fontSize: 88, color: '#D1A572' },
  title: { fontFamily: font.black, fontSize: 31, textAlign: 'center' },
  subtitle: { fontFamily: font.bold, fontSize: 19, color: c.text, marginTop: 8 },
  summary: { fontFamily: font.regular, fontSize: 17, color: c.lightText, textAlign: 'center', marginTop: 16 },
  awards: { flexDirection: 'row', gap: 12, marginTop: 34 },
  award: { minWidth: 137, alignItems: 'center', borderWidth: 2, borderRadius: 17, paddingVertical: 13, paddingHorizontal: 10, backgroundColor: 'white' },
  awardTitle: { fontFamily: font.black, fontSize: 13, color: c.lightText },
  awardValue: { fontFamily: font.black, fontSize: 27, marginTop: 4 },
  footer: { padding: 20 },
});
