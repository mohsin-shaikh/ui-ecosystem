export type UserRole = "user" | "admin";

export type AuthStatus =
  | "bootstrapping"
  | "unauthenticated"
  | "otp_pending"
  | "authenticated";

export type OtpPurpose = "signup" | "login" | "reset_password";

export type OtpChallenge = {
  email: string;
  purpose: OtpPurpose;
  expiresAt: number;
};

export type Session = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    role: UserRole;
  };
};

export type AuthState = {
  status: AuthStatus;
  session: Session | null;
  otpChallenge: OtpChallenge | null;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};
