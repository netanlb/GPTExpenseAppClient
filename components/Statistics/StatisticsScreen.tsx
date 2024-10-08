import React, { useContext, useState, useEffect } from "react";

import { VictoryPie, VictoryLabel } from "victory-native";

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
import TransactionContext from "../../context/Transaction/TransactionContext";

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
const years = ["2022", "2023", "2024"];

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

interface TransactionData {
  category: string;
  totalSum: string;
}

interface PieData {
  x: string;
  y: number;
  fill: string;
}

const StatisticsScreen: React.FC = () => {
  const { fetchGroupedTransactions } = useContext(TransactionContext);
  const [pieData, setPieData] = useState<PieData[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    getGroupedTransactions();
  }, []);

  const getGroupedTransactions = async () => {
    try {
      let year = parseInt(selectedYear);
      let month = months.indexOf(selectedMonth);
      const withYearAndMonth = year && month !== -1;

      const groupedTransactions = withYearAndMonth
        ? await fetchGroupedTransactions(year, month)
        : await fetchGroupedTransactions();

      const formattedData = formatData(groupedTransactions);
      setPieData(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  const formatData = (data: TransactionData[]): PieData[] => {
    const totalOverall = data.reduce((total, item) => {
      return total + +item.totalSum;
    }, 0);

    setTotal(parseInt("" + totalOverall));

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
      Alert.alert("Invalid Month", "Please select a year and a month");
      return;
    }
    getGroupedTransactions();
  };

  return (
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
        renderItem={(item) => renderItem(item, selectedMonth, setSelectedMonth)}
        keyExtractor={(item) => item}
        horizontal
      />
      <View style={styles.spacer}></View>
      <Button title="Fetch Data" onPress={handleFetchData}></Button>
      {pieData.length > 0 ? (
        <>
          <View style={styles.spacer}></View>
          <Text style={styles.itemTitle}>Total: {total}</Text>
          <VictoryPie
            data={pieData}
            labels={({ datum }) => `${datum.x}:\n${datum.y}`}
            labelComponent={<VictoryLabel />}
            style={{
              labels: { fill: "black", fontSize: 10 },
              data: { fill: ({ datum }) => datum.fill },
            }}
            padding={{ top: 40, bottom: 40, right: 100, left: 50 }}
            animate={{
              duration: 500,
              onLoad: { duration: 500 },
            }}
          />
        </>
      ) : (
        <Text>No Transactions in selected month</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
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
