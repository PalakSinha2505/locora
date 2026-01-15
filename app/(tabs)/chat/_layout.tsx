import { Stack } from "expo-router";

export default function ChatLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Chats" }}
      />
      <Stack.Screen
        name="room"
        options={{ title: "Chat Room" }}
      />
    </Stack>
  );
}
