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

export function ForgotPasswordScreen() {
  const router = useRouter();
  const requestPasswordReset = useAuthStore((state) => state.requestPasswordReset);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const mutedTextStyle = useMutedTextStyle();
  const titleTextStyle = usePrimaryTextStyle({
    fontSize: 28,
    fontWeight: "700",
  });

  const mutation = useMutation({
    mutationFn: () => requestPasswordReset(email.trim()),
    onSuccess: () => {
      setError(null);
      router.push("/verify-otp");
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    },
  });

  const handleSubmit = () => {
    if (!email.trim()) {
      setError("Enter the email associated with your account.");
      return;
    }

    mutation.mutate();
  };

  return (
    <UiScreen>
    <ScrollView style={{ padding: 16 }}>
      <Column spacing={24}>
        <Column spacing={8}>
          <Text textStyle={titleTextStyle}>Reset password</Text>
          <Text textStyle={mutedTextStyle}>
            We will send a verification code to your email.
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
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
              onChangeText={setEmail}
            />
          </FieldGroup.Section>
        </FieldGroup>

        {error ? <Text textStyle={mutedTextStyle}>{error}</Text> : null}

        <Column spacing={12}>
          <Button
            label={mutation.isPending ? "Sending..." : "Send code"}
            onPress={handleSubmit}
          />
          <Button
            label="Back to log in"
            variant="text"
            onPress={() => router.back()}
          />
        </Column>
      </Column>
    </ScrollView>
    </UiScreen>
  );
}
