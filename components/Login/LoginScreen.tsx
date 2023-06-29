import { useState, useContext } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LoginScreenProps } from "../../navigation/AuthNavigator";
import { UserContext } from "../../context";

const emailRegex = new RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

interface Validator {
  check: boolean;
  message: string;
}

interface Validators {
  [key: string]: Validator;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { loginUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputErrors, setInputErrors] = useState<string[]>([]);

  const handleLogin = async (): Promise<void> => {
    if (!validateForm()) return;

    try {
      await loginUser(email, password);
    } catch (error: any) {
      setInputErrors([error.message]);
    }
  };

  // validation and setting of error messages
  const validateForm = (): boolean => {
    const newInputErrors: string[] = [];

    Object.entries(validators).forEach(
      ([key, value]) => !value.check && newInputErrors.push(value.message)
    );

    setInputErrors(newInputErrors);
    return !newInputErrors.length;
  };

  const hasSpace = (str: string): boolean => {
    return str.trim().indexOf(" ") >= 0;
  };

  const validators: Validators = {
    isValidEmail: {
      check: emailRegex.test(email),
      message: "email is invalid",
    },
    isValidPassword: {
      check: password.trim().length > 5 && !hasSpace(password),
      message: "password is invalid",
    },
  };

  // Navigation to registration screen
  const handleRegister = (): void => {
    navigation.navigate("Register");
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        ></TextInput>
        <Button title="Login" onPress={handleLogin} />
        <TouchableOpacity onPress={handleRegister}>
          <Text style={{ textAlign: "center", marginTop: 20 }}>Register</Text>
        </TouchableOpacity>
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

export default LoginScreen;
