import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProgressProvider } from '../state/ProgressContext';

export default function Layout() {
  const [loaded] = useFonts({ Nunito: require('../../assets/fonts/nunito-regular.ttf'), NunitoBold: require('../../assets/fonts/nunito-bold.ttf'), NunitoExtra: require('../../assets/fonts/nunito-extrabold.ttf'), NunitoBlack: require('../../assets/fonts/nunito-black.ttf') });
  if (!loaded) return null;
  return <SafeAreaProvider><ProgressProvider><StatusBar style="dark" /><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'white' } }} /></ProgressProvider></SafeAreaProvider>;
}
