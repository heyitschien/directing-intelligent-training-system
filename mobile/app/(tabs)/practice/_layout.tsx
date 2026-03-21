import { Stack } from 'expo-router';

import { semantic } from '@/theme/tokens';

export default function PracticeStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: semantic.surface },
        headerTintColor: semantic.textPrimary,
        headerTitleStyle: { fontWeight: '600' },
        contentStyle: { backgroundColor: semantic.background },
      }}>
      <Stack.Screen name="index" options={{ title: 'Practice' }} />
      <Stack.Screen name="flash" options={{ title: 'Elite questions' }} />
      <Stack.Screen name="loop" options={{ title: 'Loop order' }} />
      <Stack.Screen name="prompts" options={{ title: 'Prompt lab' }} />
    </Stack>
  );
}
