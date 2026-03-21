import { FlashList } from '@shopify/flash-list';
import { useMemo } from 'react';
import { AccessibilityInfo, StyleSheet, Switch, Text, View } from 'react-native';

import { ScreenChrome } from '@/components/ScreenChrome';
import { modules, modulesById } from '@/content/modules';
import { useAppStore, type ReflectionEntry } from '@/lib/store';
import { radius, semantic, spacing, typography } from '@/theme/tokens';

export default function ProgressScreen() {
  const streak = useAppStore((s) => s.streak);
  const lastActiveDate = useAppStore((s) => s.lastActiveDate);
  const reviewedAt = useAppStore((s) => s.reviewedAt);
  const moduleOpenCount = useAppStore((s) => s.moduleOpenCount);
  const drillCounts = useAppStore((s) => s.drillCounts);
  const reflections = useAppStore((s) => s.reflections);
  const reduceMotion = useAppStore((s) => s.reduceMotion);
  const setReduceMotion = useAppStore((s) => s.setReduceMotion);

  const reviewedCount = useMemo(() => Object.keys(reviewedAt).length, [reviewedAt]);

  const data = useMemo(() => reflections, [reflections]);

  const renderItem = ({ item }: { item: ReflectionEntry }) => {
    const title = modulesById[item.module_id]?.title ?? item.module_id;
    return (
      <View style={styles.ref}>
        <Text style={styles.refModule}>{title}</Text>
        <Text style={styles.refText}>{item.text}</Text>
        <Text style={styles.refDate}>{new Date(item.at).toLocaleString()}</Text>
      </View>
    );
  };

  return (
    <ScreenChrome edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.top}>
        <Text style={styles.h1}>Progress</Text>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNum}>{streak}</Text>
            <Text style={styles.statLabel}>Day streak</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNum}>{reviewedCount}</Text>
            <Text style={styles.statLabel}>Modules reviewed</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNum}>{reflections.length}</Text>
            <Text style={styles.statLabel}>Reflections</Text>
          </View>
        </View>
        {lastActiveDate ? (
          <Text style={styles.meta}>Last active: {lastActiveDate}</Text>
        ) : null}

        <View style={styles.a11yRow}>
          <Text style={styles.a11yLabel}>Reduce motion</Text>
          <Switch
            value={reduceMotion}
            onValueChange={(v) => {
              setReduceMotion(v);
              if (v) AccessibilityInfo.announceForAccessibility?.('Reduce motion on');
              else AccessibilityInfo.announceForAccessibility?.('Reduce motion off');
            }}
            accessibilityLabel="Reduce motion for animations"
          />
        </View>

        <Text style={styles.section}>Opens per module</Text>
        {modules.map((m) => (
          <View key={m.module_id} style={styles.row}>
            <Text style={styles.rowTitle}>{m.title}</Text>
            <Text style={styles.rowVal}>{moduleOpenCount[m.module_id] ?? 0}</Text>
          </View>
        ))}

        <Text style={styles.section}>Drill completions</Text>
        {Object.entries(drillCounts).length === 0 ? (
          <Text style={styles.empty}>Complete a drill in Practice to see counts.</Text>
        ) : (
          Object.entries(drillCounts).map(([k, v]) => (
            <View key={k} style={styles.row}>
              <Text style={styles.rowTitle}>{k}</Text>
              <Text style={styles.rowVal}>{v}</Text>
            </View>
          ))
        )}

        <Text style={styles.section}>Reflection log</Text>
      </View>

      <View style={styles.listWrap}>
        <FlashList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text style={styles.empty}>Save reflections from module screens to see them here.</Text>
          }
          contentContainerStyle={styles.listPad}
        />
      </View>
    </ScreenChrome>
  );
}

const styles = StyleSheet.create({
  top: {
    padding: spacing.lg,
    paddingBottom: spacing.sm,
  },
  h1: {
    color: semantic.textPrimary,
    fontSize: typography.display,
    fontWeight: '700',
    marginBottom: spacing.lg,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  stat: {
    flex: 1,
    backgroundColor: semantic.surface,
    marginHorizontal: 4,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: semantic.border,
  },
  statNum: {
    color: semantic.success,
    fontSize: typography.title,
    fontWeight: '800',
  },
  statLabel: {
    color: semantic.textMuted,
    fontSize: typography.caption,
    marginTop: 4,
  },
  meta: {
    color: semantic.textSecondary,
    fontSize: typography.caption,
    marginBottom: spacing.lg,
  },
  a11yRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    paddingVertical: spacing.sm,
  },
  a11yLabel: {
    color: semantic.textPrimary,
    fontSize: typography.body,
    fontWeight: '600',
  },
  section: {
    color: semantic.textPrimary,
    fontSize: typography.subtitle,
    fontWeight: '600',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: semantic.border,
  },
  rowTitle: {
    color: semantic.textSecondary,
    fontSize: typography.body,
    flex: 1,
    paddingRight: spacing.md,
  },
  rowVal: {
    color: semantic.textPrimary,
    fontWeight: '700',
    fontSize: typography.body,
  },
  empty: {
    color: semantic.textMuted,
    fontSize: typography.body,
    marginBottom: spacing.md,
  },
  listWrap: {
    flex: 1,
    minHeight: 200,
  },
  listPad: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  ref: {
    backgroundColor: semantic.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: semantic.border,
  },
  refModule: {
    color: semantic.success,
    fontSize: typography.caption,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  refText: {
    color: semantic.textPrimary,
    fontSize: typography.body,
    lineHeight: 22,
  },
  refDate: {
    color: semantic.textMuted,
    fontSize: typography.small,
    marginTop: spacing.sm,
  },
});
