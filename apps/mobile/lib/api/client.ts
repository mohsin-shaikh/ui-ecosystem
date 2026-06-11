import * as authService from "@/lib/auth/auth-service";
import { useAuthStore } from "@/lib/auth/auth-store";

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = useAuthStore.getState().session?.accessToken;

  if (!token) {
    throw new Error("Not authenticated.");
  }

  if (path === "/me") {
    return authService.fetchCurrentUser(token) as Promise<T>;
  }

  throw new Error(`Unknown API path: ${path}`);
}
