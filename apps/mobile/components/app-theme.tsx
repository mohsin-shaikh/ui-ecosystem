import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useColorScheme } from "react-native";

export type ThemePreference = "system" | "light" | "dark";

type AppThemeContextValue = {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
};

const AppThemeContext = createContext<AppThemeContextValue | null>(null);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const value = useMemo(
    () => ({ preference, setPreference }),
    [preference],
  );

  return (
    <AppThemeContext.Provider value={value}>{children}</AppThemeContext.Provider>
  );
}

function useAppThemeContext() {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error("useAppThemeContext requires AppThemeProvider");
  }
  return context;
}

export function useThemePreference() {
  return useAppThemeContext().preference;
}

export function useSetThemePreference() {
  return useAppThemeContext().setPreference;
}

export function useResolvedColorScheme(): "light" | "dark" {
  const preference = useThemePreference();
  const system = useColorScheme();

  if (preference === "system") {
    return system === "dark" ? "dark" : "light";
  }

  return preference;
}

export function useHostColorScheme(): "light" | "dark" | undefined {
  const preference = useThemePreference();
  return preference === "system" ? undefined : preference;
}
