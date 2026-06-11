import { Button, Column, ScrollView, Text } from "@expo/ui";
import { useRouter } from "expo-router";

import { UiScreen } from "@/components/ui-screen";
import {
  useMutedTextStyle,
  usePrimaryTextStyle,
} from "@/components/use-muted-text-style";

export function TermsScreen() {
  const router = useRouter();
  const mutedTextStyle = useMutedTextStyle();
  const titleTextStyle = usePrimaryTextStyle({
    fontSize: 28,
    fontWeight: "700",
  });

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/login");
  };

  return (
    <UiScreen>
      <ScrollView style={{ padding: 16 }}>
        <Column spacing={16}>
          <Text textStyle={titleTextStyle}>Terms of Service</Text>
          <Text textStyle={mutedTextStyle}>
            This is placeholder legal copy. Replace with your production terms
            before release.
          </Text>
          <Button label="Back" variant="outlined" onPress={handleBack} />
        </Column>
      </ScrollView>
    </UiScreen>
  );
}
