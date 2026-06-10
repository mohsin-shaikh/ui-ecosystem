import {
  Button,
  Checkbox,
  Column,
  Picker,
  Row,
  ScrollView,
  Slider,
  Text,
} from "@expo/ui";
import { useState } from "react";

import {
  useSetThemePreference,
  useThemePreference,
  type ThemePreference,
} from "../app-theme";
import { useMutedTextStyle, usePrimaryTextStyle } from "../use-muted-text-style";

export function ExploreScreen() {
  const [volume, setVolume] = useState(60);
  const [haptics, setHaptics] = useState(true);
  const theme = useThemePreference();
  const setTheme = useSetThemePreference();
  const mutedTextStyle = useMutedTextStyle();
  const primaryTextStyle = usePrimaryTextStyle();
  const headingTextStyle = usePrimaryTextStyle({ fontWeight: "600" });

  return (
    <ScrollView style={{ padding: 16 }}>
      <Column spacing={20}>
        <Text textStyle={mutedTextStyle}>
          Native sliders, toggles, and pickers from @expo/ui.
        </Text>

        <Column spacing={8}>
          <Text textStyle={headingTextStyle}>Volume</Text>
          <Text textStyle={mutedTextStyle}>{`${Math.round(volume)}%`}</Text>
          <Slider
            value={volume}
            onValueChange={setVolume}
            min={0}
            max={100}
            step={1}
          />
        </Column>

        {process.env.EXPO_OS === "android" ? (
          <Row
            alignment="center"
            spacing={8}
            onPress={() => setHaptics((current) => !current)}
          >
            <Checkbox value={haptics} onValueChange={setHaptics} />
            <Text textStyle={primaryTextStyle}>Enable haptic feedback</Text>
          </Row>
        ) : (
          <Checkbox
            label="Enable haptic feedback"
            value={haptics}
            onValueChange={setHaptics}
          />
        )}

        <Column spacing={8}>
          <Text textStyle={headingTextStyle}>Appearance</Text>
          <Picker
            selectedValue={theme}
            onValueChange={(value) => setTheme(value as ThemePreference)}
            appearance="menu"
          >
            <Picker.Item label="System" value="system" />
            <Picker.Item label="Light" value="light" />
            <Picker.Item label="Dark" value="dark" />
          </Picker>
        </Column>

        <Button
          label="Reset controls"
          variant="text"
          onPress={() => {
            setVolume(60);
            setHaptics(true);
            setTheme("system");
          }}
        />
      </Column>
    </ScrollView>
  );
}
