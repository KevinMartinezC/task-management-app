import { GET_TASKS } from "@/core/queries/get-task.query";
import { TaskResponse } from "@/core/tasks/interfaces/task.interface";
import { useQuery } from "@apollo/client";

export const useTasks = () => {
  const tasksQuery = useQuery<TaskResponse>(GET_TASKS, {
    variables: { input: {} },
  });

  return {
    tasksQuery,
  };
};
