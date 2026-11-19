import { Image, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { Button, PageHeader } from '../../components/UI';
import { useProgress } from '../../state/ProgressContext';
import { c, font, topicPalettes } from '../../theme';

export default function Chest() {
  const { topic } = useLocalSearchParams<{ topic: string }>();
  const index = Number(topic) === 1 ? 1 : 0;
  const palette = topicPalettes[index];
  const { progress, openChest } = useProgress();
  const opened = progress.chests.includes(index);
  return <SafeAreaView style={styles.page}>
    <PageHeader title="Награда" onClose={() => router.back()} />
    <View style={styles.main}>
      <Image source={opened ? images.chestOpen : images.chestClosed} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{opened ? 'Сундук открыт!' : 'Вы прошли тему!'}</Text>
      <Text style={[styles.reward, { color: palette.ink }]}>{opened ? '+50 ягод получено' : 'Откройте сундук и получите 50 ягод'}</Text>
    </View>
    <View style={styles.footer}><Button title={opened ? 'НА КАРТУ' : 'ОТКРЫТЬ'} onPress={() => opened ? router.replace('/(tabs)/home') : openChest(index)} color={palette.primary} shadowColor={palette.shadow} textColor={palette.ink} /></View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: 'white' },
  main: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: 240, height: 240 },
  title: { fontFamily: font.black, fontSize: 28, color: c.text, marginTop: 20 },
  reward: { fontFamily: font.bold, fontSize: 19, marginTop: 10 },
  footer: { padding: 20 },
});
