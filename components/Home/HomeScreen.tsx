import { View, StyleSheet, ScrollView } from "react-native";
import FragmentOne from "./FragmentOne";
import FragmentTwo from "./FragmentTwo";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <FragmentOne />
      <FragmentTwo />
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 160, // Adjust the value accordingly
  },
});
