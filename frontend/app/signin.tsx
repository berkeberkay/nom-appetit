import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const { onSignIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const signin_response = await onSignIn(username, password);
      if (signin_response.error == true) {
        throw new Error(signin_response.msg);
      }
    } catch (error) {
      setPassword("")
      alert(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Input
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
            autoCapitalize="none"
          />
          <Input
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
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
  inputContainer: {
    gap: 10,
    marginBottom: 20,
  },
  button: {
    padding: 12,
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "GT-America-Standard-Bold",
  },
});
