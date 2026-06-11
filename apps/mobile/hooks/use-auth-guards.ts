import {
  selectIsAuthenticated,
  selectIsBootstrapping,
  useAuthStore,
} from "@/lib/auth/auth-store";
import {
  selectIsOnboardingComplete,
  selectIsOnboardingReady,
  useOnboardingStore,
} from "@/lib/onboarding/onboarding-store";

export function useAuthGuards() {
  const isBootstrapping = useAuthStore(selectIsBootstrapping);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const isOnboardingReady = useOnboardingStore(selectIsOnboardingReady);
  const isOnboardingComplete = useOnboardingStore(selectIsOnboardingComplete);

  const isReady = !isBootstrapping && isOnboardingReady;

  return {
    isReady,
    showAuth: isReady && !isAuthenticated,
    showOnboarding: isReady && isAuthenticated && !isOnboardingComplete,
    showApp: isReady && isAuthenticated && isOnboardingComplete,
  };
}
