import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import { ExpenseContext } from "../../../context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../HomeNavigator";

interface FilterProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "FilterScreen">;
}

const FilterScreen: React.FC<FilterProps> = ({ navigation }) => {
  const { fetchExpenses } = useContext(ExpenseContext);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

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

  const handleFilter = () => {
    if (!validate()) return;
    const queryParamsLists: { [key: string]: string[] } = {
      category: selectedCategories.map((item) => item.toLowerCase()),
      month: selectedMonths.map((item: string) => "" + monthsMap[item]),
      year: selectedYears,
    };

    // clear empty arrays
    Object.keys(queryParamsLists).forEach((key) => {
      !queryParamsLists[key].length && delete queryParamsLists[key];
    });

    fetchExpenses(queryParamsLists);
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

  const categories = [
    "Housing",
    "Utilities",
    "Food",
    "Transportation",
    "Healthcare",
    "Education",
    "Entertainment",
    "Personal Care",
    "Clothing",
    "Other",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = ["2022", "2023", "2024", "2025"];

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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.itemTitle}>Category</Text>

      <TouchableOpacity
        style={[
          styles.toggleAll,
          categories.length === selectedCategories.length && styles.selectedAll,
        ]}
        onPress={() =>
          toggleSelectAll(categories, setSelectedCategories, selectedCategories)
        }
      >
        <Text>Select All</Text>
      </TouchableOpacity>

      <FlatList
        data={categories}
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
          years.length === selectedYears.length && styles.selectedAll,
        ]}
        onPress={() => toggleSelectAll(years, setSelectedYears, selectedYears)}
      >
        <Text>Select All</Text>
      </TouchableOpacity>

      <FlatList
        data={years}
        renderItem={(item) => renderItem(item, selectedYears, setSelectedYears)}
        keyExtractor={(item) => item}
        horizontal
      />

      <Text style={styles.itemTitle}>Month</Text>

      <TouchableOpacity
        style={[
          styles.toggleAll,
          months.length === selectedMonths.length && styles.selectedAll,
        ]}
        onPress={() =>
          toggleSelectAll(months, setSelectedMonths, selectedMonths)
        }
      >
        <Text>Select All</Text>
      </TouchableOpacity>

      <FlatList
        data={months}
        renderItem={(item) =>
          renderItem(item, selectedMonths, setSelectedMonths)
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
