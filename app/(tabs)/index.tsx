import { View, Text, ActivityIndicator, StyleSheet, Platform } from "react-native";
import React from "react";
import { useTasks } from "@/presentation/dashboard/hooks/useTasks";
import { FAB } from "@/presentation/theme/components/FAB";
import TaskList from "@/presentation/dashboard/components/TaskList";

const DashboardScreen = () => {
  const { tasksQuery } = useTasks();
  if (tasksQuery.loading || !tasksQuery.data) {
    return <ActivityIndicator />;
  }

  return (
    <View style={style.container}>
      <Text>Dashboard Screen</Text>
      <TaskList tasks={tasksQuery.data.tasks}/>
      <FAB iconName="add-outline" onPress={() => console.log("")}/>
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
