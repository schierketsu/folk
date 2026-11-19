import { Image, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { Button } from '../../components/UI';
import { lessons } from '../../data/course';
import { c, font, topicPalettes } from '../../theme';

export default function Result() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = lessons.find(item => item.id === id);
  const palette = topicPalettes[lesson?.topic ?? 0];
  return <SafeAreaView style={styles.page}>
    <View style={styles.main}>
      <Image source={images.foxRunning} style={styles.fox} resizeMode="contain" />
      <Text style={[styles.title, { color: palette.ink }]}>Урок пройден!</Text>
      <Text style={styles.subtitle}>{lesson?.title}</Text>
      <View style={styles.awards}>
        {['ОПЫТ', 'ЯГОДЫ'].map(label => <View key={label} style={[styles.award, { borderColor: palette.primary }]}>
          <Text style={[styles.awardTitle, { color: palette.ink }]}>{label}</Text>
          <Text style={[styles.awardValue, { color: palette.ink }]}>+15</Text>
        </View>)}
      </View>
    </View>
    <View style={styles.footer}><Button title="НА КАРТУ" onPress={() => router.replace('/(tabs)/home')} color={palette.primary} shadowColor={palette.shadow} textColor={palette.ink} /></View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: 'white' },
  main: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  fox: { width: 190, height: 210 },
  title: { fontFamily: font.black, fontSize: 30, marginTop: 15 },
  subtitle: { fontFamily: font.bold, fontSize: 19, color: c.text, marginTop: 8 },
  awards: { flexDirection: 'row', gap: 14, marginTop: 30 },
  award: { minWidth: 125, alignItems: 'center', borderWidth: 2, borderRadius: 16, padding: 12 },
  awardTitle: { fontFamily: font.black, fontSize: 13 },
  awardValue: { fontFamily: font.black, fontSize: 24 },
  footer: { padding: 20 },
});
