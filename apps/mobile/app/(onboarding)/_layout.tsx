import { Stack } from "expo-router/stack";

export const unstable_settings = {
  anchor: "index",
};

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: "Welcome" }} />
      <Stack.Screen name="preferences" options={{ title: "Preferences" }} />
      <Stack.Screen name="complete" options={{ title: "Complete" }} />
    </Stack>
  );
}
