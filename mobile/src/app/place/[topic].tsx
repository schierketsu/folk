import { Image, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { Button, PageHeader } from '../../components/UI';
import { topics } from '../../data/course';
import { c, font, topicPalettes } from '../../theme';

export default function Place() {
  const { topic } = useLocalSearchParams<{ topic: string }>();
  const index = Number(topic) === 1 ? 1 : 0;
  const palette = topicPalettes[index];
  return <SafeAreaView style={styles.page}>
    <PageHeader title="" onClose={() => router.back()} />
    <View style={styles.main}>
      <Image source={index === 0 ? images.manpupunerCard : images.shangaCard} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{topics[index].place}</Text>
      <View style={styles.stars}>
        <Image source={images.mapStar} style={styles.star} resizeMode="contain" />
        <Image source={images.mapStar} style={[styles.star, styles.middleStar, styles.emptyStar]} resizeMode="contain" />
        <Image source={images.mapStar} style={[styles.star, styles.emptyStar]} resizeMode="contain" />
      </View>
      <Text style={styles.description}>{topics[index].description}</Text>
    </View>
    <View style={styles.footer}><Button title="НА КАРТУ" onPress={() => router.back()} color={palette.primary} shadowColor={palette.shadow} textColor="white" /></View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: 'white' },
  main: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', aspectRatio: 686 / 458 },
  title: { fontFamily: font.black, fontSize: 29, color: c.text, marginTop: 20, textAlign: 'center', paddingHorizontal: 20 },
  stars: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 16, marginBottom: 20 },
  star: { width: 42, height: 42 },
  middleStar: { transform: [{ translateY: 6 }] },
  emptyStar: { tintColor: '#E5E5E5' },
  description: { fontFamily: font.regular, fontSize: 18, color: c.lightText, textAlign: 'center', paddingHorizontal: 24 },
  footer: { padding: 20 },
});
