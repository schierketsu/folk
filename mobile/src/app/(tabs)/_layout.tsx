import React from 'react';
import { router, Tabs } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../../components/UI';

const tabs = [
  { name: 'home', icon: 'nav-home', label: 'Главная', href: '/(tabs)/home' },
  { name: 'tasks', icon: 'nav-tasks', label: 'Задания', href: '/(tabs)/tasks' },
  { name: 'ranking', icon: 'nav-ranking', label: 'Рейтинг', href: '/(tabs)/ranking' },
  { name: 'feed', icon: 'nav-feed', label: 'Лента', href: '/(tabs)/feed' },
] as const;

function TabBar({ state }: { state: { index: number; routes: { key: string; name: string }[] } }) {
  const insets = useSafeAreaInsets();
  return <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 10) }]}>
    {state.routes.map((route, index) => {
      const tab = tabs.find(item => item.name === route.name);
      if (!tab) return null;
      const selected = state.index === index;
      return <Pressable
        key={route.key}
        accessibilityRole="tab"
        accessibilityLabel={tab.label}
        accessibilityState={{ selected }}
        onPress={() => router.navigate(tab.href)}
        style={[styles.tab, selected && styles.active]}
      ><Icon name={tab.icon} size={32} /></Pressable>;
    })}
  </View>;
}

export default function TabLayout() {
  return <Tabs tabBar={props => <TabBar state={props.state} />} screenOptions={{ headerShown: false }}>
    <Tabs.Screen name="home" />
    <Tabs.Screen name="tasks" />
    <Tabs.Screen name="ranking" />
    <Tabs.Screen name="feed" />
  </Tabs>;
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#E5E5E5', paddingTop: 8 },
  tab: { width: 56, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 13 },
  active: { backgroundColor: '#DCF6FF', borderColor: '#58C7EB', borderWidth: 2 },
});
