import { Task } from "@/core/tasks/interfaces/task.interface";
import { useCallback } from "react";

const statusMapping: Record<string, string> = {
  IN_PROGRESS: "In Progress",
  TODO: "Todo",
  DONE: "Done",
  BACKLOG: "Backlog",
  BLOCKED: "Blocked",
  REVIEW: "In Review",
  CANCELLED: "Cancelled",
};

export const groupTasksByStatus = (tasks: Task[]) => {
  if (!tasks || tasks.length === 0) return [];

  const grouped = tasks.reduce((acc, task) => {
    const { status } = task;
    if (!acc[status]) acc[status] = [];
    acc[status].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  return Object.keys(grouped).map((status) => ({
    title: `${statusMapping[status] || status} (${grouped[status].length})`,
    data: grouped[status],
  }));
};

