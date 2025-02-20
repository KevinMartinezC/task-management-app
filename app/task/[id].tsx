import React from "react";
import TaskScreenContent from "@/presentation/tasks/TaskScreenContent";
import { useUser } from "@/presentation/tasks/hooks/useUser";
import { ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";

const createTaskScreen = () => {
  const { usersQuery } = useUser();

  const { id } = useLocalSearchParams();
  console.log("id get it" , id);
  if (usersQuery.loading || !usersQuery.data) {
    return <ActivityIndicator />;
  }

  return <TaskScreenContent users={usersQuery.data.users} />;
};

export default createTaskScreen;
