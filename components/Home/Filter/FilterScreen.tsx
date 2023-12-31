import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../HomeNavigator";
import { ActivityIndicator } from "react-native-paper";
import TransactionContext from "../../../context/Transaction/TransactionContext";

interface FilterProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "FilterScreen">;
}

const FilterScreen: React.FC<FilterProps> = ({ navigation }) => {
  const { resetTransactions, fetchTransactions, isLoading } =
    useContext(TransactionContext);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<
    string[]
  >([]);

  const [isFiltersInitialized, setIsFiltersInitialized] = useState(false);

  const [inputErrors, setInputErrors] = useState<string[]>([]);

  const monthsMap: { [key: string]: number } = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  const categoriesRef = useRef<string[]>([]);
  const monthsRef = useRef<string[]>([]);
  const yearsRef = useRef<string[]>([]);
  const transactionTypesRef = useRef<string[]>([]);

  useEffect(() => {
    async function initializeFilters() {
      const allTransactions = await fetchTransactions();
      categoriesRef.current = [
        ...new Set(
          allTransactions.map((transaction) => transaction["category"])
        ),
      ];
      monthsRef.current = [
        ...new Set(
          allTransactions.map(
            (transaction) =>
              new Date(transaction["date"]!).getMonth() ?? new Date().getMonth()
          )
        ),
      ].map((monthIndex) => Object.keys(monthsMap)[monthIndex]);
      yearsRef.current = [
        ...new Set(
          allTransactions.map(
            (transaction) =>
              new Date(transaction["date"]!).getFullYear().toString() ??
              new Date().getFullYear().toString()
          )
        ),
      ];

      transactionTypesRef.current = [
        ...new Set(
          allTransactions.map((transaction) => transaction["transactionType"])
        ),
      ];
      setIsFiltersInitialized(true);
    }

    initializeFilters();
  }, []);

  const handleFilter = () => {
    if (!validate()) return;
    const queryParamsLists: { [key: string]: string[] } = {
      category: selectedCategories.map((item) => item),
      month: selectedMonths.map((item: string) => "" + monthsMap[item]),
      year: selectedYears,
      transactionType: selectedTransactionTypes.map((item) => item),
    };

    // clear empty arrays
    Object.keys(queryParamsLists).forEach((key) => {
      !queryParamsLists[key].length && delete queryParamsLists[key];
    });

    resetTransactions(queryParamsLists);
    navigation.navigate("HomeScreen", {});
  };

  const validate = () => {
    setInputErrors([]);
    const isValid = !selectedMonths.length || selectedYears.length;
    if (!isValid) {
      setInputErrors(["Selected a month but not a year"]);
      return false;
    }
    return true;
  };

  const toggleSelection = (
    item: string,
    selectedItems: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const toggleSelectAll = (
    items: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>,
    selectedItems: string[]
  ) => {
    if (selectedItems.length !== items.length) {
      setSelectedItems(items);
    } else {
      setSelectedItems([]);
    }
  };

  const renderItem = (
    { item }: { item: string },
    selectedItems: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => (
    <TouchableOpacity
      style={[styles.item, selectedItems.includes(item) && styles.selectedItem]}
      onPress={() => toggleSelection(item, selectedItems, setSelectedItems)}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  if (!isFiltersInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.itemTitle}>Category</Text>

      <TouchableOpacity
        style={[
          styles.toggleAll,
          categoriesRef.current.length === selectedCategories.length &&
            styles.selectedAll,
        ]}
        onPress={() =>
          toggleSelectAll(
            categoriesRef.current,
            setSelectedCategories,
            selectedCategories
          )
        }
      >
        <Text>Select All</Text>
      </TouchableOpacity>

      <FlatList
        data={categoriesRef.current}
        renderItem={(item) =>
          renderItem(item, selectedCategories, setSelectedCategories)
        }
        keyExtractor={(item) => item}
        horizontal
      />
      <Text style={styles.itemTitle}>Year</Text>

      <TouchableOpacity
        style={[
          styles.toggleAll,
          yearsRef.current.length === selectedYears.length &&
            styles.selectedAll,
        ]}
        onPress={() =>
          toggleSelectAll(yearsRef.current, setSelectedYears, selectedYears)
        }
      >
        <Text>Select All</Text>
      </TouchableOpacity>

      <FlatList
        data={yearsRef.current}
        renderItem={(item) => renderItem(item, selectedYears, setSelectedYears)}
        keyExtractor={(item) => item}
        horizontal
      />

      <Text style={styles.itemTitle}>Month</Text>

      <TouchableOpacity
        style={[
          styles.toggleAll,
          monthsRef.current.length === selectedMonths.length &&
            styles.selectedAll,
        ]}
        onPress={() =>
          toggleSelectAll(monthsRef.current, setSelectedMonths, selectedMonths)
        }
      >
        <Text>Select All</Text>
      </TouchableOpacity>

      <FlatList
        data={monthsRef.current}
        renderItem={(item) =>
          renderItem(item, selectedMonths, setSelectedMonths)
        }
        keyExtractor={(item) => item}
        horizontal
      />

      <View style={styles.spacer}></View>

      <Text style={styles.itemTitle}>Transaction Type</Text>

      <TouchableOpacity
        style={[
          styles.toggleAll,
          transactionTypesRef.current.length ===
            selectedTransactionTypes.length && styles.selectedAll,
        ]}
        onPress={() =>
          toggleSelectAll(
            transactionTypesRef.current,
            setSelectedTransactionTypes,
            selectedTransactionTypes
          )
        }
      >
        <Text>Select All</Text>
      </TouchableOpacity>

      <FlatList
        data={transactionTypesRef.current}
        renderItem={(item) =>
          renderItem(
            item,
            selectedTransactionTypes,
            setSelectedTransactionTypes
          )
        }
        keyExtractor={(item) => item}
        horizontal
      />

      <View style={styles.spacer}></View>
      <Button title="Apply Filters" onPress={handleFilter}></Button>
      {inputErrors.map((error: string, i: number) => (
        <Text style={styles.errorMessage} key={i}>
          {error}
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  spacer: {
    margin: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  item: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    margin: 5,
  },
  selectedItem: {
    backgroundColor: "lightgray",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
  },
  toggleAll: {
    padding: 10,
    margin: 5,
  },
  selectedAll: {},
  errorMessage: {
    fontSize: 14,
    color: "red",
  },
});

export default FilterScreen;
