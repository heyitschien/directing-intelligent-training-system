import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ScreenChrome } from '@/components/ScreenChrome';
import { radius, semantic, spacing, typography } from '@/theme/tokens';

export default function PracticeIndexScreen() {
  const router = useRouter();

  return (
    <ScreenChrome>
      <View style={styles.wrap}>
        <Text style={styles.sub}>
          Short drills you can finish between tasks. Each one maps to content in Learn.
        </Text>

        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.pressed]}
          onPress={() => router.push('/(tabs)/practice/flash')}
          accessibilityRole="button">
          <Text style={styles.title}>Flash review</Text>
          <Text style={styles.desc}>Five elite question types — tap to reveal the prompt.</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.pressed]}
          onPress={() => router.push('/(tabs)/practice/loop')}
          accessibilityRole="button">
          <Text style={styles.title}>Sequence</Text>
          <Text style={styles.desc}>Tap the five loop steps in the correct order.</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.pressed]}
          onPress={() => router.push('/(tabs)/practice/prompts')}
          accessibilityRole="button">
          <Text style={styles.title}>Prompt comparison</Text>
          <Text style={styles.desc}>Confirm what the strategist-level prompt includes.</Text>
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
  sub: {
    color: semantic.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: semantic.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: semantic.border,
  },
  pressed: { opacity: 0.9 },
  title: {
    color: semantic.textPrimary,
    fontSize: typography.subtitle,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  desc: {
    color: semantic.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
});
