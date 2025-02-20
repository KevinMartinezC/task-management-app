import { GET_TASKS } from "@/core/queries/get-task.query";
import { TaskResponse } from "@/core/tasks/interfaces/task.interface";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_TASK } from "@/core/queries/delete-task.query";
import { Alert } from "react-native";
import { useRef } from "react";
import { CREATE_TASK_QUERY } from "@/core/queries/create-task.query";

export const useTasks = () => {
  const tasksQuery = useQuery<TaskResponse>(GET_TASKS, {
    variables: { input: {} },
  });
  const id = useRef("");

  const deleteTaskMutation = useMutation(DELETE_TASK, {
    optimisticResponse: () => ({
      deleteTask: {
        id: id.current,
      },
    }),

    update(cache, { data }) {
      const existingTasks = cache.readQuery<TaskResponse>({
        query: GET_TASKS,
        variables: { input: {} },
      });

      if (existingTasks) {
        const newTasks = existingTasks.tasks.filter(
          (task) => task.id !== data.deleteTask.id
        );
        cache.writeQuery<TaskResponse>({
          query: GET_TASKS,
          variables: { input: {} },
          data: { tasks: newTasks },
        });
      }
    },
    onCompleted() {
      Alert.alert("Task Deleted", "The task was successfully deleted");
    },
    onError(error) {
      console.error(error);
      Alert.alert("Error", "There was an error deleting the task");
    },
  });

  //Mutation for creating a task
  const [createTaskMutation, { loading, error }] = useMutation(
    CREATE_TASK_QUERY,
    {
      update(cache, { data }) {
        if (!data) return;
        const existingTasks = cache.readQuery<TaskResponse>({
          query: GET_TASKS,
          variables: { input: {} },
        });

        if (existingTasks) {
          cache.writeQuery<TaskResponse>({
            query: GET_TASKS,
            variables: { input: {} },
            data: { tasks: [...existingTasks.tasks, data.createTask] },
          });
        }
      },

      onCompleted() {
        Alert.alert("Task Created", "The task was successfully created!");
      },

      onError() {
        Alert.alert("Error", "There was an error creating the task");
      },
    }
  );

  const deleteTask = async (taskId: string) => {
    try {
      id.current = taskId;
      await deleteTaskMutation[0]({
        variables: {
          input: {
            id: taskId,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (taskData: TaskData) => {
    try {
      await createTaskMutation({
        variables: {
          input: taskData,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    tasksQuery,
    loading,
    error,
    deleteTask,
    createTask,
  };
};
