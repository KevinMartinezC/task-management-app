import { View, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";

const LoadingIndicator = () => {
  return (
    <View style={style.container}>
      <ActivityIndicator />
    </View>
  );
};

export default LoadingIndicator;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
