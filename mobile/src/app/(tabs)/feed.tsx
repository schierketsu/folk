import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { c, font } from '../../theme';

export default function Feed() {
  return <SafeAreaView style={styles.page} edges={['top']}>
    <Text style={styles.title}>Лента новостей</Text>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: 'white' },
  title: { width: '100%', paddingTop: 18, textAlign: 'center', fontFamily: font.black, fontSize: 26, color: c.text },
});
