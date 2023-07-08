import { View, StyleSheet, ScrollView } from "react-native";
import FragmentOne from "./FragmentOne";
import FragmentTwo from "./FragmentTwo";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./HomeNavigator";

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "AddExpenseScreen">;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FragmentOne />
      <FragmentTwo navigation={navigation} />
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 160, // Adjust the value accordingly
  },
});
