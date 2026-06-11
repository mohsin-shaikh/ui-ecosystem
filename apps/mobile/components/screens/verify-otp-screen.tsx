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
import {
  selectHasOtpChallenge,
  useAuthStore,
} from "@/lib/auth/auth-store";

export function VerifyOtpScreen() {
  const router = useRouter();
  const verifyOtp = useAuthStore((state) => state.verifyOtp);
  const cancelOtp = useAuthStore((state) => state.cancelOtp);
  const otpChallenge = useAuthStore((state) => state.otpChallenge);
  const hasOtpChallenge = useAuthStore(selectHasOtpChallenge);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const mutedTextStyle = useMutedTextStyle();
  const titleTextStyle = usePrimaryTextStyle({
    fontSize: 28,
    fontWeight: "700",
  });

  const mutation = useMutation({
    mutationFn: () => verifyOtp(code.trim()),
    onSuccess: (result) => {
      setError(null);

      if (result === "password_reset") {
        router.replace("/login");
        return;
      }

      // Guards route to onboarding or main app automatically.
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : "Verification failed.");
    },
  });

  if (!hasOtpChallenge || !otpChallenge) {
    return (
      <UiScreen>
        <ScrollView style={{ padding: 16 }}>
          <Column spacing={16}>
            <Text textStyle={mutedTextStyle}>
              No verification in progress.
            </Text>
            <Button label="Back to log in" onPress={() => router.replace("/login")} />
          </Column>
        </ScrollView>
      </UiScreen>
    );
  }

  const handleSubmit = () => {
    if (!code.trim()) {
      setError("Enter the 6-digit verification code.");
      return;
    }

    mutation.mutate();
  };

  return (
    <UiScreen>
    <ScrollView style={{ padding: 16 }}>
      <Column spacing={24}>
        <Column spacing={8}>
          <Text textStyle={titleTextStyle}>Verify your email</Text>
          <Text textStyle={mutedTextStyle}>
            {`Enter the code sent to ${otpChallenge.email}. Demo code: 123456`}
          </Text>
        </Column>

        <FieldGroup>
          <FieldGroup.Section title="Verification">
            <FormTextInput
              placeholder="6-digit code"
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
              onChangeText={setCode}
            />
          </FieldGroup.Section>
        </FieldGroup>

        {error ? <Text textStyle={mutedTextStyle}>{error}</Text> : null}

        <Column spacing={12}>
          <Button
            label={mutation.isPending ? "Verifying..." : "Verify"}
            onPress={handleSubmit}
          />
          <Button
            label="Cancel"
            variant="text"
            onPress={() => {
              cancelOtp();
              router.replace("/login");
            }}
          />
        </Column>
      </Column>
    </ScrollView>
    </UiScreen>
  );
}
