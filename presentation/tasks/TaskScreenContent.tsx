import { View, StyleSheet, Platform } from "react-native";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ThemedTextInput from "../theme/components/ThemedTextInput";
import ThemedButton from "../theme/components/ThemedButton";
import DropdownMenuComponent from "./components/DropdownMenu";
import { estimatePointsOptions } from "./utils/estimatePoint";
import { User } from "@/core/user/interfaces/users.interface";
import { generateUserList } from "./utils/userListHelper";
import MultiSelectDropdown from "./components/MultiSelectDropdown";
import { ThemedText } from "../theme/components/ThemedText";
import DatePickerComponent from "./components/DatePickerComponent";

interface Props {
  users: User[];
}
const options = [{ label: "IOS" }, { label: "Android" }, { label: "React" }];

const TaskScreenContent = ({ users }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      tags: [],
      assigneeId: "",
      pointEstimate: "",
      dueDate: new Date(),
    },
  });
  const usersList = generateUserList(users);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [taskDate, setTaskDate] = useState<Date>(new Date());

  const onSubmit = (data: any) => {
    console.log("form data", data);
  };

  return (
    <View style={styles.container}>
      <ThemedText children={"Title"} style={styles.label} />
      <Controller
        control={control}
        name="name"
        rules={{ required: "Title is required" }}
        render={({ field: { onChange, value } }) => (
          <ThemedTextInput
            placeholder="Task title"
            style={styles.inputStyle}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && (
        <ThemedText children={errors.name.message} style={styles.errorText} />
      )}

      {/* Estimate */}
      <ThemedText children={"Estimate"} style={styles.label} />
      <Controller
        control={control}
        name="pointEstimate"
        rules={{ required: "Estimate is required" }}
        render={({ field: { onChange } }) => (
          <DropdownMenuComponent
            options={estimatePointsOptions}
            leftLabel="Estimate"
            leftIcon="time-outline"
            onSeclect={onChange}
          />
        )}
      />
      {errors.pointEstimate && (
        <ThemedText
          children={errors.pointEstimate.message}
          style={styles.errorText}
        />
      )}

      {/* Assignee */}
      <ThemedText children={"Assignee"} style={styles.label} />
      <Controller
        control={control}
        name="assigneeId"
        render={({ field: { onChange } }) => (
          <DropdownMenuComponent
            options={usersList}
            leftLabel="Assignee"
            leftIcon="person-outline"
            onSeclect={onChange}
          />
        )}
      />
      {errors.assigneeId && (
        <ThemedText
          children={errors.assigneeId.message}
          style={styles.errorText}
        />
      )}

      {/* Labels */}
      <ThemedText children={"Labels"} style={styles.label} />
      <Controller
        control={control}
        name="tags"
        render={({ field: { onChange, value } }) => (
          <MultiSelectDropdown
            options={options}
            selectedOptions={value}
            onSelect={onChange}
          />
        )}
      />

      {/* Due Date */}
      <ThemedText children={"Due Date"} style={styles.label} />
      <Controller
        control={control}
        name="dueDate"
        render={({ field: { onChange, value } }) => (
          <DatePickerComponent date={value} onChange={onChange} />
        )}
      />

      <View style={styles.buttonContainer}>
        <ThemedButton children="Create" onPress={handleSubmit(onSubmit)} />
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
  label: {
    marginVertical: 6,
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
