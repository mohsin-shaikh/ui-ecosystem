import { create } from "zustand";

import * as authService from "./auth-service";
import * as tokenStorage from "./token-storage";
import type { AuthState, AuthStatus, OtpPurpose } from "./auth-types";

type AuthActions = {
  bootstrap: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  verifyOtp: (code: string) => Promise<"authenticated" | "password_reset">;
  cancelOtp: () => void;
  signOut: () => Promise<void>;
};

const initialState: AuthState = {
  status: "bootstrapping",
  session: null,
  otpChallenge: null,
};

function transition(
  set: (partial: Partial<AuthState>) => void,
  status: AuthStatus,
  extra: Partial<AuthState> = {},
) {
  set({ status, ...extra });
}

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  ...initialState,

  bootstrap: async () => {
    try {
      const tokens = await tokenStorage.getTokens();

      if (!tokens) {
        transition(set, "unauthenticated", { session: null });
        return;
      }

      const session = await authService.validateSession(tokens.accessToken);
      transition(set, "authenticated", { session, otpChallenge: null });
    } catch {
      await tokenStorage.clearTokens();
      transition(set, "unauthenticated", { session: null, otpChallenge: null });
    }
  },

  login: async (email, password) => {
    const result = await authService.login(email, password);

    if ("otpRequired" in result) {
      transition(set, "otp_pending", {
        otpChallenge: {
          email: email.toLowerCase(),
          purpose: "login",
          expiresAt: Date.now() + 5 * 60_000,
        },
      });
      return;
    }

    await tokenStorage.setTokens(result.tokens);
    transition(set, "authenticated", {
      session: result.session,
      otpChallenge: null,
    });
  },

  signup: async (email, password) => {
    await authService.signup(email, password);

    transition(set, "otp_pending", {
      otpChallenge: {
        email: email.toLowerCase(),
        purpose: "signup",
        expiresAt: Date.now() + 5 * 60_000,
      },
    });
  },

  requestPasswordReset: async (email) => {
    await authService.requestPasswordReset(email);

    transition(set, "otp_pending", {
      otpChallenge: {
        email: email.toLowerCase(),
        purpose: "reset_password",
        expiresAt: Date.now() + 5 * 60_000,
      },
    });
  },

  verifyOtp: async (code) => {
    const { otpChallenge } = get();

    if (!otpChallenge) {
      throw new Error("No verification in progress.");
    }

    if (Date.now() > otpChallenge.expiresAt) {
      transition(set, "unauthenticated", { otpChallenge: null });
      throw new Error("Verification code expired. Please try again.");
    }

    const result = await authService.verifyOtp({
      email: otpChallenge.email,
      code,
      purpose: otpChallenge.purpose as OtpPurpose,
    });

    if ("passwordReset" in result) {
      transition(set, "unauthenticated", { otpChallenge: null });
      return "password_reset";
    }

    await tokenStorage.setTokens(result.tokens);
    transition(set, "authenticated", {
      session: result.session,
      otpChallenge: null,
    });

    return "authenticated";
  },

  cancelOtp: () => {
    transition(set, "unauthenticated", { otpChallenge: null });
  },

  signOut: async () => {
    await tokenStorage.clearTokens();
    transition(set, "unauthenticated", {
      session: null,
      otpChallenge: null,
    });
  },
}));

export const selectIsBootstrapping = (state: AuthState) =>
  state.status === "bootstrapping";
export const selectIsAuthenticated = (state: AuthState) =>
  state.status === "authenticated";
export const selectHasOtpChallenge = (state: AuthState) =>
  state.otpChallenge !== null;
export const selectUserRole = (state: AuthState) =>
  state.session?.user.role ?? null;
export const selectSession = (state: AuthState) => state.session;
