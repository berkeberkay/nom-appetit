import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="signin" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="forgotPassword" />
    </Stack>
  );
};

export default AuthLayout;
