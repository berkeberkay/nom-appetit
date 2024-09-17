// app/(tabs)/_layout.tsx
import { Stack, Tabs } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="search-page" />
      <Stack.Screen name="restaurant" />
    </Stack>
  );
};

export default Layout;
