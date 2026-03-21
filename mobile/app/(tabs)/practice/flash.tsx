import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ScreenChrome } from '@/components/ScreenChrome';
import { modulesById } from '@/content/modules';
import { useAppStore } from '@/lib/store';
import { moduleAccents, radius, semantic, spacing, typography } from '@/theme/tokens';

export default function FlashDrillScreen() {
  const questioning = modulesById.questioning;
  const types = questioning?.question_types ?? [];
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const recordDrill = useAppStore((s) => s.recordDrill);
  const reduceMotion = useAppStore((s) => s.reduceMotion);

  const current = types[idx];
  if (!current) {
    return (
      <ScreenChrome>
        <Text style={styles.miss}>No question types in content.</Text>
      </ScreenChrome>
    );
  }

  const next = () => {
    setFlipped(false);
    setIdx((i) => (i + 1) % types.length);
    recordDrill('flash');
  };

  const accent = moduleAccents.questioning;

  return (
    <ScreenChrome>
      <View style={styles.wrap}>
        <Text style={styles.progress}>
          {idx + 1} / {types.length}
        </Text>
        <Pressable
          onPress={() => setFlipped((f) => !f)}
          style={({ pressed }) => [
            styles.card,
            { borderColor: accent },
            pressed && { opacity: reduceMotion ? 1 : 0.92 },
          ]}
          accessibilityRole="button"
          accessibilityLabel={flipped ? 'Show category' : 'Show question prompt'}>
          {!flipped ? (
            <>
              <Text style={[styles.cat, { color: accent }]}>{current.title}</Text>
              <Text style={styles.hint}>Tap to reveal the question</Text>
            </>
          ) : (
            <Text style={styles.quote}>{current.quote}</Text>
          )}
        </Pressable>

        <Pressable style={styles.btn} onPress={next} accessibilityRole="button">
          <Text style={styles.btnText}>Next</Text>
        </Pressable>
      </View>
    </ScreenChrome>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  progress: {
    color: semantic.textMuted,
    marginBottom: spacing.md,
    fontSize: typography.caption,
  },
  card: {
    minHeight: 220,
    borderRadius: radius.lg,
    borderWidth: 2,
    padding: spacing.xl,
    backgroundColor: semantic.surface,
    justifyContent: 'center',
  },
  cat: {
    fontSize: typography.title,
    fontWeight: '800',
    marginBottom: spacing.md,
  },
  hint: {
    color: semantic.textSecondary,
    fontSize: typography.body,
  },
  quote: {
    color: semantic.textPrimary,
    fontSize: typography.body,
    fontStyle: 'italic',
    lineHeight: 26,
  },
  btn: {
    marginTop: spacing.lg,
    backgroundColor: semantic.success,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  btnText: {
    color: semantic.background,
    fontWeight: '700',
    fontSize: typography.body,
  },
  miss: {
    color: semantic.textSecondary,
    padding: spacing.lg,
  },
});
