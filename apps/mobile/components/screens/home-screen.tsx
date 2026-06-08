import { Button, Column, ListItem, ScrollView, Text } from "@expo/ui";
import { useRouter } from "expo-router";

import { DEMO_ITEMS } from "../../constants/demo-items";
import type { TabScreenProps } from "../main-tabs/types";
import { useMutedTextStyle } from "../use-muted-text-style";

export function HomeScreen({ onSelectTab }: TabScreenProps) {
  const router = useRouter();
  const mutedTextStyle = useMutedTextStyle();

  return (
    <ScrollView style={{ paddingBottom: 24 }}>
      <Column spacing={16} style={{ padding: 16 }}>
        <Text textStyle={mutedTextStyle}>
          Tap a topic to open its detail screen. Components below use @expo/ui
          native rendering on iOS and Android.
        </Text>

        <Column spacing={0}>
          {DEMO_ITEMS.map((item) => (
            <ListItem
              key={item.id}
              supportingText={item.subtitle}
              trailing="›"
              onPress={() => router.push(`/detail/${item.id}`)}
            >
              {item.title}
            </ListItem>
          ))}
        </Column>

        <Button
          label="Open Explore"
          variant="outlined"
          onPress={() => onSelectTab?.("explore")}
        />
      </Column>
    </ScrollView>
  );
}
