import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path, SvgXml } from 'react-native-svg';
import { icons } from '../assets/icons';
import { c, font } from '../theme';

export function Icon({ name, size = 32 }: { name: keyof typeof icons; size?: number }) {
  return <SvgXml xml={icons[name]} width={size} height={size} />;
}

export function Button({ title, onPress, color = c.green, disabled = false }: { title: string; onPress: () => void; color?: string; disabled?: boolean }) {
  return <Pressable disabled={disabled} onPress={onPress} style={[styles.button, { backgroundColor: disabled ? c.gray : color, borderBottomColor: disabled ? c.grayDark : color === c.green ? c.greenDark : c.blueDark }]}>
    <Text style={styles.buttonText}>{title}</Text>
  </Pressable>;
}

export function PageHeader({ title, onClose, progress }: { title?: string; onClose: () => void; progress?: number }) {
  return <View style={styles.header}>
    <Pressable onPress={onClose} hitSlop={16}><Text style={styles.close}>×</Text></Pressable>
    {progress === undefined ? <Text style={styles.headerTitle}>{title}</Text> : <View style={styles.track}><View style={[styles.trackFill, { width: `${progress * 100}%` }]} /></View>}
    <View style={{ width: 28 }} />
  </View>;
}

export function StarRing({ active = false, size = 96 }: { active?: boolean; size?: number }) {
  const circleSize = size * .72;
  return <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    {active && <Svg width={size} height={size} viewBox="0 0 100 100" style={StyleSheet.absoluteFill}>
      <Path d="M49 5 A45 45 0 0 0 5 53" fill="none" stroke={c.gray} strokeWidth="8" strokeLinecap="round" />
      <Path d="M6 62 A45 45 0 0 0 42 95" fill="none" stroke={c.gray} strokeWidth="8" strokeLinecap="round" />
      <Path d="M53 95 A45 45 0 0 0 94 60" fill="none" stroke={c.gray} strokeWidth="8" strokeLinecap="round" />
      <Path d="M95 49 A45 45 0 0 0 59 5" fill="none" stroke={c.green} strokeWidth="8" strokeLinecap="round" />
    </Svg>}
    <View style={[styles.nodeShadow, { width: circleSize, height: circleSize, borderRadius: circleSize / 2, backgroundColor: c.greenDark, top: (size - circleSize) / 2 + 5, left: (size - circleSize) / 2 }]} />
    <View style={[styles.nodeFace, { width: circleSize, height: circleSize, borderRadius: circleSize / 2, backgroundColor: c.green, top: (size - circleSize) / 2, left: (size - circleSize) / 2 }]}>
      <Icon name="step-star" size={circleSize * .43} />
    </View>
  </View>;
}

export function LockedNode({ size = 72 }: { size?: number }) {
  return <View style={{ width: size, height: size + 7 }}>
    <View style={[styles.nodeShadow, { width: size, height: size, borderRadius: size / 2, backgroundColor: '#B8B8B8', top: 7, left: 0 }]} />
    <View style={[styles.nodeFace, { width: size, height: size, borderRadius: size / 2, backgroundColor: c.gray, top: 0, left: 0 }]}>
      <Svg width={size * .36} height={size * .41} viewBox="0 0 28 32">
        <Path d="M6 13V9a8 8 0 0 1 16 0v4" fill="none" stroke={c.grayDark} strokeWidth="4" />
        <Path d="M4 13h20v17H4z" fill={c.grayDark} />
        <Circle cx="14" cy="21" r="2" fill={c.gray} />
      </Svg>
    </View>
  </View>;
}

export function Counter({ image, value, color }: { image: any; value: number | string; color: string }) {
  return <View style={styles.counter}>
    <Image source={image} style={styles.counterImage} resizeMode="contain" />
    <Text style={[styles.counterValue, { color }]}>{value}</Text>
  </View>;
}

const styles = StyleSheet.create({
  button: { minHeight: 56, borderRadius: 16, borderBottomWidth: 4, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: 'white', fontFamily: font.black, fontSize: 17, letterSpacing: 1 },
  header: { height: 56, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 20 },
  close: { fontSize: 36, lineHeight: 42, color: c.grayDark, fontFamily: font.regular, width: 28, textAlign: 'center' },
  headerTitle: { color: c.text, fontFamily: font.black, fontSize: 22 },
  track: { flex: 1, height: 14, borderRadius: 10, backgroundColor: c.gray, overflow: 'hidden' },
  trackFill: { height: 14, borderRadius: 10, backgroundColor: c.green },
  nodeShadow: { position: 'absolute' },
  nodeFace: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  counter: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  counterImage: { width: 33, height: 33 },
  counterValue: { fontSize: 23, fontFamily: font.extra },
});
