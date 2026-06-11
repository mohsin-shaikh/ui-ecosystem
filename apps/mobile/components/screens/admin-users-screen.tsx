import { Column, ScrollView, Text } from "@expo/ui";

import { UiScreen } from "@/components/ui-screen";
import {
  useMutedTextStyle,
  usePrimaryTextStyle,
} from "@/components/use-muted-text-style";
import { useRequireRole } from "@/hooks/use-require-role";

const DEMO_USERS = [
  { email: "user@example.com", role: "user" },
  { email: "admin@example.com", role: "admin" },
];

export function AdminUsersScreen() {
  useRequireRole("admin");
  const mutedTextStyle = useMutedTextStyle();
  const titleTextStyle = usePrimaryTextStyle({
    fontSize: 28,
    fontWeight: "700",
  });

  return (
    <UiScreen>
    <ScrollView style={{ padding: 16 }}>
      <Column spacing={16}>
        <Text textStyle={titleTextStyle}>Users</Text>
        {DEMO_USERS.map((user) => (
          <Text key={user.email} textStyle={mutedTextStyle}>
            {`${user.email} · ${user.role}`}
          </Text>
        ))}
      </Column>
    </ScrollView>
    </UiScreen>
  );
}
