import "react-native-gesture-handler";

import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppThemeProvider } from "../components/app-theme";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ title: "Log in" }} />
          <Stack.Screen name="signup" options={{ title: "Sign up" }} />
          <Stack.Screen name="detail/[id]" options={{ title: "Detail" }} />
        </Stack>
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}
