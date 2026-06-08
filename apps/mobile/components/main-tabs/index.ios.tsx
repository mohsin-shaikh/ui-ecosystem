import { useState } from "react";
import { Host, TabView } from "@expo/ui/swift-ui";
import { frame, tabViewStyle } from "@expo/ui/swift-ui/modifiers";

import { ExploreScreen } from "../screens/explore-screen";
import { HomeScreen } from "../screens/home-screen";
import { ProfileScreen } from "../screens/profile-screen";
import type { TabId } from "./types";

const fillFrame = frame({ maxWidth: Infinity, maxHeight: Infinity });

export function MainTabs() {
  const [selected, setSelected] = useState<TabId>("home");

  return (
    <Host style={{ flex: 1 }} useViewportSizeMeasurement>
      <TabView
        selection={selected}
        onSelectionChange={(value) => setSelected(value as TabId)}
        modifiers={[fillFrame, tabViewStyle({ type: "automatic" })]}
      >
        <TabView.Tab value="home" label="Home" systemImage="house.fill">
          <HomeScreen onSelectTab={setSelected} />
        </TabView.Tab>
        <TabView.Tab value="explore" label="Explore" systemImage="slider.horizontal.3">
          <ExploreScreen />
        </TabView.Tab>
        <TabView.Tab value="profile" label="Profile" systemImage="person.fill">
          <ProfileScreen />
        </TabView.Tab>
      </TabView>
    </Host>
  );
}
