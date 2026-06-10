import { useState } from "react";
import { StatusBar } from "react-native";
import {
  Box,
  Column,
  getMaterialColors,
  Host,
  Icon,
  NavigationBar,
  NavigationBarItem,
  Text,
} from "@expo/ui/jetpack-compose";
import {
  fillMaxSize,
  fillMaxWidth,
  padding,
  weight,
} from "@expo/ui/jetpack-compose/modifiers";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useHostColorScheme, useResolvedColorScheme } from "../app-theme";
import { ExploreScreen } from "../screens/explore-screen";
import { HomeScreen } from "../screens/home-screen";
import { ProfileScreen } from "../screens/profile-screen";
import type { TabId } from "./types";

const HOME_ICON = require("../../assets/icons/home.xml");
const EXPLORE_ICON = require("../../assets/icons/explore.xml");
const PERSON_ICON = require("../../assets/icons/person.xml");

const tabs: { id: TabId; label: string; icon: number }[] = [
  { id: "home", label: "Home", icon: HOME_ICON },
  { id: "explore", label: "Explore", icon: EXPLORE_ICON },
  { id: "profile", label: "Profile", icon: PERSON_ICON },
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
        <Box modifiers={[fillMaxWidth(), weight(1)]}>
          <TabPanel tab={selected} onSelectTab={setSelected} />
        </Box>

        <NavigationBar
          containerColor={colors.surfaceContainer}
          modifiers={[fillMaxWidth(), padding(0, 0, 0, insets.bottom)]}
        >
          {tabs.map((tab) => (
            <NavigationBarItem
              key={tab.id}
              selected={selected === tab.id}
              onClick={() => setSelected(tab.id)}
            >
              <NavigationBarItem.Icon>
                <Icon
                  source={tab.icon}
                  size={24}
                  contentDescription={tab.label}
                />
              </NavigationBarItem.Icon>
              <NavigationBarItem.Label>
                <Text>{tab.label}</Text>
              </NavigationBarItem.Label>
            </NavigationBarItem>
          ))}
        </NavigationBar>
      </Column>
    </Host>
  );
}
