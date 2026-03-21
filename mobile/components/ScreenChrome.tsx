import { StyleSheet, View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { semantic } from '@/theme/tokens';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
};

export function ScreenChrome({ children, style, edges }: Props) {
  return (
    <SafeAreaView style={[styles.safe, style]} edges={edges ?? ['top', 'left', 'right']}>
      <View style={styles.inner}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: semantic.background,
  },
  inner: {
    flex: 1,
  },
});
