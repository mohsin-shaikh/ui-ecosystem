import { resolveSystemPath } from "@/lib/deeplink/redirect-system-path";

export function redirectSystemPath({
  path,
}: {
  path: string;
  initial: boolean;
}) {
  try {
    return resolveSystemPath(path);
  } catch {
    return "/login";
  }
}
