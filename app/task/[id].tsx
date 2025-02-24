import React from "react";
import { useUser } from "@/presentation/tasks/hooks/useUser";
import { ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTasks } from "@/presentation/shared/hooks/useTasks";
import { mapTaskToTaskData } from "@/core/tasks/mappers/mapTaskToTaskData";
import AddorUpdateTaskScreenContent from "@/presentation/tasks/AddorUpdateTaskScreenContent";
import { TaskMappers } from "@/core/tasks/mappers/Task.mappers";

const createTaskScreen = () => {
  const { usersQuery } = useUser();
  const { tasksQuery } = useTasks();
  const { id } = useLocalSearchParams();

  if (tasksQuery.loading || !tasksQuery.data) {
    return <ActivityIndicator />;
  }
  const task = tasksQuery.data.tasks.find((task) => task.id === id);  
  const taskData = TaskMappers.fromTaskToTaskData(task);
  
  return (
    <AddorUpdateTaskScreenContent
      users={usersQuery?.data?.users ?? []}
      taskData={taskData}
    />
  );
};

export default createTaskScreen;
