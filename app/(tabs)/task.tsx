import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import MyTacksScreenContent from '@/presentation/mytasks/MyTacksScreenContent'
import { useTasks } from '@/presentation/dashboard/hooks/useTasks';

const TaskScreen = () => {
  const { tasksQuery } = useTasks();

  if (tasksQuery.loading || !tasksQuery.data) {
    return <ActivityIndicator />;
  }

  return (
    <MyTacksScreenContent tasks={tasksQuery.data.tasks}/>
  )
}

export default TaskScreen