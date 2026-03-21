import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { ReferenceModal } from '@/components/ReferenceModal';
import { ScreenChrome } from '@/components/ScreenChrome';
import { getModule } from '@/content/modules';
import { useAppStore } from '@/lib/store';
import { hitSlop, moduleAccents, radius, semantic, spacing, typography } from '@/theme/tokens';
export default function ModuleDetailScreen() {
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();
  const router = useRouter();
  const [refOpen, setRefOpen] = useState(false);
  const [reflection, setReflection] = useState('');
  const markModuleReviewed = useAppStore((s) => s.markModuleReviewed);
  const addReflection = useAppStore((s) => s.addReflection);

  const mod = moduleId ? getModule(moduleId) : undefined;

  useEffect(() => {
    if (mod) {
      markModuleReviewed(mod.module_id);
    }
  }, [mod, markModuleReviewed]);

  if (!mod) {
    return (
      <ScreenChrome>
        <View style={styles.miss}>
          <Text style={styles.missText}>Module not found.</Text>
          <Pressable onPress={() => router.back()} accessibilityRole="button">
            <Text style={styles.link}>Go back</Text>
          </Pressable>
        </View>
      </ScreenChrome>
    );
  }

  const accent = moduleAccents[mod.module_id] ?? semantic.textPrimary;

  return (
    <>
      <Stack.Screen
        options={{
          title: mod.title,
          headerRight: () => (
            <Pressable
              onPress={() => setRefOpen(true)}
              hitSlop={hitSlop}
              accessibilityRole="button"
              accessibilityLabel="Open source reference">
              <Text style={styles.headerRef}>Reference</Text>
            </Pressable>
          ),
        }}
      />
      <ScreenChrome>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {mod.subtitle ? (
            <Text style={[styles.subtitle, { color: accent }]}>{mod.subtitle}</Text>
          ) : null}

          {mod.quotes?.map((q, i) => (
            <View key={i} style={[styles.quote, { borderLeftColor: accent }]}>
              <Text style={styles.quoteText}>{q.text}</Text>
            </View>
          ))}

          {mod.body.map((p, i) => (
            <Text key={i} style={styles.body}>
              {p}
            </Text>
          ))}

          {mod.training_checklist ? (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Training — do this every time</Text>
              {mod.training_checklist.map((item, i) => (
                <Text key={i} style={styles.bullet}>
                  • {item}
                </Text>
              ))}
            </View>
          ) : null}

          {mod.weak_strong_examples ? (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Vague vs strategist</Text>
              <Text style={styles.label}>They ask AI</Text>
              <Text style={styles.mono}>{mod.weak_strong_examples.weak}</Text>
              <Text style={[styles.label, { marginTop: spacing.md }]}>A strategist asks</Text>
              <Text style={styles.mono}>{mod.weak_strong_examples.strong}</Text>
            </View>
          ) : null}

          {mod.layers ? (
            <View style={styles.stack}>
              {mod.layers.map((layer, i) => (
                <View key={i} style={[styles.layerCard, { borderColor: accent }]}>
                  <Text style={[styles.layerTitle, { color: accent }]}>{layer.title}</Text>
                  {layer.bullets.map((b, j) => (
                    <Text key={j} style={styles.bullet}>
                      • {b}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          ) : null}

          {mod.examples ? (
            <View style={styles.card}>
              {mod.examples.map((ex, i) => (
                <View key={i} style={i > 0 ? { marginTop: spacing.lg } : undefined}>
                  <Text style={styles.label}>{ex.label}</Text>
                  <Text style={styles.mono}>{ex.content}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {mod.question_types ? (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Five elite question types</Text>
              {mod.question_types.map((qt) => (
                <View key={qt.id} style={styles.qt}>
                  <Text style={[styles.qtTitle, { color: accent }]}>{qt.title}</Text>
                  <Text style={styles.quoteSm}>{qt.quote}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {mod.traits ? (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Core traits</Text>
              {mod.traits.map((t, i) => (
                <Text key={i} style={styles.bullet}>
                  • {t}
                </Text>
              ))}
            </View>
          ) : null}

          {mod.loop_steps ? (
            <View style={styles.loop}>
              {mod.loop_steps.map((step) => (
                <View key={step.step} style={styles.loopRow}>
                  <View style={[styles.loopNum, { borderColor: accent }]}>
                    <Text style={{ color: accent, fontWeight: '700' }}>{step.step}</Text>
                  </View>
                  <View style={styles.loopBody}>
                    <Text style={styles.loopTitle}>{step.title}</Text>
                    {step.subtitle ? <Text style={styles.loopSub}>{step.subtitle}</Text> : null}
                    {step.bullets.map((b, j) => (
                      <Text key={j} style={styles.bullet}>
                        • {b}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          ) : null}

          {mod.comparisons ? (
            <View style={styles.compare}>
              <Text style={styles.cardTitle}>{mod.comparisons.weak_label}</Text>
              <View style={[styles.promptBox, styles.promptWeak]}>
                <Text style={styles.promptText}>{mod.comparisons.weak}</Text>
              </View>
              <Text style={[styles.cardTitle, { marginTop: spacing.lg }]}>{mod.comparisons.strong_label}</Text>
              <View style={[styles.promptBox, styles.promptStrong]}>
                <Text style={styles.promptText}>{mod.comparisons.strong}</Text>
              </View>
            </View>
          ) : null}

          {mod.module_id === 'evolution' ? (
            <View style={styles.ladder}>
              {['User', 'Operator', 'Strategist', 'Architect'].map((rung, i) => (
                <View key={rung} style={styles.ladderRow}>
                  <Text style={[styles.ladderNum, { color: accent }]}>{i + 1}</Text>
                  <Text style={styles.ladderText}>{rung}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {mod.reflection_prompt ? (
            <View style={styles.reflect}>
              <Text style={styles.cardTitle}>Reflection</Text>
              <Text style={styles.body}>{mod.reflection_prompt}</Text>
              <TextInput
                value={reflection}
                onChangeText={setReflection}
                placeholder="One line…"
                placeholderTextColor={semantic.textMuted}
                style={styles.input}
                multiline
                accessibilityLabel="Reflection input"
              />
              <Pressable
                style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.85 : 1 }]}
                onPress={() => {
                  addReflection(mod.module_id, reflection);
                  setReflection('');
                }}
                accessibilityRole="button"
                accessibilityLabel="Save reflection">
                <Text style={styles.btnText}>Save to Progress</Text>
              </Pressable>
            </View>
          ) : null}
        </ScrollView>
      </ScreenChrome>

      <ReferenceModal
        visible={refOpen}
        onClose={() => setRefOpen(false)}
        title={mod.title}
        excerpt={mod.source_excerpt}
      />
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  subtitle: {
    fontSize: typography.subtitle,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  quote: {
    borderLeftWidth: 3,
    paddingLeft: spacing.md,
    marginBottom: spacing.lg,
  },
  quoteText: {
    color: semantic.textPrimary,
    fontSize: typography.body,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  body: {
    color: semantic.textSecondary,
    fontSize: typography.body,
    lineHeight: 24,
    marginBottom: spacing.md,
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
  bullet: {
    color: semantic.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
    marginBottom: spacing.xs,
  },
  label: {
    color: semantic.textMuted,
    fontSize: typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  mono: {
    color: semantic.textPrimary,
    fontSize: typography.small,
    lineHeight: 20,
  },
  stack: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  layerCard: {
    backgroundColor: semantic.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    borderWidth: 1,
  },
  layerTitle: {
    fontSize: typography.subtitle,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  qt: {
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: semantic.border,
  },
  qtTitle: {
    fontSize: typography.body,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  quoteSm: {
    color: semantic.textSecondary,
    fontSize: typography.body,
    fontStyle: 'italic',
  },
  loop: {
    marginBottom: spacing.lg,
  },
  loopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  loopNum: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  loopBody: {
    flex: 1,
  },
  loopTitle: {
    color: semantic.textPrimary,
    fontSize: typography.body,
    fontWeight: '700',
  },
  loopSub: {
    color: semantic.textMuted,
    fontSize: typography.caption,
    marginBottom: spacing.xs,
  },
  compare: {
    marginBottom: spacing.lg,
  },
  promptBox: {
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  promptWeak: {
    backgroundColor: semantic.surface,
    borderWidth: 1,
    borderColor: semantic.border,
  },
  promptStrong: {
    backgroundColor: semantic.surfaceElevated,
    borderWidth: 1,
    borderColor: semantic.border,
  },
  promptText: {
    color: semantic.textPrimary,
    fontSize: typography.small,
    lineHeight: 22,
  },
  ladder: {
    marginBottom: spacing.lg,
  },
  ladderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: semantic.border,
  },
  ladderNum: {
    width: 28,
    fontWeight: '700',
  },
  ladderText: {
    color: semantic.textPrimary,
    fontSize: typography.subtitle,
    fontWeight: '600',
  },
  reflect: {
    marginTop: spacing.md,
    marginBottom: spacing.xxl,
  },
  input: {
    marginTop: spacing.md,
    backgroundColor: semantic.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    color: semantic.textPrimary,
    minHeight: 80,
    borderWidth: 1,
    borderColor: semantic.border,
  },
  btn: {
    marginTop: spacing.md,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  missText: {
    color: semantic.textSecondary,
    marginBottom: spacing.md,
  },
  link: {
    color: semantic.success,
    fontSize: typography.body,
  },
  headerRef: {
    color: semantic.success,
    fontSize: typography.body,
    fontWeight: '600',
    marginRight: spacing.md,
  },
});
