import "react-native-gesture-handler";

import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="detail/[id]" options={{ title: "Detail" }} />
      </Stack>
    </>
  );
}
