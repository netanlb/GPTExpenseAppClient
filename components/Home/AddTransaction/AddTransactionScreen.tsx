import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useContext, useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Transaction } from "../../../interfaces/transaction.type";
import { RootStackParamList } from "../HomeNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import TransactionContext from "../../../context/Transaction/TransactionContext";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddTransactionScreen"
>;
type AddTransactionRouteProp = RouteProp<
  RootStackParamList,
  "AddTransactionScreen"
>;

type AddTransactionScreenProps = {
  navigation: NavigationProp;
  route?: AddTransactionRouteProp;
};

const AddTransactionScreen: React.FC<AddTransactionScreenProps> = ({
  navigation,
  route,
}) => {
  useEffect(() => {
    if (route?.params?.editTransaction?._id) {
      setTransaction(route.params.editTransaction);
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [route?.params?.editTransaction]);

  const { addTransaction, updateTransaction } = useContext(TransactionContext);

  const [transaction, setTransaction] = useState<Transaction>({
    description: "",
    sum: null,
    category: "",
    date: new Date(),
    transactionType: "expense",
  });

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [mode, setMode] = useState<
    "date" | "countdown" | "time" | "datetime" | null
  >(null);

  const onChange = (event: any, selectedDate?: Date) => {
    let currentDate = selectedDate
      ? new Date(selectedDate)
      : new Date(transaction.date!);

    // Set time to start of the day in local timezone
    currentDate.setHours(0, 0, 0, 0);

    // Adjust for the timezone offset to align with UTC
    // Since Israel is UTC+2, the offset is negative
    const timezoneOffsetInMinutes = currentDate.getTimezoneOffset();
    currentDate = new Date(
      currentDate.getTime() - timezoneOffsetInMinutes * 60000
    );

    setMode(null); // Hide the picker after selection
    setTransaction({ ...transaction, date: currentDate });
  };

  const onSubmitTransaction = (): void => {
    if (!areAllFieldsFilled()) {
      Alert.alert("", "Please make sure to fill all the fields");
      return;
    }

    isEdit ? updateTransaction(transaction) : addTransaction(transaction);
    navigation.navigate("HomeScreen", {});
  };

  const areAllFieldsFilled = (): boolean => {
    return !!(
      transaction.sum &&
      transaction.category &&
      transaction.date &&
      transaction.transactionType &&
      transaction.description
    );
  };

  const categories = [
    { label: "None", value: "" },
    { label: "Housing", value: "Housing" },
    { label: "Utilities", value: "Utilities" },
    { label: "Food", value: "Food" },
    { label: "Groceries", value: "Groceries" },
    { label: "Transportation", value: "Transportation" },
    { label: "Healthcare", value: "Healthcare" },
    { label: "Education", value: "Education" },
    { label: "Entertainment", value: "Entertainment" },
    { label: "Personal Care", value: "Personal Care" },
    { label: "Clothing", value: "Clothing" },
    { label: "Other", value: "Other" },
  ];

  const transactionTypes = [
    { label: "Expense", value: "expense" },
    { label: "Income", value: "income" },
    { label: "Saving", value: "saving" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Transaction</Text>
      <Text>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe the transaction"
        value={transaction.description}
        onChangeText={(value) =>
          setTransaction({ ...transaction, description: value })
        }
      ></TextInput>
      <Text>Sum</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Sum of the transaction"
        value={transaction.sum ? "" + transaction.sum : ""}
        onChangeText={(value) =>
          value
            ? setTransaction({ ...transaction, sum: +value })
            : setTransaction({ ...transaction, sum: null })
        }
      ></TextInput>
      <Text>Transaction Type</Text>
      <View style={styles.input}>
        <Picker
          selectedValue={transaction.transactionType || "none"}
          onValueChange={(itemValue) =>
            setTransaction({ ...transaction, transactionType: itemValue })
          }
          style={styles.picker}
        >
          {transactionTypes.map((item, i) => (
            <Picker.Item
              key={"transactionType-" + i}
              label={item.label}
              value={item.value}
            ></Picker.Item>
          ))}
        </Picker>
      </View>
      <Text>Category</Text>
      <View style={styles.input}>
        <Picker
          selectedValue={transaction.category || "none"}
          onValueChange={(itemValue) =>
            setTransaction({ ...transaction, category: itemValue })
          }
          style={styles.picker}
        >
          {categories.map((item, i) => (
            <Picker.Item
              key={"category-" + i}
              label={item.label}
              value={item.value}
            ></Picker.Item>
          ))}
        </Picker>
      </View>
      <Text>Date</Text>
      <Button title="Pick a Date" onPress={() => setMode("date")}></Button>
      {mode && (
        <DateTimePicker
          value={transaction.date ?? new Date()}
          mode={mode}
          onChange={onChange}
        />
      )}
      <View style={{ marginBottom: 60 }}></View>
      <Button title="+ Add" onPress={onSubmitTransaction} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 20 },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 3,
  },
  picker: {
    top: -8,
  },
  errorMessage: {
    fontSize: 14,
    color: "red",
  },
  label: {
    position: "relative",
    top: 20,
    opacity: 0,
  },
  labelFocused: {
    top: 0,
    opacity: 1,
  },
});

export default AddTransactionScreen;
