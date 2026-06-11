import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppThemeProvider } from "@/components/app-theme";
import { queryClient } from "@/lib/api/query-client";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AppThemeProvider>{children}</AppThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
