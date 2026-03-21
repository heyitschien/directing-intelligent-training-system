import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

import { modulesById } from '@/content/modules';
import { useAppStore } from '@/lib/store';
import { moduleAccents, semantic, spacing, typography } from '@/theme/tokens';
import { SATELLITE_MODULE_ORDER } from '@/types/content';

const R = 118;
const NODE_R = 36;
const CORE_R = 44;

export function StrategistMap() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const reviewedAt = useAppStore((s) => s.reviewedAt);
  const markModuleOpened = useAppStore((s) => s.markModuleOpened);

  const cx = width / 2;
  const cy = 200;

  const satellites = SATELLITE_MODULE_ORDER.map((id, i) => {
    const angle = (2 * Math.PI * i) / SATELLITE_MODULE_ORDER.length - Math.PI / 2;
    return {
      id,
      x: cx + R * Math.cos(angle),
      y: cy + R * Math.sin(angle),
      label: modulesById[id]?.title.split(' ').slice(0, 2).join(' ') ?? id,
    };
  });

  const onOpen = (id: string) => {
    markModuleOpened(id);
    router.push(`/(tabs)/learn/${id}`);
  };

  return (
    <View style={styles.wrap}>
      <Svg width={width} height={cy * 2 + 20} style={styles.svg}>
        {satellites.map((s) => (
          <Line
            key={`ln-${s.id}`}
            x1={cx}
            y1={cy}
            x2={s.x}
            y2={s.y}
            stroke={semantic.border}
            strokeWidth={1}
          />
        ))}
        <Circle cx={cx} cy={cy} r={CORE_R} fill={semantic.surfaceElevated} stroke={moduleAccents.core} strokeWidth={2} />
        {satellites.map((s) => {
          const reviewed = reviewedAt[s.id];
          return (
            <Circle
              key={s.id}
              cx={s.x}
              cy={s.y}
              r={NODE_R}
              fill={semantic.surfaceElevated}
              stroke={reviewed ? moduleAccents[s.id] : semantic.border}
              strokeWidth={reviewed ? 2 : 1}
            />
          );
        })}
      </Svg>

      <Pressable
        style={[styles.coreHit, { left: cx - CORE_R, top: cy - CORE_R }]}
        onPress={() => onOpen('core')}
        accessibilityRole="button"
        accessibilityLabel="Open Strategist OS overview">
        <Text style={styles.coreText}>OS</Text>
      </Pressable>

      {satellites.map((s) => (
        <Pressable
          key={s.id}
          style={[styles.nodeHit, { left: s.x - NODE_R, top: s.y - NODE_R }]}
          onPress={() => onOpen(s.id)}
          accessibilityRole="button"
          accessibilityLabel={`Open ${modulesById[s.id]?.title}`}>
          <Text style={[styles.nodeLabel, { color: moduleAccents[s.id] ?? semantic.textPrimary }]} numberOfLines={2}>
            {s.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 420,
    marginBottom: spacing.md,
  },
  svg: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  coreHit: {
    position: 'absolute',
    width: CORE_R * 2,
    height: CORE_R * 2,
    borderRadius: CORE_R,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coreText: {
    color: moduleAccents.core,
    fontWeight: '700',
    fontSize: typography.subtitle,
  },
  nodeHit: {
    position: 'absolute',
    width: NODE_R * 2,
    height: NODE_R * 2,
    borderRadius: NODE_R,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
  },
  nodeLabel: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
});
