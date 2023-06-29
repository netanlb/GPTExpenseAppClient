import { Text, StyleSheet, View, Button } from "react-native";
import { UserContext } from "../../context";
import { useContext } from "react";
import { Avatar, Card } from "react-native-elements";

const ProfileScreen = () => {
  const { user, signOutUser } = useContext(UserContext);

  const handleSignOut = (): void => {
    signOutUser();
  };
  return (
    <View style={styles.container}>
      <Avatar
        size="large"
        rounded
        icon={{ name: "user", type: "font-awesome" }}
        overlayContainerStyle={{ backgroundColor: "blue" }}
      />
      <Text style={styles.userName}>{user?.name}</Text>
      {/* @ts-ignore */}
      <Card>
        <Card.Title>User Details</Card.Title>
        <Card.Divider />
        <Text>Email: {user?.email}</Text>
        <Text>User ID: {user?.id}</Text>
      </Card>
      <View style={styles.spacer}></View>
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
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  spacer: {
    margin: 10,
  },
});

export default ProfileScreen;
