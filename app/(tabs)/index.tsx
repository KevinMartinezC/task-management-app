import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useTasks } from "@/presentation/dashboard/hooks/useTasks";

const DashboardScreen = () => {
  const { tasksQuery } = useTasks();
  if (tasksQuery.loading || !tasksQuery.data) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <Text>Dashboard Screen</Text>
    </View>
  );
};

export default DashboardScreen;
