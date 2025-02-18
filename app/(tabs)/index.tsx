import { View, ActivityIndicator, StyleSheet, Platform } from "react-native";
import React from "react";
import { useTasks } from "@/presentation/dashboard/hooks/useTasks";
import { FAB } from "@/presentation/theme/components/FAB";
import TaskList from "@/presentation/dashboard/components/TaskList";
import { router } from "expo-router";

const DashboardScreen = () => {
  const { tasksQuery } = useTasks();
  if (tasksQuery.loading || !tasksQuery.data) {
    return <ActivityIndicator />;
  }

  return (
    <View style={style.container}>
      <TaskList tasks={tasksQuery.data.tasks}/>
      <FAB iconName="add-outline" onPress={() => router.push("/createTask")}/>
    </View>
  );
};

export default DashboardScreen;

const style= StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: Platform.OS == 'ios' ? 40 : 30,
    flex: 1
  }
})
