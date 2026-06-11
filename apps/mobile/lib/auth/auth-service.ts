import type { AuthTokens, OtpPurpose, Session, UserRole } from "./auth-types";

type MockUser = {
  password: string;
  role: UserRole;
};

const MOCK_USERS: Record<string, MockUser> = {
  "user@example.com": { password: "password", role: "user" },
  "admin@example.com": { password: "password", role: "admin" },
};

const PENDING_SIGNUPS: Record<string, string> = {};
const VALID_OTP = "123456";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function createId() {
  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function makeSession(email: string, role: UserRole): Session {
  const normalizedEmail = email.toLowerCase();

  return {
    accessToken: `access-${normalizedEmail}`,
    refreshToken: `refresh-${normalizedEmail}`,
    user: {
      id: createId(),
      email: normalizedEmail,
      role,
    },
  };
}

function makeTokens(email: string): AuthTokens {
  const normalizedEmail = email.toLowerCase();

  return {
    accessToken: `access-${normalizedEmail}`,
    refreshToken: `refresh-${normalizedEmail}`,
  };
}

function parseEmailFromToken(accessToken: string): string | null {
  if (!accessToken.startsWith("access-")) {
    return null;
  }

  return accessToken.slice("access-".length).toLowerCase();
}

export async function login(email: string, password: string) {
  await delay(600);

  const normalizedEmail = email.toLowerCase();
  const user = MOCK_USERS[normalizedEmail];

  if (!user || user.password !== password) {
    throw new Error("Invalid email or password.");
  }

  if (user.role === "admin") {
    return { otpRequired: true as const };
  }

  return {
    tokens: makeTokens(normalizedEmail),
    session: makeSession(normalizedEmail, user.role),
  };
}

export async function signup(email: string, password: string) {
  await delay(600);

  const normalizedEmail = email.toLowerCase();

  if (MOCK_USERS[normalizedEmail]) {
    throw new Error("An account with this email already exists.");
  }

  PENDING_SIGNUPS[normalizedEmail] = password;
}

export async function requestPasswordReset(email: string) {
  await delay(500);

  const normalizedEmail = email.toLowerCase();

  if (!MOCK_USERS[normalizedEmail]) {
    throw new Error("No account found for this email.");
  }
}

export async function verifyOtp(input: {
  email: string;
  code: string;
  purpose: OtpPurpose;
}) {
  await delay(400);

  if (input.code !== VALID_OTP) {
    throw new Error("Invalid verification code. Use 123456 for demo.");
  }

  const normalizedEmail = input.email.toLowerCase();

  if (input.purpose === "signup") {
    const password = PENDING_SIGNUPS[normalizedEmail];

    if (!password) {
      throw new Error("Signup session expired. Please try again.");
    }

    MOCK_USERS[normalizedEmail] = { password, role: "user" };
    delete PENDING_SIGNUPS[normalizedEmail];
  }

  if (input.purpose === "reset_password") {
    return { passwordReset: true as const };
  }

  const role = MOCK_USERS[normalizedEmail]?.role ?? "user";

  return {
    tokens: makeTokens(normalizedEmail),
    session: makeSession(normalizedEmail, role),
  };
}

export async function validateSession(accessToken: string): Promise<Session> {
  await delay(300);

  const email = parseEmailFromToken(accessToken);

  if (!email || !MOCK_USERS[email]) {
    throw new Error("Invalid session.");
  }

  return makeSession(email, MOCK_USERS[email].role);
}

export async function fetchCurrentUser(accessToken: string) {
  const session = await validateSession(accessToken);

  return {
    id: session.user.id,
    email: session.user.email,
    role: session.user.role,
  };
}
