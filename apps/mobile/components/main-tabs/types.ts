export type TabId = "home" | "explore" | "profile";

export type TabScreenProps = {
  onSelectTab?: (tab: TabId) => void;
};
