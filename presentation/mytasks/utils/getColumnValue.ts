import { Task } from "@/core/tasks/interfaces/task.interface";
import { COLUMN_OPTIONS } from "./columnOptions";
import { getPointEstimateLabel } from "@/presentation/tasks/utils/estimatePoint";

type ColumnOptionKey = (typeof COLUMN_OPTIONS)[number]["key"];

export const getColumnValue = (task: Task, column: ColumnOptionKey): string => {
  switch (column) {
    case "assignee":
      return task.assignee ? task.assignee.fullName : "-";
    case "dueDate":
      return new Date(task.dueDate).toLocaleDateString() ?? "-";
    case "pointEstimate":
      return getPointEstimateLabel(task.pointEstimate) ?? "-";
    case "tags":
      return task.tags.length > 0 ? task.tags.join(", ") : "-";
    default:
      return String(task[column]) ?? "-";
  }
};
