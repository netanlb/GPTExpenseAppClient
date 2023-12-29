import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { IExpense } from "../../interfaces/iExpense";
import { ExpenseContext } from "../../context";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/FontAwesome";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./HomeNavigator";

interface FragmentTwoProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const FragmentTwo: React.FC<FragmentTwoProps> = ({ navigation }) => {
  const { expenseList, deleteExpense, isLoading } = useContext(ExpenseContext);

  const deleteItem = async (id: string) => {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteExpense(id),
        },
      ],
      { cancelable: false }
    );
  };

  const editItem = async (item: IExpense) => {
    navigation.navigate("AddExpenseScreen", { editExpense: item });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", paddingTop: 200 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SwipeListView
        data={expenseList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item: expense }: { item: IExpense }) => (
          <View key={expense._id} style={styles.expenseItem}>
            <View>
              <Text style={styles.expenseName}>{expense.description}</Text>
              <Text style={styles.expenseDetails}>{expense.category}</Text>
            </View>
            <View>
              <Text style={styles.expenseDetails}>
                {expense.sum!.toFixed(2)}
              </Text>
              <Text style={styles.expenseDetails}>
                {new Date(expense.date!).toLocaleDateString()}
              </Text>
            </View>
          </View>
        )}
        renderHiddenItem={({ item }: { item: IExpense }, rowMap) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => deleteItem(item._id!)}
            >
              <Icon name="trash" color={"white"} size={20}></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => editItem(item)}
            >
              <Icon name="edit" color={"white"} size={20}></Icon>
            </TouchableOpacity>
          </View>
        )}
        stopRightSwipe={-130}
        stopLeftSwipe={30}
        leftOpenValue={0}
        rightOpenValue={-120}
      />
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
    height: 60,
    elevation: 1,
  },
  expenseName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  expenseDetails: {
    fontSize: 14,
  },
  rowBack: {
    flex: 1,
    flexDirection: "row",
  },
  deleteBtn: {
    alignItems: "center",
    backgroundColor: "red",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    height: 60,
    width: 60,
    right: 0,
  },
  editBtn: {
    alignItems: "center",
    backgroundColor: "gray",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    height: 60,
    width: 60,
    right: 60,
  },
});

export default FragmentTwo;
