import { View, StyleSheet, ScrollView } from "react-native";
import FragmentOne from "./FragmentOne";
import FragmentTwo from "./FragmentTwo";
import { ExpenseProvider } from "../../context";

const HomeScreen = () => {
  return (
  <ScrollView stickyHeaderIndices={[0]}>
    <FragmentOne />
    <FragmentTwo />
  </ScrollView>
  );
};
export default HomeScreen;
