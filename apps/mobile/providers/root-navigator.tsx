import { Stack } from "expo-router/stack";

import { useAuthGuards } from "@/hooks/use-auth-guards";
import {
  selectHasOtpChallenge,
  selectUserRole,
  useAuthStore,
} from "@/lib/auth/auth-store";

export function RootNavigator() {
  const { isReady, showAuth, showOnboarding, showApp } = useAuthGuards();

  if (!isReady) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={showAuth}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected guard={showOnboarding}>
        <Stack.Screen name="(onboarding)" />
      </Stack.Protected>

      <Stack.Protected guard={showApp}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      {/* Legal pages — reachable via /terms or /privacy, never the auth fallback */}
      <Stack.Screen name="(public)" options={{ headerShown: false }} />

      <Stack.Screen name="+not-found" options={{ title: "Not found" }} />
    </Stack>
  );
}

export function AuthStackNavigator() {
  const hasOtpChallenge = useAuthStore(selectHasOtpChallenge);

  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="login" options={{ title: "Log in" }} />
      <Stack.Screen name="signup" options={{ title: "Sign up" }} />
      <Stack.Screen
        name="forgot-password"
        options={{ title: "Reset password" }}
      />

      <Stack.Protected guard={hasOtpChallenge}>
        <Stack.Screen name="verify-otp" options={{ title: "Verify code" }} />
      </Stack.Protected>
    </Stack>
  );
}

export function AppStackNavigator() {
  const isAdmin = useAuthStore(selectUserRole) === "admin";

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />

      <Stack.Screen
        name="detail/[id]"
        options={{ headerShown: true, title: "Detail" }}
      />

      <Stack.Protected guard={isAdmin}>
        <Stack.Screen
          name="admin"
          options={{ presentation: "modal" }}
        />
      </Stack.Protected>
    </Stack>
  );
}
