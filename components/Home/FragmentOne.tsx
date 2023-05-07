import React, { useRef } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

type ViewRef = React.RefObject<View>;

const FragmentOne: React.FC = () => {
  const viewRef: ViewRef = useRef<View>(null);

  return (
    <View ref={viewRef} style={styles.container}>
      <Text style={styles.text}>Fragment One</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: "#007AFF",
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});

export default FragmentOne;
