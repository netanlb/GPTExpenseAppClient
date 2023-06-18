import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useContext, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ExpenseContext } from "../../../context";
import { IExpense } from "../../../interfaces/iExpense";
import { RootStackParamList } from "../HomeNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface AddExpenseProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "AddExpenseScreen">;
}

const AddExpenseScreen: React.FC<AddExpenseProps> = ({ navigation }) => {
  const { addExpense } = useContext(ExpenseContext);

  const [expense, setExpense] = useState<IExpense>({
    id: null,
    name: "",
    cost: null,
    category: "",
    date: new Date(),
  });

  const [mode, setMode] = useState<
    "date" | "countdown" | "time" | "datetime" | null
  >(null);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || expense.date;
    setMode(null); // Hide the picker after selection
    setExpense({ ...expense, date: currentDate });
  };

  const onSubmitExpense = (): void => {
    if (!areAllFieldsFilled()) return;
    setExpense({ ...expense, id: expense.name + new Date().getTime() });
    addExpense(expense);
    navigation.navigate("HomeScreen");
  };

  const areAllFieldsFilled = (): boolean => {
    return !!(expense.cost && expense.category && expense.date);
  };

  const items = [
    { label: "None", value: "" },
    { label: "Food", value: "food" },
    { label: "Transportation", value: "transportation" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Bills", value: "bills" },
    { label: "Other", value: "other" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Expense</Text>
      <Text>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a name that describes the expense"
        value={expense.name}
        onChangeText={(value) => setExpense({ ...expense, name: value })}
      ></TextInput>
      <Text>Cost</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="How much did you spend"
        value={expense.cost ? "" + expense.cost : ""}
        onChangeText={(value) =>
          value
            ? setExpense({ ...expense, cost: +value })
            : setExpense({ ...expense, cost: null })
        }
      ></TextInput>
      <Text>Category</Text>
      <View style={styles.input}>
        <Picker
          selectedValue={expense.category || "none"}
          onValueChange={(itemValue) =>
            setExpense({ ...expense, category: itemValue })
          }
          style={styles.picker}
        >
          {items.map((item, i) => (
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
        <DateTimePicker value={expense.date} mode={mode} onChange={onChange} />
      )}
      <View style={{ marginBottom: 60 }}></View>
      <Button title="+ Add" onPress={onSubmitExpense} />
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

export default AddExpenseScreen;
