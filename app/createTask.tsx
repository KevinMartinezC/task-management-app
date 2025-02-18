import React from "react";
import TaskScreenContent from "@/presentation/tasks/TaskScreenContent";
import { useUser } from "@/presentation/tasks/hooks/useUser";
import { ActivityIndicator } from "react-native";

const createTaskScreen = () => {
  const { usersQuery } = useUser();

  if (usersQuery.loading || !usersQuery.data) {
    return <ActivityIndicator />;
  }

  return (
   <TaskScreenContent users={usersQuery.data.users}/>
  );
};

export default createTaskScreen;
