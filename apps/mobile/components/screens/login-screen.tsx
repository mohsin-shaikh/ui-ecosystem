import { Button, Column, FieldGroup, ScrollView, Text, TextInput } from "@expo/ui";
import { useRouter } from "expo-router";
import { useState } from "react";

import {
  useMutedTextStyle,
  usePrimaryTextStyle,
} from "../use-muted-text-style";

export function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const mutedTextStyle = useMutedTextStyle();
  const titleTextStyle = usePrimaryTextStyle({
    fontSize: 28,
    fontWeight: "700",
  });

  const handleLogin = () => {
    if (!email.trim() || !password) {
      setError("Enter your email and password to continue.");
      return;
    }

    setError(null);
    router.replace("/");
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <Column spacing={24}>
        <Column spacing={8}>
          <Text textStyle={titleTextStyle}>Welcome back</Text>
          <Text textStyle={mutedTextStyle}>
            Sign in to continue to your account.
          </Text>
        </Column>

        <FieldGroup>
          <FieldGroup.Section title="Account">
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              returnKeyType="next"
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
              returnKeyType="done"
              onSubmitEditing={handleLogin}
              onChangeText={setPassword}
            />
          </FieldGroup.Section>
        </FieldGroup>

        {error ? <Text textStyle={mutedTextStyle}>{error}</Text> : null}

        <Column spacing={12}>
          <Button label="Log in" onPress={handleLogin} />
          <Button
            label="Create an account"
            variant="text"
            onPress={() => router.push("/signup")}
          />
        </Column>
      </Column>
    </ScrollView>
  );
}
