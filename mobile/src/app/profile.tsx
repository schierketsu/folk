import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { c, font } from '../theme';
export default function Profile() { return <SafeAreaView style={styles.page}><View style={styles.header}><Text style={styles.title}>Профиль</Text><Pressable onPress={() => router.back()} hitSlop={18} style={styles.close}><Text style={styles.cross}>×</Text></Pressable></View></SafeAreaView>; }
const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: 'white' }, header: { height: 70, justifyContent: 'center', alignItems: 'center' }, title: { fontFamily: font.black, fontSize: 24, color: c.text }, close: { position: 'absolute', right: 22, top: 10, height: 48, width: 44, alignItems: 'center', justifyContent: 'center' }, cross: { fontFamily: font.regular, fontSize: 36, color: c.grayDark } });
