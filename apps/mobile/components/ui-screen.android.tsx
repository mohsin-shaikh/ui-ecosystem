import type { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedHost } from "./themed-host";

type UiScreenProps = {
  children: ReactNode;
  fill?: boolean;
};

export function UiScreen({ children, fill = true }: UiScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <ThemedHost
      fill={fill}
      useViewportSizeMeasurement={fill}
      style={{
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {children}
    </ThemedHost>
  );
}
