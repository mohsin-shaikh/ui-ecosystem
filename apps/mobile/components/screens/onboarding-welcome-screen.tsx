import { Button, Column, ScrollView, Text } from "@expo/ui";
import { useRouter } from "expo-router";

import { UiScreen } from "@/components/ui-screen";
import {
  useMutedTextStyle,
  usePrimaryTextStyle,
} from "@/components/use-muted-text-style";
import { useOnboardingStore } from "@/lib/onboarding/onboarding-store";

export function OnboardingWelcomeScreen() {
  const router = useRouter();
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
          <Text textStyle={titleTextStyle}>Welcome</Text>
          <Text textStyle={mutedTextStyle}>
            Set up your profile in a few quick steps.
          </Text>
        </Column>

        <Button
          label="Get started"
          onPress={() => {
            setStep("preferences");
            router.push("/preferences");
          }}
        />
      </Column>
    </ScrollView>
    </UiScreen>
  );
}
