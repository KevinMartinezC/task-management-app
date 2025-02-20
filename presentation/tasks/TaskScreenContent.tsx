import { View, StyleSheet, Platform, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import ThemedTextInput from "../theme/components/ThemedTextInput";
import DropdownMenuComponent from "./components/DropdownMenu";
import {
  estimatePointsOptions,
  getPointEstimateLabel,
} from "./utils/estimatePoint";
import { User } from "@/core/user/interfaces/users.interface";
import { generateUserList, getAssigneeName } from "./utils/userListHelper";
import MultiSelectDropdown from "./components/MultiSelectDropdown";
import { ThemedText } from "../theme/components/ThemedText";
import DatePickerComponent from "./components/DatePickerComponent";
import {
  getStatusLabel,
  statusLabels,
  statusOptions,
} from "./utils/statusHelper";
import { useTasks } from "../dashboard/hooks/useTasks";
import { Button } from "react-native-paper";
import { useThemeColor } from "../theme/hooks/useThemeColor";

interface Props {
  users: User[];
  taskData: TaskData;
}

const options = [{ label: "IOS" }, { label: "ANDROID" }, { label: "REACT" }];

const TaskScreenContent = ({ users, taskData }: Props) => {
  const primaryColor = useThemeColor({}, "primary");
  const { createTask, updateTask, loading } = useTasks();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskData>({
    defaultValues: {
      name: taskData.name,
      pointEstimate: getPointEstimateLabel(taskData.pointEstimate),
      status: getStatusLabel(taskData.status as keyof typeof statusLabels),
      assigneeId: getAssigneeName(taskData.assigneeId, users),
      tags: taskData.tags,
      dueDate: taskData.dueDate,
    },
  });

  const usersList = generateUserList(users);
  const onSubmit = async (data: TaskData) => {
    const formattedData = {
      ...data,
      dueDate:
        typeof data.dueDate === "string"
          ? data.dueDate
          : new Date(data.dueDate).toISOString(),
    };

    if (taskData.id) {
      const newData = {
        ...formattedData,
        id: taskData.id,
      }
      console.log("updateTask", newData);
      await updateTask(newData);
    } else {
      console.log("createTask");
      await createTask(formattedData);
    }
  };

  return (
    <ScrollView>
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
          render={({ field: { onChange, value } }) => (
            <DropdownMenuComponent
              options={estimatePointsOptions}
              selectedValue={value}
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

        {/* Estimate */}
        <ThemedText children={"Status"} style={styles.label} />
        <Controller
          control={control}
          name="status"
          rules={{ required: "Status is required" }}
          render={({ field: { onChange, value } }) => (
            <DropdownMenuComponent
              options={statusOptions}
              selectedValue={value}
              leftLabel="Select Status"
              leftIcon="list-outline"
              onSeclect={onChange}
            />
          )}
        />
        {errors.status && (
          <ThemedText
            children={errors.status.message}
            style={styles.errorText}
          />
        )}

        {/* Assignee */}
        <ThemedText children={"Assignee"} style={styles.label} />
        <Controller
          control={control}
          name="assigneeId"
          render={({ field: { onChange, value } }) => (
            <DropdownMenuComponent
              options={usersList}
              leftLabel="Assignee"
              leftIcon="person-outline"
              selectedValue={value}
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
            <DatePickerComponent
              date={value ? new Date(value) : new Date()}
              onChange={onChange}
            />
          )}
        />

        <View style={styles.buttonContainer}>
          <Button
            loading={loading}
            textColor="white"
            buttonColor={primaryColor}
            style={{ borderRadius: 8 }}
            mode="contained"
            onPress={handleSubmit(onSubmit)}
          >
            Create{" "}
          </Button>
        </View>
      </View>
    </ScrollView>
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
