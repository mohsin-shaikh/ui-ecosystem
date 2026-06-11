import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: 24,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "600" }}>Page not found</Text>
      <Link href="/">Go home</Link>
    </View>
  );
}
