import { Button, Column, FieldGroup, Text } from "@expo/ui";
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

export function LoginScreen() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState<string | null>(null);
  const mutedTextStyle = useMutedTextStyle();
  const titleTextStyle = usePrimaryTextStyle({
    fontSize: 28,
    fontWeight: "700",
  });

  const mutation = useMutation({
    mutationFn: () => login(email.trim(), password),
    onSuccess: () => {
      setError(null);

      if (useAuthStore.getState().otpChallenge) {
        router.push("/verify-otp");
      }
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : "Log in failed.");
    },
  });

  const handleLogin = () => {
    if (!email.trim() || !password) {
      setError("Enter your email and password to continue.");
      return;
    }

    mutation.mutate();
  };

  return (
    <UiScreen>
      <Column spacing={24} style={{ padding: 16 }}>
        <Column spacing={8}>
          <Text textStyle={titleTextStyle}>Welcome back</Text>
          <Text textStyle={mutedTextStyle}>
            Sign in to continue. Try user@example.com / password or
            admin@example.com / password (OTP: 123456).
          </Text>
        </Column>

        <FieldGroup>
          <FieldGroup.Section title="Account">
            <FormTextInput
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              returnKeyType="next"
              defaultValue={email}
              onChangeText={setEmail}
            />
            <FormTextInput
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
              returnKeyType="done"
              onSubmitEditing={handleLogin}
              defaultValue={password}
              onChangeText={setPassword}
            />
          </FieldGroup.Section>
        </FieldGroup>

        {error ? <Text textStyle={mutedTextStyle}>{error}</Text> : null}

        <Column spacing={12}>
          <Button
            label={mutation.isPending ? "Signing in..." : "Log in"}
            onPress={handleLogin}
          />
          <Button
            label="Forgot password?"
            variant="text"
            onPress={() => router.push("/forgot-password")}
          />
          <Button
            label="Create an account"
            variant="text"
            onPress={() => router.push("/signup")}
          />
          <Button
            label="Terms of Service"
            variant="text"
            onPress={() => router.push("/terms")}
          />
        </Column>
      </Column>
    </UiScreen>
  );
}
