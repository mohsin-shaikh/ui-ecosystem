import { Stack } from "expo-router/stack";

import { LoginScreen } from "../components/screens/login-screen";
import { UiScreen } from "../components/ui-screen";

export default function LoginRoute() {
  return (
    <>
      <Stack.Screen options={{ title: "Log in" }} />
      <UiScreen>
        <LoginScreen />
      </UiScreen>
    </>
  );
}
