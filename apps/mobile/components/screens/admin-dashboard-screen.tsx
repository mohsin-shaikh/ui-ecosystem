import { Button, Column, ScrollView, Text } from "@expo/ui";
import { useRouter } from "expo-router";

import { UiScreen } from "@/components/ui-screen";
import {
  useMutedTextStyle,
  usePrimaryTextStyle,
} from "@/components/use-muted-text-style";
import { useRequireRole } from "@/hooks/use-require-role";
import { useCurrentUser } from "@/hooks/use-current-user";

export function AdminDashboardScreen() {
  const router = useRouter();
  useRequireRole("admin");
  const { data: user } = useCurrentUser();
  const mutedTextStyle = useMutedTextStyle();
  const titleTextStyle = usePrimaryTextStyle({
    fontSize: 28,
    fontWeight: "700",
  });

  return (
    <UiScreen>
    <ScrollView style={{ padding: 16 }}>
      <Column spacing={24}>
        <Column spacing={8}>
          <Text textStyle={titleTextStyle}>Admin</Text>
          <Text textStyle={mutedTextStyle}>
            {user ? `Signed in as ${user.email}` : "Loading admin session..."}
          </Text>
        </Column>

        <Button label="Manage users" onPress={() => router.push("/admin/users")} />
        <Button label="Close" variant="text" onPress={() => router.back()} />
      </Column>
    </ScrollView>
    </UiScreen>
  );
}
