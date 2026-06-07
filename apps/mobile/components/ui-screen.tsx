import { Host } from "@expo/ui";
import type { ReactNode } from "react";

type UiScreenProps = {
  children: ReactNode;
  fill?: boolean;
};

export function UiScreen({ children, fill = true }: UiScreenProps) {
  return (
    <Host
      style={fill ? { flex: 1 } : undefined}
      useViewportSizeMeasurement={fill}
    >
      {children}
    </Host>
  );
}
