import { Host } from "@expo/ui";
import type { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type UiScreenProps = {
  children: ReactNode;
  fill?: boolean;
};

export function UiScreen({ children, fill = true }: UiScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <Host
      style={{
        ...(fill ? { flex: 1 } : undefined),
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      useViewportSizeMeasurement={fill}
    >
      {children}
    </Host>
  );
}
