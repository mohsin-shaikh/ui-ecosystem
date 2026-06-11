import { SplashScreen } from "expo-router";
import { useEffect } from "react";

import {
  selectIsBootstrapping,
  useAuthStore,
} from "@/lib/auth/auth-store";
import {
  selectIsOnboardingReady,
  useOnboardingStore,
} from "@/lib/onboarding/onboarding-store";

SplashScreen.preventAutoHideAsync();

export function SplashController() {
  const isBootstrapping = useAuthStore(selectIsBootstrapping);
  const isOnboardingReady = useOnboardingStore(selectIsOnboardingReady);

  useEffect(() => {
    void useAuthStore.getState().bootstrap();

    if (useOnboardingStore.persist.hasHydrated()) {
      useOnboardingStore.setState({ isHydrated: true });
      return;
    }

    const unsubscribe = useOnboardingStore.persist.onFinishHydration(() => {
      useOnboardingStore.setState({ isHydrated: true });
    });

    const timeout = setTimeout(() => {
      if (!useOnboardingStore.getState().isHydrated) {
        useOnboardingStore.setState({ isHydrated: true });
      }
    }, 1000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!isBootstrapping && isOnboardingReady) {
      void SplashScreen.hideAsync();
    }
  }, [isBootstrapping, isOnboardingReady]);

  return null;
}
