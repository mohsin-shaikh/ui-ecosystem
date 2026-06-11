import { TextInput, type TextInputProps } from "@expo/ui";
import type { KeyboardTypeOptions, ReturnKeyTypeOptions } from "react-native";

export type FormTextInputProps = {
  defaultValue?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  autoCorrect?: boolean;
  secureTextEntry?: boolean;
  editable?: boolean;
  onSubmitEditing?: () => void;
  returnKeyType?: ReturnKeyTypeOptions;
  autoComplete?: TextInputProps["autoComplete"];
  multiline?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  testID?: string;
  placeholderTextColor?: string;
};

export function FormTextInput(props: FormTextInputProps) {
  return <TextInput {...props} />;
}
