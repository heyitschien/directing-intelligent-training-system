import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { hitSlop, radius, semantic, spacing, typography } from '@/theme/tokens';

type Props = {
  visible: boolean;
  title: string;
  excerpt: string;
  onClose: () => void;
};

export function ReferenceModal({ visible, title, excerpt, onClose }: Props) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Reference</Text>
            <Text style={styles.headerSub}>{title}</Text>
            <Pressable
              onPress={onClose}
              hitSlop={hitSlop}
              accessibilityRole="button"
              accessibilityLabel="Close reference">
              <Text style={styles.close}>Done</Text>
            </Pressable>
          </View>
          <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.mono}>{excerpt}</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '88%',
    backgroundColor: semantic.surfaceElevated,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingBottom: spacing.xl,
  },
  header: {
    padding: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: semantic.border,
  },
  headerTitle: {
    color: semantic.textMuted,
    fontSize: typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headerSub: {
    color: semantic.textPrimary,
    fontSize: typography.title,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
  close: {
    position: 'absolute',
    right: spacing.lg,
    top: spacing.lg,
    color: semantic.success,
    fontSize: typography.body,
    fontWeight: '600',
  },
  scroll: {
    flexGrow: 0,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  mono: {
    color: semantic.textSecondary,
    fontSize: typography.small,
    lineHeight: 20,
    fontFamily: 'monospace',
  },
});
