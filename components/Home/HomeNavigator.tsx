import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AddTransactionScreen from "./AddTransaction/AddTransactionScreen";
import FilterScreen from "./Filter/FilterScreen";
import { Transaction } from "../../interfaces/transaction.type";

export type RootStackParamList = {
  HomeScreen: {};
  AddTransactionScreen: { editTransaction?: Transaction };
  FilterScreen: {};
  FragmentTwo: {};
};

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
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
                onPress={() => navigation.navigate("AddTransactionScreen")}
              />
            </View>
          ),
        })}
      ></Stack.Screen>
      <Stack.Screen
        name="AddTransactionScreen"
        options={{
          title: "Add Transaction",
        }}
        // @ts-ignore
        component={AddTransactionScreen}
        initialParams={{
          editTransaction: {
            _id: "",
            sum: null,
            description: "",
            category: "",
            date: null,
          } as Transaction,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="FilterScreen"
        options={{ title: "Filter" }}
        component={FilterScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeNavigator;
