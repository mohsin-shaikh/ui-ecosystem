import { FieldGroup, Switch, Text, TextInput } from "@expo/ui";
import { useState } from "react";

import { UiScreen } from "../../components/ui-screen";

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <UiScreen>
      <FieldGroup>
        <FieldGroup.Section title="Account">
          <TextInput
            defaultValue="Alex Morgan"
            placeholder="Display name"
            autoCapitalize="words"
          />
          <TextInput
            defaultValue="alex@example.com"
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </FieldGroup.Section>

        <FieldGroup.Section title="Preferences">
          <Switch
            label="Push notifications"
            value={notifications}
            onValueChange={setNotifications}
          />
          <Switch
            label="Product updates"
            value={marketing}
            onValueChange={setMarketing}
          />
        </FieldGroup.Section>

        <FieldGroup.Section title="About" titleUppercase={false}>
          <Text
            textStyle={{ fontSize: 14, color: "#666" }}
            style={{ paddingHorizontal: 16, paddingVertical: 8 }}
          >
            Built with @expo/ui universal components. Settings rows use native
            Form layouts on iOS and Material-style lists on Android.
          </Text>
        </FieldGroup.Section>
      </FieldGroup>
    </UiScreen>
  );
}
