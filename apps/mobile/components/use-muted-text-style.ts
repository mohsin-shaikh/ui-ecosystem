import { getMaterialColors } from "@expo/ui/jetpack-compose";

import { useHostColorScheme, useResolvedColorScheme } from "./app-theme";

type ThemedTextStyle = {
  fontSize: number;
  color?: string;
  fontWeight?: "400" | "500" | "600" | "700";
};

function useThemedTextColor(
  token: "onSurface" | "onSurfaceVariant",
): string | undefined {
  const hostColorScheme = useHostColorScheme();
  const resolvedColorScheme = useResolvedColorScheme();

  if (process.env.EXPO_OS !== "android") {
    return token === "onSurfaceVariant" ? "#666" : undefined;
  }

  const colors = getMaterialColors({
    scheme: hostColorScheme ?? resolvedColorScheme,
  });
  return colors[token];
}

export function usePrimaryTextStyle(
  overrides?: Partial<ThemedTextStyle>,
): ThemedTextStyle {
  return {
    fontSize: 16,
    color: useThemedTextColor("onSurface"),
    ...overrides,
  };
}

export function useMutedTextStyle(
  overrides?: Partial<ThemedTextStyle>,
): ThemedTextStyle {
  return {
    fontSize: 15,
    color: useThemedTextColor("onSurfaceVariant"),
    ...overrides,
  };
}
