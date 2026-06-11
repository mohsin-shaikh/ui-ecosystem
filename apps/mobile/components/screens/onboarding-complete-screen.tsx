import { Button, Column, ScrollView, Text } from "@expo/ui";

import { UiScreen } from "@/components/ui-screen";
import {
  useMutedTextStyle,
  usePrimaryTextStyle,
} from "@/components/use-muted-text-style";
import { useOnboardingStore } from "@/lib/onboarding/onboarding-store";

export function OnboardingCompleteScreen() {
  const finishOnboarding = useOnboardingStore((state) => state.finishOnboarding);
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
          <Text textStyle={titleTextStyle}>You are all set</Text>
          <Text textStyle={mutedTextStyle}>
            Your account is ready. Tap below to enter the app.
          </Text>
        </Column>

        <Button label="Go to app" onPress={finishOnboarding} />
      </Column>
    </ScrollView>
    </UiScreen>
  );
}
