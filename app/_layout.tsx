import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* add "options={{ headerShown: false }}" para madula ang header */}
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="test" options={{ headerShown: false }}/>
    </Stack>
  );
}
