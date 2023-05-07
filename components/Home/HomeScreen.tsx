import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FragmentOne from "./FragmentOne";
import FragmentTwo from "./FragmentTwo";

const mockExpenses = [
  { id: 1, title: "Food", amount: 200, date: new Date(2021, 5, 12) },
  { id: 2, title: "Groceries", amount: 100, date: new Date(2021, 5, 13) },
  { id: 3, title: "Fuel", amount: 50, date: new Date(2021, 5, 14) },
  { id: 4, title: "Food", amount: 200, date: new Date(2021, 5, 15) },
  { id: 5, title: "Groceries", amount: 100, date: new Date(2021, 5, 16) },
  { id: 6, title: "Fuel", amount: 50, date: new Date(2021, 5, 17) },
  { id: 7, title: "Food", amount: 200, date: new Date(2021, 5, 18) },
  { id: 8, title: "Groceries", amount: 100, date: new Date(2021, 5, 19) },
  { id: 9, title: "Fuel", amount: 50, date: new Date(2021, 5, 20) },
  { id: 10, title: "Food", amount: 200, date: new Date(2021, 5, 21) },
];

const Tab = createBottomTabNavigator();

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <FragmentOne />
      <FragmentTwo />
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

export default HomeScreen;
