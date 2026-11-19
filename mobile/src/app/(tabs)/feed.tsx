import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { lessons } from '../../data/course';
import { useProgress } from '../../state/ProgressContext';
import { font } from '../../theme';

export default function Feed() {
  const { progress } = useProgress();
  return <SafeAreaView style={styles.page} edges={['top']}>
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Лента новостей</Text>
      {[...progress.completed].reverse().map(id => <View key={id} style={styles.post}>
        <View style={styles.postHeader}><View style={styles.avatar} /><View style={styles.author}><Text style={styles.authorName}>ФОЛК</Text><Text style={styles.date}>сегодня</Text></View><Image source={images.cranberry} style={styles.postImage} resizeMode="contain" /></View>
        <Text style={styles.message}>Вы прошли «{lessons.find(item => item.id === id)?.title}» и получили 15 опыта!</Text>
        <Text style={styles.detail}>★  Новое достижение в путешествии</Text>
      </View>)}
      <View style={styles.post}>
        <View style={styles.postHeader}><View style={styles.avatar} /><View style={styles.author}><Text style={styles.authorName}>ФОЛК</Text><Text style={styles.date}>сегодня</Text></View><Image source={images.fire} style={styles.postImage} resizeMode="contain" /></View>
        <Text style={styles.message}>Ваше путешествие по языку коми начинается!</Text>
        <Text style={styles.detail}>Проходите уроки и открывайте новые места.</Text>
      </View>
    </ScrollView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: 'white' },
  content: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 32 },
  title: { fontFamily: font.black, fontSize: 25, color: '#273238', marginBottom: 14 },
  post: { borderBottomWidth: 1, borderBottomColor: '#DAE4E7', paddingVertical: 13 },
  postHeader: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#E6F5FA', borderWidth: 1, borderColor: '#D4E8EF', marginRight: 10 },
  author: { flex: 1 },
  authorName: { fontFamily: font.bold, fontSize: 15, color: '#273238' },
  date: { fontFamily: font.regular, fontSize: 12, color: '#7B8A90' },
  postImage: { width: 43, height: 43 },
  message: { fontFamily: font.regular, fontSize: 15, color: '#273238', lineHeight: 22, marginTop: 10 },
  detail: { fontFamily: font.regular, fontSize: 13, color: '#7B8A90', marginTop: 9 },
});
