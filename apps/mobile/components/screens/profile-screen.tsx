import { Button, Column, FieldGroup, ScrollView, Switch, Text } from "@expo/ui";
import { useRouter } from "expo-router";
import { useState } from "react";

import { FormTextInput } from "@/components/form-text-input";
import { UiScreen } from "@/components/ui-screen";
import { useMutedTextStyle } from "@/components/use-muted-text-style";
import { useCurrentUser } from "@/hooks/use-current-user";
import { queryClient } from "@/lib/api/query-client";
import {
  selectSession,
  selectUserRole,
  useAuthStore,
} from "@/lib/auth/auth-store";
import { useOnboardingStore } from "@/lib/onboarding/onboarding-store";

export function ProfileScreen() {
  const router = useRouter();
  const session = useAuthStore(selectSession);
  const role = useAuthStore(selectUserRole);
  const signOut = useAuthStore((state) => state.signOut);
  const resetOnboarding = useOnboardingStore((state) => state.resetOnboarding);
  const { data: user } = useCurrentUser();
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const mutedTextStyle = useMutedTextStyle({ fontSize: 14 });

  const handleSignOut = async () => {
    await signOut();
    queryClient.clear();
  };

  return (
    <UiScreen>
      <ScrollView>
        <Column spacing={16}>
          <FieldGroup>
            <FieldGroup.Section title="Account">
              <FormTextInput
                defaultValue={user?.email ?? session?.user.email ?? "Guest"}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={false}
              />
              <Text
                textStyle={mutedTextStyle}
                style={{ paddingHorizontal: 16, paddingVertical: 8 }}
              >
                {role ? `Role: ${role}` : "Not signed in"}
              </Text>
            </FieldGroup.Section>

            <FieldGroup.Section title="Preferences">
              <Switch
                label="Push notifications"
                value={notifications}
                onValueChange={setNotifications}
              />
              <Switch
                label="Product updates"
                value={marketing}
                onValueChange={setMarketing}
              />
            </FieldGroup.Section>

            <FieldGroup.Section title="About" titleUppercase={false}>
              <Text
                textStyle={mutedTextStyle}
                style={{ paddingHorizontal: 16, paddingVertical: 8 }}
              >
                Built with @expo/ui universal components. Settings rows use
                native Form layouts on iOS and Material-style lists on Android.
              </Text>
            </FieldGroup.Section>
          </FieldGroup>

          <Column spacing={12} style={{ paddingHorizontal: 16 }}>
            {role === "admin" ? (
              <Button
                label="Admin dashboard"
                onPress={() => router.push("/admin")}
              />
            ) : null}

            {session ? (
              <Button
                label="Sign out"
                variant="outlined"
                onPress={handleSignOut}
              />
            ) : (
              <>
                <Button label="Log in" onPress={() => router.push("/login")} />
                <Button
                  label="Create an account"
                  variant="outlined"
                  onPress={() => router.push("/signup")}
                />
              </>
            )}

            {session ? (
              <Button
                label="Replay onboarding"
                variant="text"
                onPress={resetOnboarding}
              />
            ) : null}
          </Column>
        </Column>
      </ScrollView>
    </UiScreen>
  );
}
