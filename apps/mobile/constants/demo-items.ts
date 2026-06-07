export type DemoItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
};

export const DEMO_ITEMS: DemoItem[] = [
  {
    id: "1",
    title: "Native Lists",
    subtitle: "SwiftUI on iOS, Compose on Android",
    description:
      "List rows are rendered with platform-native controls so taps, typography, and spacing feel at home on each OS.",
  },
  {
    id: "2",
    title: "Form Controls",
    subtitle: "Toggles, sliders, and pickers",
    description:
      "Interactive inputs bridge directly to SwiftUI and Jetpack Compose, giving you real native behavior instead of JS approximations.",
  },
  {
    id: "3",
    title: "Settings Layout",
    subtitle: "Grouped fields with sections",
    description:
      "FieldGroup mirrors the settings-style grouped list pattern, with section headers and inset row styling on iOS.",
  },
  {
    id: "4",
    title: "Cross-Platform API",
    subtitle: "One import from @expo/ui",
    description:
      "Universal components pick the right native implementation at build time while keeping a single React API.",
  },
];

export function getDemoItem(id: string) {
  return DEMO_ITEMS.find((item) => item.id === id);
}
