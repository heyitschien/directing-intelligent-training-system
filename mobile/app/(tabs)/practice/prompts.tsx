import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ScreenChrome } from '@/components/ScreenChrome';
import { modulesById } from '@/content/modules';
import { useAppStore } from '@/lib/store';
import { radius, semantic, spacing, typography } from '@/theme/tokens';

const CHECKS = [
  { id: 'outcome', label: 'Concrete outcome and time horizon' },
  { id: 'constraints', label: 'Constraints (time, skills, capital)' },
  { id: 'structure', label: 'Asks for structured breakdown (system, levers, strategy)' },
  { id: 'risks', label: 'Explicit risks / failure points' },
  { id: 'execution', label: 'Step-by-step execution + optimization ask' },
] as const;

export default function PromptsDrillScreen() {
  const prompting = modulesById.prompting;
  const comp = prompting?.comparisons;
  const recordDrill = useAppStore((s) => s.recordDrill);
  const [sel, setSel] = useState<Record<string, boolean>>({});

  const allOn = CHECKS.every((c) => sel[c.id]);

  const toggle = (id: string) => setSel((s) => ({ ...s, [id]: !s[id] }));

  if (!comp) {
    return (
      <ScreenChrome>
        <Text style={styles.miss}>No prompt comparison in content.</Text>
      </ScreenChrome>
    );
  }

  return (
    <ScreenChrome>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.task}>
          Read both prompts. Toggle each element that appears in the strategist-level prompt (and is
          missing from the weak one).
        </Text>

        <Text style={styles.label}>{comp.weak_label}</Text>
        <View style={[styles.box, styles.weak]}>
          <Text style={styles.prompt}>{comp.weak}</Text>
        </View>

        <Text style={[styles.label, { marginTop: spacing.lg }]}>{comp.strong_label}</Text>
        <View style={[styles.box, styles.strong]}>
          <Text style={styles.prompt}>{comp.strong}</Text>
        </View>

        <Text style={[styles.label, { marginTop: spacing.lg }]}>Checklist</Text>
        {CHECKS.map((c) => (
          <Pressable
            key={c.id}
            onPress={() => toggle(c.id)}
            style={({ pressed }) => [styles.checkRow, pressed && { opacity: 0.9 }]}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: !!sel[c.id] }}>
            <View style={[styles.checkbox, sel[c.id] && styles.checkboxOn]} />
            <Text style={styles.checkLabel}>{c.label}</Text>
          </Pressable>
        ))}

        <Pressable
          style={[styles.btn, !allOn && styles.btnDisabled]}
          disabled={!allOn}
          onPress={() => recordDrill('prompts')}
          accessibilityRole="button"
          accessibilityLabel="Complete prompt drill">
          <Text style={styles.btnText}>{allOn ? 'Logged — nice work' : 'Complete all to log'}</Text>
        </Pressable>
      </ScrollView>
    </ScreenChrome>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  task: {
    color: semantic.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  label: {
    color: semantic.textMuted,
    fontSize: typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  box: {
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  weak: {
    backgroundColor: semantic.surface,
    borderWidth: 1,
    borderColor: semantic.border,
  },
  strong: {
    backgroundColor: semantic.surfaceElevated,
    borderWidth: 1,
    borderColor: semantic.border,
  },
  prompt: {
    color: semantic.textPrimary,
    fontSize: typography.small,
    lineHeight: 22,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: semantic.border,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: semantic.border,
    marginRight: spacing.md,
  },
  checkboxOn: {
    backgroundColor: semantic.success,
    borderColor: semantic.success,
  },
  checkLabel: {
    color: semantic.textPrimary,
    fontSize: typography.body,
    flex: 1,
  },
  btn: {
    marginTop: spacing.xl,
    backgroundColor: semantic.success,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  btnDisabled: {
    opacity: 0.45,
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
