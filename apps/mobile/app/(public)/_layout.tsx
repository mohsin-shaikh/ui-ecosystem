import { Stack } from "expo-router/stack";

export default function PublicLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="terms" options={{ title: "Terms" }} />
      <Stack.Screen name="privacy" options={{ title: "Privacy" }} />
    </Stack>
  );
}
