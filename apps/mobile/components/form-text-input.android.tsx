import { Text } from "@expo/ui";
import { TextField, useNativeState } from "@expo/ui/jetpack-compose";
import type { TextFieldImeAction, TextFieldKeyboardType } from "@expo/ui/jetpack-compose";
import type { KeyboardTypeOptions, ReturnKeyTypeOptions } from "react-native";

import type { FormTextInputProps } from "./form-text-input";

function mapKeyboardType(value?: KeyboardTypeOptions): TextFieldKeyboardType {
  switch (value) {
    case "email-address":
      return "email";
    case "numeric":
    case "number-pad":
      return "number";
    case "decimal-pad":
      return "decimal";
    case "phone-pad":
      return "phone";
    case "url":
      return "uri";
    default:
      return "text";
  }
}

function mapReturnKeyType(value?: ReturnKeyTypeOptions): TextFieldImeAction {
  if (value === "google" || value === "yahoo") {
    return "search";
  }

  if (
    value === "join" ||
    value === "route" ||
    value === "emergency-call"
  ) {
    return "default";
  }

  return (value ?? "default") as TextFieldImeAction;
}

export function FormTextInput({
  defaultValue,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize,
  autoCorrect,
  secureTextEntry,
  editable,
  onSubmitEditing,
  returnKeyType,
  multiline,
  maxLength,
  autoFocus,
}: FormTextInputProps) {
  const state = useNativeState(defaultValue ?? "");

  return (
    <TextField
      value={state}
      onValueChange={onChangeText}
      autoFocus={autoFocus}
      enabled={editable !== false}
      readOnly={editable === false}
      singleLine={!multiline}
      maxLength={maxLength}
      visualTransformation={secureTextEntry ? "password" : "none"}
      keyboardOptions={{
        keyboardType: mapKeyboardType(keyboardType),
        capitalization: autoCapitalize ?? "none",
        autoCorrectEnabled: autoCorrect,
        imeAction: mapReturnKeyType(returnKeyType),
      }}
      keyboardActions={
        onSubmitEditing
          ? {
              onDone: onSubmitEditing,
              onGo: onSubmitEditing,
              onNext: onSubmitEditing,
              onSearch: onSubmitEditing,
              onSend: onSubmitEditing,
            }
          : undefined
      }
    >
      {placeholder ? (
        <TextField.Placeholder>
          <Text>{placeholder}</Text>
        </TextField.Placeholder>
      ) : null}
    </TextField>
  );
}

export type { FormTextInputProps } from "./form-text-input";
