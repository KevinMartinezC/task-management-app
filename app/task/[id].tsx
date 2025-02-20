import React from "react";
import TaskScreenContent from "@/presentation/tasks/TaskScreenContent";
import { useUser } from "@/presentation/tasks/hooks/useUser";
import { ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTasks } from "@/presentation/dashboard/hooks/useTasks";
import { mapTaskToTaskData } from "@/core/tasks/mappers/mapTaskToTaskData";

const createTaskScreen = () => {
  const { usersQuery } = useUser();
  const { tasksQuery } = useTasks();
  const { id } = useLocalSearchParams();

  if (tasksQuery.loading || !tasksQuery.data) {
    return <ActivityIndicator />;
  }
  const task = tasksQuery.data.tasks.find((task) => task.id === id);
  const taskData = mapTaskToTaskData(task);

  return (
    <TaskScreenContent
      users={usersQuery?.data?.users ?? []}
      taskData={taskData}
    />
  );
};

export default createTaskScreen;
