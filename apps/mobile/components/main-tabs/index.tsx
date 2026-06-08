import { MainTabs as MainTabsAndroid } from "./index.android";
import { MainTabs as MainTabsIOS } from "./index.ios";

export function MainTabs() {
  if (process.env.EXPO_OS === "ios") {
    return <MainTabsIOS />;
  }

  return <MainTabsAndroid />;
}
