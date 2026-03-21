import { Stack } from 'expo-router';

import { semantic } from '@/theme/tokens';

export default function LearnStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: semantic.surface },
        headerTintColor: semantic.textPrimary,
        headerTitleStyle: { fontWeight: '600' },
        contentStyle: { backgroundColor: semantic.background },
      }}>
      <Stack.Screen name="index" options={{ title: 'Learn' }} />
      <Stack.Screen name="[moduleId]" options={{ title: 'Module' }} />
    </Stack>
  );
}
