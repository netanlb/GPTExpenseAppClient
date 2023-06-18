import React, { useRef } from "react";
import { ScrollView, View, Text, StyleSheet, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ViewRef = React.RefObject<View>;

const FragmentOne: React.FC = () => {
  const viewRef: ViewRef = useRef<View>(null);

  return (
    <View ref={viewRef} style={styles.container}>
      <Text style={styles.text}>Good Evening</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    height: 80,
    backgroundColor: "#007AFF",
    elevation: 5,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    padding: 10,
    fontSize: 20,
    fontWeight: "600",
  },
  addButton: {
    marginLeft: 10,
  },
});

export default FragmentOne;
