import { Stack } from "expo-router/stack";

import { SignupScreen } from "../components/screens/signup-screen";
import { UiScreen } from "../components/ui-screen";

export default function SignupRoute() {
  return (
    <>
      <Stack.Screen options={{ title: "Sign up" }} />
      <UiScreen>
        <SignupScreen />
      </UiScreen>
    </>
  );
}
