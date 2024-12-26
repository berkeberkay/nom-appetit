import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { onRegister, onSignIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      alert("Error: Passwords do not match");
    } else {
      handleRegister()
    }
  };

  const handleRegister = async () => {
    try {
      const register_response = await onRegister(username, password);
      if (register_response.error == true) {
        throw new Error(register_response.msg);
      }
      const signin_response = await onSignIn(username, password);
      if (signin_response.error == true) {
        throw new Error(signin_response.msg);
      }
    } catch (error) {
      setUsername("");
      setPassword("");
      setConfirmPassword("");
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
          <Input
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="Confirm Password"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={validatePassword}>
          <Text style={styles.buttonText}>Create Account</Text>
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
