import { useState } from "react";
import { StatusBar } from "react-native";
import {
  Box,
  Column,
  getMaterialColors,
  Host,
  SegmentedButton,
  SingleChoiceSegmentedButtonRow,
  Text,
} from "@expo/ui/jetpack-compose";
import {
  fillMaxSize,
  fillMaxWidth,
  padding,
} from "@expo/ui/jetpack-compose/modifiers";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useHostColorScheme, useResolvedColorScheme } from "../app-theme";
import { ExploreScreen } from "../screens/explore-screen";
import { HomeScreen } from "../screens/home-screen";
import { ProfileScreen } from "../screens/profile-screen";
import type { TabId } from "./types";

const tabs: { id: TabId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "explore", label: "Explore" },
  { id: "profile", label: "Profile" },
];

function TabPanel({
  tab,
  onSelectTab,
}: {
  tab: TabId;
  onSelectTab: (tab: TabId) => void;
}) {
  switch (tab) {
    case "home":
      return <HomeScreen onSelectTab={onSelectTab} />;
    case "explore":
      return <ExploreScreen />;
    case "profile":
      return <ProfileScreen />;
  }
}

export function MainTabs() {
  const [selected, setSelected] = useState<TabId>("home");
  const insets = useSafeAreaInsets();
  const topInset = Math.max(insets.top, StatusBar.currentHeight ?? 0);
  const hostColorScheme = useHostColorScheme();
  const resolvedColorScheme = useResolvedColorScheme();
  const colors = getMaterialColors({
    scheme: hostColorScheme ?? resolvedColorScheme,
  });

  return (
    <Host
      colorScheme={hostColorScheme}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <Column
        verticalArrangement={{ spacedBy: 0 }}
        modifiers={[
          fillMaxSize(),
          padding(insets.left, topInset, insets.right, 0),
        ]}
      >
        <Box modifiers={[fillMaxWidth(), fillMaxSize()]}>
          <TabPanel tab={selected} onSelectTab={setSelected} />
        </Box>

        <SingleChoiceSegmentedButtonRow
          modifiers={[fillMaxWidth(), padding(12, 12, 12, 12 + insets.bottom)]}
        >
          {tabs.map((tab) => (
            <SegmentedButton
              key={tab.id}
              selected={selected === tab.id}
              onClick={() => setSelected(tab.id)}
            >
              <SegmentedButton.Label>
                <Text>{tab.label}</Text>
              </SegmentedButton.Label>
            </SegmentedButton>
          ))}
        </SingleChoiceSegmentedButtonRow>
      </Column>
    </Host>
  );
}
