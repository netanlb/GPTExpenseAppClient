import { View, StyleSheet, ScrollView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FragmentOne from "./FragmentOne";
import FragmentTwo from "./FragmentTwo";
import { ExpenseProvider } from "../../context";

const Tab = createBottomTabNavigator();

const HomeScreen: React.FC = () => {
  return (
    <ExpenseProvider>
      <ScrollView stickyHeaderIndices={[0]}>
        <FragmentOne />
        <FragmentTwo />
      </ScrollView>
    </ExpenseProvider>
  );
};

export default HomeScreen;
