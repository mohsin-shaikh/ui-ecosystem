import { Stack } from "expo-router/stack";

export default function AdminLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: "Admin" }} />
      <Stack.Screen name="users" options={{ title: "Users" }} />
    </Stack>
  );
}
