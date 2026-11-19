import { Image, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { Button, PageHeader } from '../../components/UI';
import { topics } from '../../data/course';
import { c, font } from '../../theme';
export default function Place() { const { topic } = useLocalSearchParams<{ topic: string }>(); const n = Number(topic) === 1 ? 1 : 0; return <SafeAreaView style={styles.page}><PageHeader title="Место темы" onClose={() => router.back()} /><View style={styles.main}><Image source={n === 0 ? images.manpupunerCard : images.shangaCard} style={styles.image} resizeMode="contain" /><Text style={styles.title}>{topics[n].place}</Text><Text style={styles.stars}>★　☆　☆</Text><Text style={styles.description}>{topics[n].description}</Text></View><View style={styles.footer}><Button title="НА КАРТУ" onPress={() => router.back()} /></View></SafeAreaView>; }
const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: 'white' }, main: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }, image: { width: 260, height: 240 }, title: { fontFamily: font.black, fontSize: 29, color: c.text, marginTop: 15 }, stars: { fontSize: 30, color: '#FFCF00', marginVertical: 15 }, description: { fontFamily: font.regular, fontSize: 18, color: c.lightText, textAlign: 'center' }, footer: { padding: 20 } });
