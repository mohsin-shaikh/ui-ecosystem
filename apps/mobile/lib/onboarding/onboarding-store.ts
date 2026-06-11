import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type OnboardingStep = "welcome" | "preferences" | "complete";

type OnboardingPreferences = {
  notifications: boolean;
  theme: "system" | "light" | "dark";
};

type OnboardingState = {
  isHydrated: boolean;
  isComplete: boolean;
  currentStep: OnboardingStep;
  preferences: OnboardingPreferences;
};

type OnboardingActions = {
  setStep: (step: OnboardingStep) => void;
  setPreferences: (preferences: Partial<OnboardingPreferences>) => void;
  finishOnboarding: () => void;
  resetOnboarding: () => void;
};

export const useOnboardingStore = create<OnboardingState & OnboardingActions>()(
  persist(
    (set) => ({
      isHydrated: false,
      isComplete: false,
      currentStep: "welcome",
      preferences: {
        notifications: true,
        theme: "system",
      },

      setStep: (step) => set({ currentStep: step }),

      setPreferences: (preferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...preferences },
        })),

      finishOnboarding: () =>
        set({ isComplete: true, currentStep: "complete" }),

      resetOnboarding: () =>
        set({
          isComplete: false,
          currentStep: "welcome",
          preferences: {
            notifications: true,
            theme: "system",
          },
        }),
    }),
    {
      name: "onboarding",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isComplete: state.isComplete,
        currentStep: state.currentStep,
        preferences: state.preferences,
      }),
      onRehydrateStorage: () => {
        return () => {
          useOnboardingStore.setState({ isHydrated: true });
        };
      },
    },
  ),
);

export const selectIsOnboardingReady = (state: OnboardingState) =>
  state.isHydrated;
export const selectIsOnboardingComplete = (state: OnboardingState) =>
  state.isComplete;
