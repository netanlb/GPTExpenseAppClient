import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useContext, useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ExpenseContext } from "../../../context";
import { IExpense } from "../../../interfaces/iExpense";
import { RootStackParamList } from "../HomeNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddExpenseScreen"
>;
type AddExpenseRouteProp = RouteProp<RootStackParamList, "AddExpenseScreen">;

type AddExpenseScreenProps = {
  navigation: NavigationProp;
  route?: AddExpenseRouteProp;
};

const AddExpenseScreen: React.FC<AddExpenseScreenProps> = ({
  navigation,
  route,
}) => {
  useEffect(() => {
    if (route?.params?.editExpense) {
      setExpense(route.params.editExpense);
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [route?.params?.editExpense]);

  const { addExpense, updateExpense } = useContext(ExpenseContext);

  const [expense, setExpense] = useState<IExpense>({
    description: "",
    sum: null,
    category: "",
    date: new Date(),
  });

  const [isEdit, setIsEdit] = useState<boolean>(false);

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

    isEdit ? updateExpense(expense) : addExpense(expense);
    navigation.navigate("HomeScreen", {});
  };

  const areAllFieldsFilled = (): boolean => {
    return !!(expense.sum && expense.category && expense.date);
  };

  const items = [
    { label: "None", value: "" },
    { label: "Housing", value: "Housing" },
    { label: "Utilities", value: "Utilities" },
    { label: "Food", value: "Food" },
    { label: "Transportation", value: "Transportation" },
    { label: "Healthcare", value: "Healthcare" },
    { label: "Education", value: "Education" },
    { label: "Entertainment", value: "Entertainment" },
    { label: "Personal Care", value: "Personal Care" },
    { label: "Clothing", value: "Clothing" },
    { label: "Other", value: "Other" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Expense</Text>
      <Text>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe the expense"
        value={expense.description}
        onChangeText={(value) => setExpense({ ...expense, description: value })}
      ></TextInput>
      <Text>Cost</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="How much did you spend"
        value={expense.sum ? "" + expense.sum : ""}
        onChangeText={(value) =>
          value
            ? setExpense({ ...expense, sum: +value })
            : setExpense({ ...expense, sum: null })
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
