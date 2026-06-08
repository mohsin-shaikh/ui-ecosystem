import { FieldGroup, Switch, Text, TextInput } from "@expo/ui";
import { useState } from "react";

import { useMutedTextStyle } from "../use-muted-text-style";

export function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const mutedTextStyle = useMutedTextStyle({ fontSize: 14 });

  return (
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
          textStyle={mutedTextStyle}
          style={{ paddingHorizontal: 16, paddingVertical: 8 }}
        >
          Built with @expo/ui universal components. Settings rows use native
          Form layouts on iOS and Material-style lists on Android.
        </Text>
      </FieldGroup.Section>
    </FieldGroup>
  );
}
