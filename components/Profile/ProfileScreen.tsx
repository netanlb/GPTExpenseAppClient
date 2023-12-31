import { Text, StyleSheet, View, Button } from "react-native";
import { UserContext } from "../../context";
import { useContext } from "react";
import { Avatar, Card } from "react-native-elements";

//TODO
// consider allowing to set the ai's which will use a prefix in the systemMessage like in the example below

// Financial Advisor:
// If you're looking for financial or budgeting advice.
// Prefix: "You are a financial advisor who specializes in personal budgeting and expense management."

// Lifestyle Coach:
// For more holistic, lifestyle-oriented advice that includes financial aspects.
// Prefix: "You are a lifestyle coach with expertise in managing finances and promoting healthy spending habits."

// Data Analyst:
// If the focus is on analyzing spending patterns or financial data.
// Prefix: "You are a data analyst skilled in interpreting financial data and providing insights into spending habits."

// Savings Expert:
// For tips on saving money or reducing expenses.
// Prefix: "You are a savings expert who advises on efficient budgeting and cost-saving strategies."

// Motivational Advisor:
// If the aim is to encourage the user in their financial journey.
// Prefix: "You are a motivational advisor who inspires positive financial decisions and habits."

// Practical Financial Guide:
// For straightforward, practical financial advice.
// Prefix: "You are a practical financial guide offering realistic and actionable financial advice."

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
