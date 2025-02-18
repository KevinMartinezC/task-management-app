import { View, StyleSheet, Platform } from "react-native";
import ThemedTextInput from "../theme/components/ThemedTextInput";
import ThemedButton from "../theme/components/ThemedButton";
import RowWithMenu from "./components/DropdownMenu";
import { estimatePointsOptions } from "./utils/estimatePoint";

const TaskScreenContent = () => {
  return (
    <View style={styles.container}>
      <ThemedTextInput placeholder="Task title" />
      <RowWithMenu
        options={estimatePointsOptions}
        leftLabel="Estimate"
        onSeclect={() => {}}
      />
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
