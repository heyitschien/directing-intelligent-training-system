import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { StrategistMap } from '@/components/StrategistMap';
import { ScreenChrome } from '@/components/ScreenChrome';
import { modules } from '@/content/modules';
import { useAppStore } from '@/lib/store';
import { moduleAccents, radius, semantic, spacing, typography } from '@/theme/tokens';

export default function LearnIndexScreen() {
  const router = useRouter();
  const reviewedAt = useAppStore((s) => s.reviewedAt);
  const markModuleOpened = useAppStore((s) => s.markModuleOpened);

  return (
    <ScreenChrome>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.kicker}>Director of Intelligent Training</Text>
        <Text style={styles.h1}>Strategist map</Text>
        <Text style={styles.sub}>Tap the center or any node. Reviewed modules show a brighter ring.</Text>
        <StrategistMap />

        <Text style={styles.listTitle}>All modules</Text>
        {modules.map((m) => {
          const done = !!reviewedAt[m.module_id];
          return (
            <Pressable
              key={m.module_id}
              style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
              onPress={() => {
                markModuleOpened(m.module_id);
                router.push(`/(tabs)/learn/${m.module_id}`);
              }}
              accessibilityRole="button"
              accessibilityLabel={m.title}>
              <View style={[styles.dot, { backgroundColor: moduleAccents[m.module_id] ?? semantic.textMuted }]} />
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>{m.title}</Text>
                {m.subtitle ? <Text style={styles.rowSub}>{m.subtitle}</Text> : null}
              </View>
              {done ? <Text style={styles.badge}>Reviewed</Text> : null}
            </Pressable>
          );
        })}
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
  },
  sub: {
    color: semantic.textSecondary,
    fontSize: typography.body,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    lineHeight: 22,
  },
  listTitle: {
    color: semantic.textPrimary,
    fontSize: typography.subtitle,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: semantic.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: semantic.border,
  },
  rowPressed: {
    opacity: 0.85,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: spacing.md,
  },
  rowText: {
    flex: 1,
  },
  rowTitle: {
    color: semantic.textPrimary,
    fontSize: typography.body,
    fontWeight: '600',
  },
  rowSub: {
    color: semantic.textSecondary,
    fontSize: typography.caption,
    marginTop: 2,
  },
  badge: {
    color: semantic.success,
    fontSize: typography.small,
    fontWeight: '600',
  },
});
