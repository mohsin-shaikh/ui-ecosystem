import { Host } from "@expo/ui";
import { getMaterialColors } from "@expo/ui/jetpack-compose";
import type { ReactNode } from "react";
import type { ViewStyle } from "react-native";

import { useHostColorScheme, useResolvedColorScheme } from "./app-theme";

type ThemedHostProps = {
  children: ReactNode;
  fill?: boolean;
  style?: ViewStyle;
  useViewportSizeMeasurement?: boolean;
  matchContents?: boolean | { vertical?: boolean; horizontal?: boolean };
};

export function ThemedHost({
  children,
  fill = true,
  style,
  useViewportSizeMeasurement,
  matchContents,
}: ThemedHostProps) {
  const hostColorScheme = useHostColorScheme();
  const resolvedColorScheme = useResolvedColorScheme();

  const backgroundColor =
    process.env.EXPO_OS === "android"
      ? getMaterialColors({ scheme: hostColorScheme ?? resolvedColorScheme })
          .background
      : undefined;

  return (
    <Host
      colorScheme={hostColorScheme}
      style={{
        ...(fill ? { flex: 1, width: "100%" } : undefined),
        ...(backgroundColor ? { backgroundColor } : undefined),
        ...style,
      }}
      matchContents={matchContents}
      useViewportSizeMeasurement={useViewportSizeMeasurement ?? false}
    >
      {children}
    </Host>
  );
}
