import { Task } from "../interfaces/task.interface";

export const mapTaskToTaskData = (task?: Task): TaskData => ({
  id: task?.id ?? "",
  name: task?.name ?? "",
  dueDate: task?.dueDate ?? "",
  assigneeId: task?.assignee?.id ?? "",
  pointEstimate: task?.pointEstimate ?? "",
  tags: task?.tags ?? [],
  status: task?.status ?? "",
});
