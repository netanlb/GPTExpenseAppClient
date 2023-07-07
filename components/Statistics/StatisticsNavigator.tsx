import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StatisticsScreen from "./StatisticsScreen";
import { ExpenseContext, ExpenseProvider, UserContext } from "../../context";
import React, { useContext } from "react";

const Stack = createNativeStackNavigator();

const StatisticsNavigator = () => {
  const { expenseList } = useContext(ExpenseContext);
  const { fetchExpenses } = useContext(ExpenseContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StatisticsScreen"
        component={StatisticsScreen}
        options={{ title: "Overview" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default StatisticsNavigator;
