import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AddExpenseScreen from "./AddExpense/AddExpenseScreen";
import FilterScreen from "./Filter/FilterScreen";
import ExpenseProvider from "../../context/Expense/ExpenseProvider";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface RootStackParamList {
  [key: string]: undefined;
  HomeScreen: undefined;
  AddExpenseScreen: undefined;
  FilterScreen: undefined;
}

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <ExpenseProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "Home",
            headerRight: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="ios-filter"
                  size={30}
                  color="#007AFF"
                  onPress={() => navigation.navigate("FilterScreen")}
                />
                <View style={{ width: 20 }}></View>
                <Ionicons
                  name="add-circle"
                  size={30}
                  color="#007AFF"
                  onPress={() => navigation.navigate("AddExpenseScreen")}
                />
              </View>
            ),
          })}
        ></Stack.Screen>
        <Stack.Screen
          name="AddExpenseScreen"
          options={{
            title: "Add Expense",
          }}
          component={AddExpenseScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="FilterScreen"
          options={{ title: "Filter" }}
          component={FilterScreen}
        ></Stack.Screen>
      </Stack.Navigator>
    </ExpenseProvider>
  );
};

export default HomeNavigator;
