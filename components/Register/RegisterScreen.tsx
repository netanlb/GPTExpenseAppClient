import { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface Validator {
  check: boolean;
  message: string;
}

interface Validators {
  [key: string]: Validator;
}

const RegisterScreen = () => {
  // States
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");

  const [inputErrors, setInputErrors] = useState<string[]>([]);

  // Methods

  const hasSpace = (str: string): boolean => {
    return str.trim().indexOf(" ") >= 0;
  };

  const validators: Validators = {
    isValidUserName: {
      check: !hasSpace(userName) && userName.trim().length > 5,
      message:
        "username must be at least 6 characters long and contain no spaces",
    },
    isValidPassword: {
      check: password.trim().length > 5 && !hasSpace(password),
      message:
        "password must be at least 6 characters long and contain no spaces",
    },
    passwordsMatch: {
      check: password === verifyPassword,
      message: "password fields must match",
    },
  };

  const handleRegister = (): void => {
    const newInputErrors: string[] = [];

    Object.entries(validators).forEach(
      ([key, value]) => !value.check && newInputErrors.push(value.message)
    );

    setInputErrors(newInputErrors);

    if (newInputErrors.length) return;

    // make an api call to save the registered details
    // login and navigate to the main screen
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <Text>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          onChangeText={setUserName}
          value={userName}
        ></TextInput>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          onChangeText={setPassword}
          value={password}
        ></TextInput>
        <Text>Verify Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password again"
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
    fontSize: 14,
    color: "red",
  },
  label: {
    position: "relative",
    top: 20,
    opacity: 0,
  },
  labelFocused: {
    top: 0,
    opacity: 1,
  },
});

export default RegisterScreen;
