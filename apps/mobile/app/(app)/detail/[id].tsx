import { Button, Column, ScrollView, Text } from "@expo/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Stack } from "expo-router/stack";

import { UiScreen } from "@/components/ui-screen";
import { useMutedTextStyle } from "@/components/use-muted-text-style";
import { getDemoItem } from "@/constants/demo-items";

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const item = getDemoItem(id ?? "");
  const mutedTextStyle = useMutedTextStyle();

  return (
    <>
      <Stack.Screen options={{ title: item?.title ?? "Detail" }} />
      <UiScreen>
        <ScrollView style={{ padding: 16 }}>
          <Column spacing={16}>
            {item ? (
              <>
                <Text textStyle={{ fontSize: 22, fontWeight: "700" }}>
                  {item.title}
                </Text>
                <Text textStyle={mutedTextStyle}>{item.subtitle}</Text>
                <Text textStyle={{ fontSize: 16, lineHeight: 24 }}>
                  {item.description}
                </Text>
              </>
            ) : (
              <Text textStyle={mutedTextStyle}>
                {`No item found for id "${id}".`}
              </Text>
            )}

            <Button label="Go back" variant="outlined" onPress={router.back} />
          </Column>
        </ScrollView>
      </UiScreen>
    </>
  );
}
