import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Transaction } from "../../interfaces/transaction.type";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/FontAwesome";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./HomeNavigator";
import TransactionContext from "../../context/Transaction/TransactionContext";

interface FragmentTwoProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const FragmentTwo: React.FC<FragmentTwoProps> = ({ navigation }) => {
  const { transactionList, deleteTransaction, isLoading } =
    useContext(TransactionContext);

  const deleteItem = async (id: string) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteTransaction(id),
        },
      ],
      { cancelable: false }
    );
  };

  const editItem = async (item: Transaction) => {
    navigation.navigate("AddTransactionScreen", { editTransaction: item });
  };

  const getTransactionMarkerColor = (type: string) => {
    switch (type) {
      case "income":
        return "#28a745"; // Bootstrap "Success" Green
      case "expense":
        return "#dc3545"; // Bootstrap "Danger" Red
      case "saving":
        return "#2196f3"; // Material Design Blue
      default:
        return "#D3D3D3"; // Light Grey for default
    }
  };

  const getTransactionSumColor = (type: string) => {
    switch (type) {
      case "income":
        return "#28a745"; // Bootstrap "Success" Green
      case "expense":
        return "#dc3545"; // Bootstrap "Danger" Red
      case "saving":
        return "#2196f3"; // Material Design Blue
      default:
        return "#00000"; // Light Grey for default
    }
  };

  const getFormattedDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
        data={transactionList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item: transaction }: { item: Transaction }) => (
          <View key={transaction._id} style={styles.transactionItem}>
            <View style={styles.transactionDesc}>
              <View
                style={{
                  ...styles.marker,
                  backgroundColor: getTransactionMarkerColor(
                    transaction.transactionType
                  ),
                }}
              />
              <View>
                <Text style={styles.transactionName}>
                  {transaction.description}
                </Text>
                <Text style={styles.transactionDetails}>
                  {transaction.category}
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  ...styles.transactionDetails,
                  color: getTransactionSumColor(transaction.transactionType),
                }}
              >
                {transaction.sum!.toFixed(2)}
              </Text>
              <Text style={styles.transactionDetails}>
                {getFormattedDate(new Date(transaction.date!))}
              </Text>
            </View>
          </View>
        )}
        renderHiddenItem={({ item }: { item: Transaction }, rowMap) => (
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
  transactionItem: {
    backgroundColor: "#fff",
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    height: 60,
    elevation: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  transactionDetails: {
    fontSize: 14,
  },
  transactionDesc: {
    flexDirection: "row",
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
  marker: {
    width: 5,
    height: 40,
    marginRight: 10,
    // ... other styles for marker
  },
});

export default FragmentTwo;
