import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api/client";
import {
  selectIsAuthenticated,
  useAuthStore,
} from "@/lib/auth/auth-store";

export function useCurrentUser() {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  return useQuery({
    queryKey: ["me"],
    queryFn: () =>
      apiFetch<{ id: string; email: string; role: string }>("/me"),
    enabled: isAuthenticated,
  });
}
