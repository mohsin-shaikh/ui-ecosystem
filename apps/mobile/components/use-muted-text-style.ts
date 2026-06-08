import { getMaterialColors } from "@expo/ui/jetpack-compose";

import { useHostColorScheme, useResolvedColorScheme } from "./app-theme";

type MutedTextStyle = {
  fontSize: number;
  color: string;
};

export function useMutedTextStyle(
  overrides?: Partial<MutedTextStyle>,
): MutedTextStyle {
  const hostColorScheme = useHostColorScheme();
  const resolvedColorScheme = useResolvedColorScheme();

  if (process.env.EXPO_OS === "android") {
    const colors = getMaterialColors({
      scheme: hostColorScheme ?? resolvedColorScheme,
    });
    return { fontSize: 15, color: colors.onSurfaceVariant, ...overrides };
  }

  return { fontSize: 15, color: "#666", ...overrides };
}
