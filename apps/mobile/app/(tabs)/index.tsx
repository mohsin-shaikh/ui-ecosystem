import { Button, Column, ListItem, ScrollView, Text } from "@expo/ui";
import { useRouter } from "expo-router";

import { UiScreen } from "../../components/ui-screen";
import { DEMO_ITEMS } from "../../constants/demo-items";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <UiScreen>
      <ScrollView style={{ paddingBottom: 24 }}>
        <Column spacing={16} style={{ padding: 16 }}>
          <Text textStyle={{ fontSize: 15, color: "#666" }}>
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
            onPress={() => router.push("/explore")}
          />
        </Column>
      </ScrollView>
    </UiScreen>
  );
}
