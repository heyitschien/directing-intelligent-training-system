import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ScreenChrome } from '@/components/ScreenChrome';
import { modulesById } from '@/content/modules';
import { useAppStore } from '@/lib/store';
import { moduleAccents, radius, semantic, spacing, typography } from '@/theme/tokens';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function LoopDrillScreen() {
  const steps = modulesById.convergence?.loop_steps ?? [];
  const recordDrill = useAppStore((s) => s.recordDrill);

  const [pool, setPool] = useState<number[]>(() => shuffle(steps.map((s) => s.step)));
  const [picked, setPicked] = useState<number[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const reset = () => {
    setPool(shuffle(steps.map((s) => s.step)));
    setPicked([]);
    setMessage(null);
  };

  if (steps.length === 0) {
    return (
      <ScreenChrome>
        <Text style={styles.miss}>No loop steps in content.</Text>
      </ScreenChrome>
    );
  }

  const expectedNext = picked.length + 1;

  const tapStep = (n: number) => {
    if (n !== expectedNext) {
      setMessage(`Not yet — step ${expectedNext} comes first.`);
      return;
    }
    setPicked((p) => [...p, n]);
    setPool((pl) => pl.filter((x) => x !== n));
    setMessage(null);
    if (picked.length + 1 === steps.length) {
      recordDrill('loop');
      setMessage('Correct order. Strategist OS loop internalized.');
    }
  };

  const accent = moduleAccents.convergence;

  return (
    <ScreenChrome>
      <View style={styles.wrap}>
        <Text style={styles.instructions}>
          Tap steps in order: 1 → {steps.length}. Pool is shuffled each round.
        </Text>

        <Text style={styles.section}>Build the sequence</Text>
        <View style={styles.pickedRow}>
          {picked.map((n) => (
            <View key={n} style={[styles.pill, { borderColor: accent }]}>
              <Text style={[styles.pillText, { color: accent }]}>{n}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.section}>Available</Text>
        <View style={styles.pool}>
          {pool.map((n) => {
            const step = steps.find((s) => s.step === n);
            return (
              <Pressable
                key={n}
                style={({ pressed }) => [styles.poolBtn, pressed && { opacity: 0.85 }]}
                onPress={() => tapStep(n)}
                accessibilityRole="button"
                accessibilityLabel={`Step ${n} ${step?.title ?? ''}`}>
                <Text style={styles.poolNum}>{n}</Text>
                <Text style={styles.poolTitle} numberOfLines={2}>
                  {step?.title ?? ''}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {message ? <Text style={styles.msg}>{message}</Text> : null}

        <Pressable style={styles.btn} onPress={reset} accessibilityRole="button">
          <Text style={styles.btnText}>Shuffle again</Text>
        </Pressable>
      </View>
    </ScreenChrome>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: spacing.lg,
  },
  instructions: {
    color: semantic.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  section: {
    color: semantic.textMuted,
    fontSize: typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  pickedRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    minHeight: 44,
    marginBottom: spacing.lg,
  },
  pill: {
    borderWidth: 2,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  pillText: {
    fontWeight: '800',
    fontSize: typography.subtitle,
  },
  pool: {
    gap: spacing.sm,
  },
  poolBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: semantic.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: semantic.border,
    marginBottom: spacing.sm,
  },
  poolNum: {
    color: semantic.success,
    fontWeight: '800',
    width: 28,
    fontSize: typography.subtitle,
  },
  poolTitle: {
    color: semantic.textPrimary,
    flex: 1,
    fontSize: typography.body,
    fontWeight: '600',
  },
  msg: {
    color: semantic.textSecondary,
    marginTop: spacing.lg,
    fontSize: typography.body,
  },
  btn: {
    marginTop: 'auto',
    marginBottom: spacing.lg,
    backgroundColor: semantic.surfaceElevated,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: semantic.border,
  },
  btnText: {
    color: semantic.textPrimary,
    fontWeight: '700',
  },
  miss: {
    color: semantic.textSecondary,
    padding: spacing.lg,
  },
});
