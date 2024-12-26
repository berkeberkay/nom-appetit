import { StyleSheet, TextInput } from "react-native";

type InputForms = {
  value: string;
  onChangeText: (type: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
};

export default function Input(props: InputForms) {
  return (
    <TextInput
      style={styles.input}
      value={props.value}
      onChangeText={props.onChangeText}
      placeholder={props.placeholder}
      placeholderTextColor="#747474"
      secureTextEntry={props.secureTextEntry}
      autoCapitalize={props.autoCapitalize}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E2E2E2",
    fontFamily: "GT-America-Standard-Regular",
    fontSize: 14, 
  },
});
