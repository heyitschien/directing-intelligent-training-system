import { useEffect } from 'react';
import { AccessibilityInfo } from 'react-native';

import { useAppStore } from '@/lib/store';

/**
 * Keeps Zustand `reduceMotion` aligned with system accessibility preference when enabled.
 */
export function ReduceMotionSync() {
  const setReduceMotion = useAppStore((s) => s.setReduceMotion);

  useEffect(() => {
    let subscription: { remove?: () => void } | undefined;

    const apply = (enabled: boolean) => {
      if (enabled) setReduceMotion(true);
    };

    AccessibilityInfo.isReduceMotionEnabled()
      .then(apply)
      .catch(() => {});

    const sub = AccessibilityInfo.addEventListener?.('reduceMotionChanged', apply);
    if (sub) subscription = sub;

    return () => subscription?.remove?.();
  }, [setReduceMotion]);

  return null;
}
