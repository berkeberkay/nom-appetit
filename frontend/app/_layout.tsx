import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "../context/AuthContext";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "GT-America-Standard-Regular": require("../assets/fonts/GT-America-Standard-Regular.ttf"),
    "GT-America-Standard-Bold": require("../assets/fonts/GT-America-Standard-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="register" />
          <Stack.Screen name="signin" />
        </Stack>
      </AuthProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
});
