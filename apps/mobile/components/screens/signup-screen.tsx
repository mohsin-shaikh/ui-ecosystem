import { Button, Column, FieldGroup, ScrollView, Text } from "@expo/ui";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { FormTextInput } from "@/components/form-text-input";
import { UiScreen } from "@/components/ui-screen";
import {
  useMutedTextStyle,
  usePrimaryTextStyle,
} from "@/components/use-muted-text-style";
import { useAuthStore } from "@/lib/auth/auth-store";

export function SignupScreen() {
  const router = useRouter();
  const signup = useAuthStore((state) => state.signup);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const mutedTextStyle = useMutedTextStyle();
  const titleTextStyle = usePrimaryTextStyle({
    fontSize: 28,
    fontWeight: "700",
  });

  const mutation = useMutation({
    mutationFn: () => signup(email.trim(), password),
    onSuccess: () => {
      setError(null);
      router.push("/verify-otp");
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : "Sign up failed.");
    },
  });

  const handleSignup = () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Fill in every field to create your account.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    mutation.mutate();
  };

  return (
    <UiScreen>
    <ScrollView style={{ padding: 16 }}>
      <Column spacing={24}>
        <Column spacing={8}>
          <Text textStyle={titleTextStyle}>Create account</Text>
          <Text textStyle={mutedTextStyle}>
            Join to save preferences and sync across devices.
          </Text>
        </Column>

        <FieldGroup>
          <FieldGroup.Section title="Profile">
            <FormTextInput
              placeholder="Full name"
              autoCapitalize="words"
              autoComplete="name"
              returnKeyType="next"
              onChangeText={setName}
            />
            <FormTextInput
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              returnKeyType="next"
              onChangeText={setEmail}
            />
          </FieldGroup.Section>

          <FieldGroup.Section title="Security">
            <FormTextInput
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="new-password"
              returnKeyType="next"
              onChangeText={setPassword}
            />
            <FormTextInput
              placeholder="Confirm password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="new-password"
              returnKeyType="done"
              onSubmitEditing={handleSignup}
              onChangeText={setConfirmPassword}
            />
          </FieldGroup.Section>
        </FieldGroup>

        {error ? <Text textStyle={mutedTextStyle}>{error}</Text> : null}

        <Column spacing={12}>
          <Button
            label={mutation.isPending ? "Creating..." : "Sign up"}
            onPress={handleSignup}
          />
          <Button
            label="Already have an account?"
            variant="text"
            onPress={() => router.push("/login")}
          />
        </Column>
      </Column>
    </ScrollView>
    </UiScreen>
  );
}
