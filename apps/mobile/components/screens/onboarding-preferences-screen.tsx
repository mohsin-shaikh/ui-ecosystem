import { Button, Column, ScrollView, Switch, Text } from "@expo/ui";
import { useRouter } from "expo-router";

import { UiScreen } from "@/components/ui-screen";
import {
  useMutedTextStyle,
  usePrimaryTextStyle,
} from "@/components/use-muted-text-style";
import { useOnboardingStore } from "@/lib/onboarding/onboarding-store";

export function OnboardingPreferencesScreen() {
  const router = useRouter();
  const preferences = useOnboardingStore((state) => state.preferences);
  const setPreferences = useOnboardingStore((state) => state.setPreferences);
  const setStep = useOnboardingStore((state) => state.setStep);
  const mutedTextStyle = useMutedTextStyle();
  const titleTextStyle = usePrimaryTextStyle({
    fontSize: 28,
    fontWeight: "700",
  });

  return (
    <UiScreen>
    <ScrollView style={{ padding: 16 }}>
      <Column spacing={24}>
        <Column spacing={8}>
          <Text textStyle={titleTextStyle}>Your preferences</Text>
          <Text textStyle={mutedTextStyle}>
            Choose how you want to use the app.
          </Text>
        </Column>

        <Switch
          label="Enable notifications"
          value={preferences.notifications}
          onValueChange={(notifications) => setPreferences({ notifications })}
        />

        <Button
          label="Continue"
          onPress={() => {
            setStep("complete");
            router.push("/complete");
          }}
        />
      </Column>
    </ScrollView>
    </UiScreen>
  );
}
