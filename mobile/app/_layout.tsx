import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ReduceMotionSync } from '@/components/ReduceMotionSync';
import { useAppStore } from '@/lib/store';
import { semantic } from '@/theme/tokens';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

const DirectorTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: semantic.success,
    background: semantic.background,
    card: semantic.surface,
    text: semantic.textPrimary,
    border: semantic.border,
    notification: semantic.success,
  },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    useAppStore.getState().touchApp();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={DirectorTheme}>
        <ReduceMotionSync />
        <StatusBar barStyle="light-content" />
        <Stack screenOptions={{ contentStyle: { backgroundColor: semantic.background } }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
