import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { modules } from '@/content/modules';
import { SATELLITE_MODULE_ORDER } from '@/types/content';

export interface ReflectionEntry {
  id: string;
  module_id: string;
  text: string;
  at: string;
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const d1 = new Date(a).getTime();
  const d2 = new Date(b).getTime();
  return Math.round((d2 - d1) / (24 * 60 * 60 * 1000));
}

type AppState = {
  lastModuleId: string | null;
  /** last ISO date (YYYY-MM-DD) each module was marked reviewed */
  reviewedAt: Record<string, string>;
  moduleOpenCount: Record<string, number>;
  drillCounts: Record<string, number>;
  streak: number;
  lastActiveDate: string | null;
  dailyFocusIndex: number;
  reflections: ReflectionEntry[];
  reduceMotion: boolean;

  touchApp: () => void;
  markModuleOpened: (moduleId: string) => void;
  markModuleReviewed: (moduleId: string) => void;
  recordDrill: (drillId: string) => void;
  addReflection: (moduleId: string, text: string) => void;
  setReduceMotion: (value: boolean) => void;
  advanceDailyFocus: () => void;
};

const moduleIdsForFocus = ['core', ...SATELLITE_MODULE_ORDER];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      lastModuleId: null,
      reviewedAt: {},
      moduleOpenCount: {},
      drillCounts: {},
      streak: 0,
      lastActiveDate: null,
      dailyFocusIndex: 0,
      reflections: [],
      reduceMotion: false,

      touchApp: () => {
        const t = todayISO();
        const prev = get().lastActiveDate;
        let streak = get().streak;
        if (!prev) streak = 1;
        else {
          const diff = daysBetween(prev, t);
          if (diff === 0) {
            /* same day */
          } else if (diff === 1) streak += 1;
          else streak = 1;
        }
        set({ lastActiveDate: t, streak });
      },

      markModuleOpened: (moduleId) =>
        set((s) => ({
          lastModuleId: moduleId,
          moduleOpenCount: {
            ...s.moduleOpenCount,
            [moduleId]: (s.moduleOpenCount[moduleId] ?? 0) + 1,
          },
        })),

      markModuleReviewed: (moduleId) =>
        set((s) => ({
          reviewedAt: { ...s.reviewedAt, [moduleId]: todayISO() },
        })),

      recordDrill: (drillId) =>
        set((s) => ({
          drillCounts: { ...s.drillCounts, [drillId]: (s.drillCounts[drillId] ?? 0) + 1 },
        })),

      addReflection: (moduleId, text) => {
        const entry: ReflectionEntry = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          module_id: moduleId,
          text: text.trim(),
          at: new Date().toISOString(),
        };
        if (!entry.text) return;
        set((s) => ({ reflections: [entry, ...s.reflections].slice(0, 200) }));
      },

      setReduceMotion: (value) => set({ reduceMotion: value }),

      advanceDailyFocus: () =>
        set((s) => ({
          dailyFocusIndex: (s.dailyFocusIndex + 1) % moduleIdsForFocus.length,
        })),
    }),
    {
      name: 'director-intelligent-training',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        lastModuleId: s.lastModuleId,
        reviewedAt: s.reviewedAt,
        moduleOpenCount: s.moduleOpenCount,
        drillCounts: s.drillCounts,
        streak: s.streak,
        lastActiveDate: s.lastActiveDate,
        dailyFocusIndex: s.dailyFocusIndex,
        reflections: s.reflections,
        reduceMotion: s.reduceMotion,
      }),
    }
  )
);

export function getDailyFocusModuleId(): string {
  const i = useAppStore.getState().dailyFocusIndex;
  return moduleIdsForFocus[i % moduleIdsForFocus.length];
}

export { moduleIdsForFocus };
