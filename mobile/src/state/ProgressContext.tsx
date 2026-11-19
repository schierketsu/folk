import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Progress = { languageSelected: boolean; completed: string[]; chests: number[]; hearts: number; wrong: number };
const initial: Progress = { languageSelected: false, completed: [], chests: [], hearts: 5, wrong: 0 };
type Store = { ready: boolean; progress: Progress; selectLanguage: () => void; complete: (id: string) => void; openChest: (topic: number) => void; loseHeart: () => void; resetHearts: () => void };
const Context = createContext<Store | null>(null);
const key = 'folk-progress-v1';
export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<Progress>(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => { AsyncStorage.getItem(key).then(value => { if (value) setProgress({ ...initial, ...JSON.parse(value) }); }).finally(() => setReady(true)); }, []);
  useEffect(() => { if (ready) AsyncStorage.setItem(key, JSON.stringify(progress)); }, [progress, ready]);
  const value = useMemo<Store>(() => ({
    ready, progress,
    selectLanguage: () => setProgress(p => ({ ...p, languageSelected: true })),
    complete: id => setProgress(p => ({ ...p, completed: p.completed.includes(id) ? p.completed : [...p.completed, id] })),
    openChest: topic => setProgress(p => ({ ...p, chests: p.chests.includes(topic) ? p.chests : [...p.chests, topic] })),
    loseHeart: () => setProgress(p => ({ ...p, hearts: Math.max(0, p.hearts - 1), wrong: p.wrong + 1 })),
    resetHearts: () => setProgress(p => ({ ...p, hearts: 5 })),
  }), [progress, ready]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useProgress() { const value = useContext(Context); if (!value) throw new Error('ProgressProvider missing'); return value; }
