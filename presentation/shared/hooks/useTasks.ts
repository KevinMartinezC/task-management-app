import { GET_TASKS } from "@/core/queries/task/get-task.query";
import { TaskResponse } from "@/core/tasks/interfaces/task.interface";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_TASK } from "@/core/queries/task/delete-task.query";
import { Alert } from "react-native";
import { useRef } from "react";
import { CREATE_TASK_QUERY } from "@/core/queries/task/create-task.query";
import { UPDATE_TASK_QUERY } from "@/core/queries/task/update-task.query";
import { MESSAGES } from "@/constants/Messages";

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
      Alert.alert("Task Deleted", MESSAGES.SUCCESS.TASK_DELETED);
    },
    onError(error) {
      console.error(error);
      Alert.alert("Error", MESSAGES.ERROR.TASK_DELETE);
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
        Alert.alert("Task Created", MESSAGES.SUCCESS.TASK_CREATED);
      },

      onError() {
        Alert.alert("Error", MESSAGES.ERROR.TASK_CREATE);
      },
    }
  );

  const [updateTaskMutation] = useMutation(UPDATE_TASK_QUERY, {
    update(cache, { data }) {
      if (!data) return;

      const updatedTask = data.updateTask;

      const existingTasks = cache.readQuery<TaskResponse>({
        query: GET_TASKS,
        variables: { input: {} },
      });

      if (existingTasks) {
        cache.writeQuery<TaskResponse>({
          query: GET_TASKS,
          variables: { input: {} },
          data: {
            tasks: existingTasks.tasks.map((task) =>
              task.id === updatedTask.id ? updatedTask : task
            ),
          },
        });
      }
    },

    onCompleted() {
      Alert.alert("Task Updated", MESSAGES.SUCCESS.TASK_UPDATED);
    },

    onError() {
      Alert.alert("Error", MESSAGES.ERROR.TASK_UPDATE);
    },
  });

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

  const updateTask = async (taskData: TaskData) => {
    try {
      await updateTaskMutation({
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
    updateTask,
    deleteTask,
    createTask,
  };
};
