import { View, StyleSheet, Platform } from "react-native";
import ThemedTextInput from "../theme/components/ThemedTextInput";
import ThemedButton from "../theme/components/ThemedButton";
import DropdownMenuComponent from "./components/DropdownMenu";
import { estimatePointsOptions } from "./utils/estimatePoint";
import { User } from "@/core/user/interfaces/users.interface";
import { generateUserList } from "./utils/userListHelper";
import MultiSelectDropdown from "./components/MultiSelectDropdown";
import { useState } from "react";
import { ThemedText } from "../theme/components/ThemedText";
import DatePickerComponent from "./components/DatePickerComponent";

interface Props {
  users: User[];
}
const options = [{ label: "IOS" }, { label: "Android" }, { label: "React" }];

const TaskScreenContent = ({ users }: Props) => {
  const usersList = generateUserList(users);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [taskDate, setTaskDate] = useState<Date>(new Date());

  return (
    <View style={styles.container}>
      <ThemedText children={"Title"} style={{ marginVertical: 6 }} />
      <ThemedTextInput placeholder="Task title" style={styles.inputStyle} />
      <ThemedText children={"Estimate"} style={{ marginVertical: 6 }} />
      <DropdownMenuComponent
        options={estimatePointsOptions}
        leftLabel="Estimate"
        leftIcon="time-outline"
        onSeclect={() => {}}
      />
      <ThemedText children={"Assignee"} style={{ marginVertical: 6 }} />
      <DropdownMenuComponent
        options={usersList}
        leftLabel="Assignee"
        leftIcon="person-outline"
        onSeclect={() => {}}
      />

      <ThemedText children={"Labels"} style={{ marginVertical: 6 }} />
      <MultiSelectDropdown
        options={options}
        selectedOptions={selectedTags}
        onSelect={setSelectedTags}
      />

      <ThemedText children={"Due Date"} style={{ marginVertical: 6 }} />
      <DatePickerComponent/>

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
  inputStyle: {
    marginVertical: Platform.OS === "ios" ? 10 : 0,
  },
});
