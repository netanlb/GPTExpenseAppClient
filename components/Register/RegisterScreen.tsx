import { useState, useContext } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { UserContext } from "../../context";

interface Validator {
  check: boolean;
  message: string;
}

interface Validators {
  [key: string]: Validator;
}

const emailRegex = new RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const RegisterScreen = () => {
  const { loginUser, registerUser } = useContext(UserContext);
  // States
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");
  const [inputErrors, setInputErrors] = useState<string[]>([]);

  // Methods

  const handleRegister = (): void => {
    if (!validateForm()) return;

    registerUserApi();
  };

  const registerUserApi = async (): Promise<void> => {
    try {
      await registerUser(userName, email, password);
    } catch (err: any) {
      setInputErrors([err.message]);
    }
  };

  const hasSpace = (str: string): boolean => {
    return str.trim().indexOf(" ") >= 0;
  };

  // validation and input error messages
  const validators: Validators = {
    isValidUserName: {
      check: !hasSpace(userName) && userName.trim().length > 5,
      message:
        "username must be at least 6 characters long and contain no spaces",
    },
    isValidEmail: {
      check: emailRegex.test(email),
      message: "email is invalid",
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

  const validateForm = (): boolean => {
    const newInputErrors: string[] = [];

    Object.entries(validators).forEach(
      ([key, value]) => !value.check && newInputErrors.push(value.message)
    );

    setInputErrors(newInputErrors);
    return !newInputErrors.length;
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
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          onChangeText={setEmail}
          value={email}
        ></TextInput>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        ></TextInput>
        <Text>Verify Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password again"
          onChangeText={setVerifyPassword}
          value={verifyPassword}
          secureTextEntry={true}
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
});

export default RegisterScreen;
