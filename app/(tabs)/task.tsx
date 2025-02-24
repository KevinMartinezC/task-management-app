import React from 'react'
import MyTacksScreenContent from '@/presentation/mytasks/MyTacksScreenContent'
import { useTasks } from '@/presentation/shared/hooks/useTasks';
import LoadingIndicator from '@/presentation/shared/components/LoadingIndicator';

const TaskScreen = () => {
  const { tasksQuery } = useTasks();

  if (tasksQuery.loading || !tasksQuery.data) {
    return <LoadingIndicator/>
  }

  return (
    <MyTacksScreenContent tasks={tasksQuery.data.tasks}/>
  )
}

export default TaskScreen