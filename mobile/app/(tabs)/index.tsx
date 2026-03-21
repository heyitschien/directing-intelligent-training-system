import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ScreenChrome } from '@/components/ScreenChrome';
import { getModule, modulesById } from '@/content/modules';
import { moduleIdsForFocus, useAppStore } from '@/lib/store';
import { moduleAccents, radius, semantic, spacing, typography } from '@/theme/tokens';
export default function HomeScreen() {
  const router = useRouter();
  const lastModuleId = useAppStore((s) => s.lastModuleId);
  const advanceDailyFocus = useAppStore((s) => s.advanceDailyFocus);
  const dailyFocusIndex = useAppStore((s) => s.dailyFocusIndex);
  const focusId = moduleIdsForFocus[dailyFocusIndex % moduleIdsForFocus.length];
  const focusMod = getModule(focusId);
  const convergence = modulesById.convergence;

  const continueId = lastModuleId && modulesById[lastModuleId] ? lastModuleId : 'intent';
  const continueMod = getModule(continueId);

  return (
    <ScreenChrome>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.kicker}>Director of Intelligent Training</Text>
        <Text style={styles.h1}>Today</Text>

        {focusMod ? (
          <View style={[styles.focus, { borderColor: moduleAccents[focusMod.module_id] }]}>
            <Text style={styles.focusLabel}>Daily focus</Text>
            <Text style={styles.focusTitle}>{focusMod.title}</Text>
            <Text style={styles.focusSub} numberOfLines={2}>
              {focusMod.reflection_prompt ?? focusMod.subtitle ?? ''}
            </Text>
            <View style={styles.row}>
              <Pressable
                style={[styles.btn, { backgroundColor: moduleAccents[focusMod.module_id] }]}
                onPress={() => router.push(`/(tabs)/learn/${focusMod.module_id}`)}
                accessibilityRole="button"
                accessibilityLabel="Open daily focus module">
                <Text style={styles.btnTextDark}>Open module</Text>
              </Pressable>
              <Pressable
                style={styles.btnGhost}
                onPress={() => advanceDailyFocus()}
                accessibilityRole="button"
                accessibilityLabel="Rotate daily focus">
                <Text style={styles.btnGhostText}>Next focus</Text>
              </Pressable>
            </View>
          </View>
        ) : null}

        {convergence?.loop_steps ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Strategist loop</Text>
            <View style={styles.loopSnap}>
              {convergence.loop_steps.map((s) => (
                <View key={s.step} style={styles.loopChip}>
                  <Text style={styles.loopChipNum}>{s.step}</Text>
                  <Text style={styles.loopChipText} numberOfLines={1}>
                    {s.title.replace(/ \(Yi\)| \(Li\)/g, '')}
                  </Text>
                </View>
              ))}
            </View>
            <Pressable
              onPress={() => router.push('/(tabs)/learn/convergence')}
              accessibilityRole="button">
              <Text style={styles.link}>Open full loop</Text>
            </Pressable>
          </View>
        ) : null}

        {continueMod ? (
          <Pressable
            style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}
            onPress={() => router.push(`/(tabs)/learn/${continueMod.module_id}`)}
            accessibilityRole="button">
            <Text style={styles.cardTitle}>Continue learning</Text>
            <Text style={styles.continueTitle}>{continueMod.title}</Text>
            <Text style={styles.continueSub}>Resume where you left off</Text>
          </Pressable>
        ) : null}

        <Text style={styles.cardTitle}>Quick drills</Text>
        <View style={styles.drills}>
          <Pressable
            style={styles.drill}
            onPress={() => router.push('/(tabs)/practice/flash')}
            accessibilityRole="button"
            accessibilityLabel="Question type flash cards">
            <Text style={styles.drillTitle}>Elite questions</Text>
            <Text style={styles.drillSub}>Flash review</Text>
          </Pressable>
          <Pressable
            style={styles.drill}
            onPress={() => router.push('/(tabs)/practice/loop')}
            accessibilityRole="button"
            accessibilityLabel="Order strategist loop steps">
            <Text style={styles.drillTitle}>Loop order</Text>
            <Text style={styles.drillSub}>Sequence</Text>
          </Pressable>
          <Pressable
            style={styles.drill}
            onPress={() => router.push('/(tabs)/practice/prompts')}
            accessibilityRole="button"
            accessibilityLabel="Compare prompts drill">
            <Text style={styles.drillTitle}>Prompt lab</Text>
            <Text style={styles.drillSub}>Compare</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenChrome>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  kicker: {
    color: semantic.textMuted,
    fontSize: typography.caption,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  h1: {
    color: semantic.textPrimary,
    fontSize: typography.display,
    fontWeight: '700',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  focus: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    backgroundColor: semantic.surface,
    marginBottom: spacing.lg,
  },
  focusLabel: {
    color: semantic.textMuted,
    fontSize: typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  focusTitle: {
    color: semantic.textPrimary,
    fontSize: typography.title,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  focusSub: {
    color: semantic.textSecondary,
    fontSize: typography.body,
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
    flexWrap: 'wrap',
  },
  btn: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
  },
  btnTextDark: {
    color: semantic.background,
    fontWeight: '700',
  },
  btnGhost: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: semantic.border,
  },
  btnGhostText: {
    color: semantic.textPrimary,
    fontWeight: '600',
  },
  card: {
    backgroundColor: semantic.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: semantic.border,
  },
  cardTitle: {
    color: semantic.textPrimary,
    fontSize: typography.subtitle,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  loopSnap: {
    gap: spacing.sm,
  },
  loopChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: semantic.surfaceElevated,
    borderRadius: radius.sm,
    padding: spacing.sm,
    marginBottom: spacing.xs,
  },
  loopChipNum: {
    color: semantic.success,
    fontWeight: '700',
    width: 24,
  },
  loopChipText: {
    color: semantic.textSecondary,
    flex: 1,
    fontSize: typography.caption,
  },
  link: {
    color: semantic.success,
    fontWeight: '600',
    marginTop: spacing.md,
    fontSize: typography.body,
  },
  continueTitle: {
    color: semantic.textPrimary,
    fontSize: typography.title,
    fontWeight: '600',
  },
  continueSub: {
    color: semantic.textMuted,
    marginTop: spacing.xs,
    fontSize: typography.caption,
  },
  drills: {
    gap: spacing.sm,
  },
  drill: {
    backgroundColor: semantic.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: semantic.border,
    marginBottom: spacing.sm,
  },
  drillTitle: {
    color: semantic.textPrimary,
    fontSize: typography.body,
    fontWeight: '700',
  },
  drillSub: {
    color: semantic.textMuted,
    fontSize: typography.caption,
    marginTop: 2,
  },
});
