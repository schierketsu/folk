import { Redirect } from 'expo-router';
import { View } from 'react-native';
import { useProgress } from '../state/ProgressContext';
export default function Index() { const { ready, progress } = useProgress(); if (!ready) return <View />; return <Redirect href={progress.languageSelected ? '/(tabs)/home' : '/language'} />; }
