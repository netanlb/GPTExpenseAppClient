import { Text, StyleSheet, View, Button } from "react-native";
import { UserProvider, UserContext } from "../../context";
import { useContext } from "react";

const ProfileScreen = () => {
  const { userId, setIsLoggedIn, setUserId } = useContext(UserContext);

  const handleSignOut = (): void => {
    setIsLoggedIn(false);
    setUserId("");
  };

  return (
    <View style={styles.container}>
      <Text>User ID: {userId}</Text>
      <Button title="Sign Out" onPress={handleSignOut}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
