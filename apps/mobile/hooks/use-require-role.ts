import { useRouter } from "expo-router";
import { useEffect } from "react";

import {
  selectUserRole,
  useAuthStore,
} from "@/lib/auth/auth-store";
import type { UserRole } from "@/lib/auth/auth-types";

export function useRequireRole(required: UserRole) {
  const role = useAuthStore(selectUserRole);
  const router = useRouter();

  useEffect(() => {
    if (role && role !== required) {
      router.replace("/");
    }
  }, [required, role, router]);
}
