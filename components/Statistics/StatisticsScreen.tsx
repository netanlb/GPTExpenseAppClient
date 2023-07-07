import React, { useContext, useState, useEffect } from "react";

import { VictoryPie, VictoryLabel } from "victory-native";
import { ExpenseContext } from "../../context";
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Button,
} from "react-native";
import { Alert } from "react-native";

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
const years = ["2022", "2023"];

const barColors = [
  "#4285F4",
  "#DB4437",
  "#F4B400",
  "#0F9D58",
  "#AB47BC",
  "#00ACC1",
  "#FF7043",
  "#9E9D24",
  "#5C6BC0",
  "#F06292",
  "#00796B",
  "#C2185B",
];

interface ExpenseData {
  category: string;
  totalSum: string;
}

interface PieData {
  x: string;
  y: number;
  fill: string;
}

const StatisticsScreen: React.FC = () => {
  const { fetchGroupedExpenses } = useContext(ExpenseContext);
  const [pieData, setPieData] = useState<PieData[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  useEffect(() => {
    getGroupedExpenses();
  }, []);

  const getGroupedExpenses = async () => {
    try {
      let year = parseInt(selectedYear);
      let month = months.indexOf(selectedMonth);
      const withYearAndMonth = year && month !== -1;

      const groupedExpenses = withYearAndMonth
        ? await fetchGroupedExpenses(year, month)
        : await fetchGroupedExpenses();

      const formattedData = formatData(groupedExpenses);
      setPieData(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const formatData = (data: ExpenseData[]): PieData[] => {
    return data.map((item, index) => {
      return {
        x: item.category,
        y: parseInt(item.totalSum),
        fill: barColors[index % barColors.length],
      };
    });
  };

  const toggleSelection = (
    item: string,
    selectedItem: string,
    setSelectedItem: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (selectedItem === item) {
      setSelectedItem("");
    } else {
      setSelectedItem(item);
    }
  };

  const renderItem = (
    { item }: { item: string },
    selectedItem: string,
    setSelectedItem: React.Dispatch<React.SetStateAction<string>>
  ) => (
    <TouchableOpacity
      style={[styles.item, selectedItem === item && styles.selectedItem]}
      onPress={() => toggleSelection(item, selectedItem, setSelectedItem)}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const handleFetchData = () => {
    if (!selectedYear || !selectedMonth) {
      Alert.alert("Please select a year and a month");
      return;
    }
    getGroupedExpenses();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ScrollView style={styles.container}>
        <Text style={styles.itemTitle}>Year</Text>
        <FlatList
          data={years}
          renderItem={(item) => renderItem(item, selectedYear, setSelectedYear)}
          keyExtractor={(item) => item}
          horizontal
        />

        <Text style={styles.itemTitle}>Month</Text>
        <FlatList
          data={months}
          renderItem={(item) =>
            renderItem(item, selectedMonth, setSelectedMonth)
          }
          keyExtractor={(item) => item}
          horizontal
        />
        <Button title="Fetch Data" onPress={handleFetchData}></Button>
      </ScrollView>

      {pieData.length > 0 && (
        <VictoryPie
          data={pieData}
          labels={({ datum }) => `${datum.x}:\n${datum.y}`}
          labelComponent={<VictoryLabel />}
          style={{
            labels: { fill: "black", fontSize: 10 },
            data: { fill: ({ datum }) => datum.fill },
          }}
          padding={{ top: 20, bottom: 20, right: 60, left: 60 }}
          animate={{
            duration: 500,
            onLoad: { duration: 500 },
          }}
        />
      )}
    </View>
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
});

export default StatisticsScreen;
