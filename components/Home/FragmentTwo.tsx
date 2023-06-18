import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { IExpense } from "../../interfaces/iExpense";
import { ExpenseContext } from "../../context";

const FragmentTwo: React.FC = () => {
  const { expenseList } = useContext(ExpenseContext);

  return (
    <View style={styles.container}>
      {expenseList.map((expense: IExpense) => (
        <View key={expense.id} style={styles.expenseItem}>
          <View>
            <Text style={styles.expenseName}>{expense.name}</Text>
            <Text style={styles.expenseDetails}>{expense.category}</Text>
          </View>
          <View>
            <Text style={styles.expenseDetails}>
              {expense.cost!.toFixed(2)}
            </Text>
            <Text style={styles.expenseDetails}>
              {new Date(expense.date).toLocaleDateString()}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eaeaea",
  },
  expenseItem: {
    backgroundColor: "#fff",
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    elevation: 1,
  },
  expenseName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  expenseDetails: {
    fontSize: 14,
  },
});

export default FragmentTwo;
