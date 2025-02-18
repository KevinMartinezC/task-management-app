import { View, Text, TextInput, StyleSheet, Platform } from "react-native";
import ThemedTextInput from "../theme/components/ThemedTextInput";
import ThemedButton from "../theme/components/ThemedButton";

const TaskScreenContent = () => {
  return (
    <View style={styles.container}>
      <ThemedTextInput placeholder="Task title" />
      <View style={styles.buttonContainer}>
        <ThemedButton children="Create" />
      </View>
    </View>
  );
};

export default TaskScreenContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: Platform.OS === "ios" ? 40 : 10,
    marginHorizontal: 20,
  },
});
