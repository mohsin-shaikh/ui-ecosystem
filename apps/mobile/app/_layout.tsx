import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";

import { AppProviders } from "@/providers/app-providers";
import { RootNavigator } from "@/providers/root-navigator";
import { SplashController } from "@/providers/splash-controller";

export default function RootLayout() {
  return (
    <AppProviders>
      <SplashController />
      <StatusBar style="auto" />
      <RootNavigator />
    </AppProviders>
  );
}
