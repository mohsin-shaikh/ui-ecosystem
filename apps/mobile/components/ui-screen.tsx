import type { ReactNode } from "react";
import { ScrollView, View, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedHost } from "./themed-host";

type UiScreenProps = {
  children: ReactNode;
  /**
   * When true (default) the screen content scrolls vertically. Scrolling is
   * owned by a React Native `ScrollView` rather than a Compose
   * `Column(verticalScroll())`, because the Compose scroller crashes on Android
   * when the `@expo/ui` `Host` measures it with an unbounded height (which
   * happens on the first layout pass before the Host's measurement props apply).
   */
  scroll?: boolean;
  contentContainerStyle?: ViewStyle;
};

export function UiScreen({
  children,
  scroll = true,
  contentContainerStyle,
}: UiScreenProps) {
  const insets = useSafeAreaInsets();

  const edgePadding: ViewStyle = {
    paddingLeft: insets.left,
    paddingRight: insets.right,
    ...(process.env.EXPO_OS === "ios"
      ? { paddingBottom: insets.bottom }
      : undefined),
  };

  // The Host sizes itself to its content so a React Native parent can measure
  // and (when scrolling) scroll it. matchContents avoids the unbounded-height
  // Compose layout crash that a filling Host hits on Android.
  const host = (
    <ThemedHost fill={false} matchContents={{ vertical: true }}>
      {children}
    </ThemedHost>
  );

  if (!scroll) {
    return (
      <View style={[{ flex: 1 }, edgePadding, contentContainerStyle]}>{host}</View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[edgePadding, contentContainerStyle]}
      keyboardShouldPersistTaps="handled"
    >
      {host}
    </ScrollView>
  );
}
