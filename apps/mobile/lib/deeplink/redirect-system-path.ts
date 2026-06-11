import { useAuthStore } from "@/lib/auth/auth-store";
import { useOnboardingStore } from "@/lib/onboarding/onboarding-store";

function normalizePath(path: string) {
  const withoutScheme = path.replace(/^[^:]+:\/\//, "");
  const normalized = withoutScheme.startsWith("/")
    ? withoutScheme
    : `/${withoutScheme}`;

  return normalized.replace(/\/+/g, "/");
}

export function resolveSystemPath(path: string): string | null {
  const normalized = normalizePath(path);
  const { status, session } = useAuthStore.getState();
  const { isComplete: onboarded } = useOnboardingStore.getState();

  const isPublic =
    normalized.startsWith("/terms") || normalized.startsWith("/privacy");

  if (isPublic) {
    return normalized;
  }

  if (status === "bootstrapping") {
    return null;
  }

  if (!session) {
    return `/login?redirect=${encodeURIComponent(normalized)}`;
  }

  if (!onboarded) {
    return normalized === "/" || normalized.startsWith("/preferences")
      ? normalized
      : "/";
  }

  if (normalized.startsWith("/admin")) {
    return session.user.role === "admin"
      ? normalized
      : "/";
  }

  return normalized;
}
