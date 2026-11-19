import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path, SvgXml } from 'react-native-svg';
import { icons } from '../assets/icons';
import { images } from '../assets/images';
import { c, font } from '../theme';

export function Icon({ name, size = 32 }: { name: keyof typeof icons; size?: number }) {
  return <SvgXml xml={icons[name]} width={size} height={size} />;
}

export function Button({ title, onPress, color = c.green, shadowColor, textColor = 'white', disabled = false }: { title: string; onPress: () => void; color?: string; shadowColor?: string; textColor?: string; disabled?: boolean }) {
  return <Pressable disabled={disabled} onPress={onPress} style={[styles.button, { backgroundColor: disabled ? c.gray : color, borderBottomColor: disabled ? c.grayDark : shadowColor ?? (color === c.green ? c.greenDark : c.blueDark) }]}>
    <Text style={[styles.buttonText, { color: disabled ? 'white' : textColor }]}>{title}</Text>
  </Pressable>;
}

export function PageHeader({ title, onClose, progress }: { title?: string; onClose: () => void; progress?: number }) {
  return <View style={styles.header}>
    <Pressable onPress={onClose} hitSlop={16}><Text style={styles.close}>×</Text></Pressable>
    {progress === undefined ? <Text style={styles.headerTitle}>{title}</Text> : <View style={styles.track}><View style={[styles.trackFill, { width: `${progress * 100}%` }]} /></View>}
    <View style={{ width: 28 }} />
  </View>;
}

export function StarRing({ active = false, color = c.green, shadowColor = c.greenDark }: { active?: boolean; color?: string; shadowColor?: string }) {
  return <View style={{ width: 118, height: 108 }}>
    {active && <Svg width={118} height={108} viewBox="0 0 118 108" style={StyleSheet.absoluteFill}>
      <Path d="M52 6 A52 44 0 0 0 7 44" fill="none" stroke={c.gray} strokeWidth="8" strokeLinecap="round" />
      <Path d="M7 56 C10 78 27 98 52 98" fill="none" stroke={c.gray} strokeWidth="8" strokeLinecap="round" />
      <Path d="M66 98 C91 98 108 78 111 56" fill="none" stroke={c.gray} strokeWidth="8" strokeLinecap="round" />
      <Path d="M111 44 A52 44 0 0 0 66 6" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" />
    </Svg>}
    <View style={[styles.nodeShadow, styles.starShadow, { backgroundColor: shadowColor }]} />
    <View style={[styles.nodeFace, styles.starFace, { backgroundColor: color }]}>
      <Image source={images.mapStar} style={styles.stageStar} resizeMode="contain" />
    </View>
  </View>;
}

export function LockedNode() {
  return <View style={{ width: 84, height: 69 }}>
    <View style={[styles.nodeShadow, styles.lockShadow]} />
    <View style={[styles.nodeFace, styles.lockFace]}>
      <Svg width={29} height={30} viewBox="0 0 36 36">
        <Path d="M6 19v-7a12 12 0 0 1 24 0v7h-5v-7a7 7 0 0 0-14 0v7H6Z" fill={c.grayDark} />
        <Path d="M4 17h28a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V20a3 3 0 0 1 3-3Z" fill={c.grayDark} />
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
  starShadow: { width: 84, height: 62, borderRadius: 31, backgroundColor: c.greenDark, top: 22, left: 17 },
  starFace: { width: 84, height: 62, borderRadius: 31, backgroundColor: c.green, top: 17, left: 17 },
  stageStar: { width: 36, height: 36, tintColor: 'white' },
  lockShadow: { width: 84, height: 62, borderRadius: 31, backgroundColor: '#B8B8B8', top: 7, left: 0 },
  lockFace: { width: 84, height: 62, borderRadius: 31, backgroundColor: c.gray, top: 0, left: 0 },
  counter: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  counterImage: { width: 39, height: 39 },
  counterValue: { fontSize: 26, fontFamily: font.extra },
});
