import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StatisticsScreen from "./StatisticsScreen";
import React, { useContext } from "react";
import TransactionContext from "../../context/Transaction/TransactionContext";

const Stack = createNativeStackNavigator();

const StatisticsNavigator = () => {
  const { transactionList, fetchTransactions } = useContext(TransactionContext);

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
