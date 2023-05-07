import { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const RegisterScreen = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");
  const [inputErrors, setInputErrors] = useState<string[]>([]);

  const hasSpace = (str: string): boolean => {
    return str.trim().indexOf(" ") >= 0;
  };

  const isValidUserName = !hasSpace(userName) && userName.trim().length > 5;

  const isValidPassword = password.trim().length > 5 && !hasSpace(password);
  const passwordsMatch = password === verifyPassword;

  const handleRegister = (): void => {
    const newInputErrors: string[] = [];

    if (!isValidUserName)
      newInputErrors.push(
        "username must be at least 6 characters long and contain no spaces"
      );

    if (!isValidPassword)
      newInputErrors.push(
        "password must be at least 6 characters long and contain no spaces"
      );

    if (!passwordsMatch) newInputErrors.push("password fields must match");

    setInputErrors(newInputErrors);

    if (newInputErrors.length) return;

    // make an api call to save the registered details
    // login and navigate to the main screen
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUserName}
          value={userName}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="password"
          onChangeText={setPassword}
          value={password}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="verify password"
          onChangeText={setVerifyPassword}
          value={verifyPassword}
        ></TextInput>
        <Button title="Register" onPress={() => handleRegister()} />
        <View style={{ marginBottom: 20 }}></View>
        {inputErrors.map((error: string, i: number) => (
          <Text style={styles.errorMessage} key={i}>
            {error}
          </Text>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 20 },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  errorMessage: {
    fontSize: 1,
    color: "red",
  },
});

export default RegisterScreen;
