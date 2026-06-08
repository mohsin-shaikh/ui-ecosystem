import type { ReactNode } from "react";

import { ThemedHost } from "./themed-host";

type UiScreenProps = {
  children: ReactNode;
  fill?: boolean;
};

export function UiScreen({ children, fill = true }: UiScreenProps) {
  return (
    <ThemedHost fill={fill} useViewportSizeMeasurement={fill}>
      {children}
    </ThemedHost>
  );
}
