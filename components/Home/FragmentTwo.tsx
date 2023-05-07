import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FragmentTwo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Fragment One</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FragmentTwo;
