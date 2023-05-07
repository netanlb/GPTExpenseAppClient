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

const mockUser = {
  id: "123",
  username: "netanlb",
  password: "123456",
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { setIsLoggedIn, setUserId } = useContext(UserContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (): void => {
    setIsLoggedIn(true);
    setUserId("123"); // should recieve from api
  };

  const handleRegister = (): void => {
    navigation.navigate("Register");
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
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
        <Button title="Login" onPress={handleLogin} />
        <TouchableOpacity onPress={handleRegister}>
          <Text style={{ textAlign: "center", marginTop: 20 }}>Register</Text>
        </TouchableOpacity>
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
});

export default LoginScreen;
