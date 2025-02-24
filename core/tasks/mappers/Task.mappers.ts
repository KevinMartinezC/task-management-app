import { User } from "@/core/user/interfaces/users.interface";
import { Task } from "../interfaces/task.interface";

export class TaskMappers {
  private static statusMapping: Record<string, string> = {
    IN_PROGRESS: "In Progress",
    TODO: "Todo",
    DONE: "Done",
    BACKLOG: "Backlog",
    BLOCKED: "Blocked",
    REVIEW: "In Review",
    CANCELLED: "Cancelled",
  };

  private static pointEstimateMapping: Record<string, string> = {
    ZERO: "0",
    ONE: "1",
    TWO: "2",
    THREE: "3",
    FOUR: "4",
    FIVE: "5",
    EIGHT: "8",
  };

  private static reverseStatusMapping: Record<string, string> =
    Object.fromEntries(
      Object.entries(TaskMappers.statusMapping).map(([key, value]) => [
        value,
        key,
      ])
    );

  private static reversePointEstimateMapping: Record<string, string> = {
    "0 points": "ZERO",
    "1 points": "ONE",
    "2 points": "TWO",
    "3 points": "THREE",
    "4 points": "FOUR",
    "5 points": "FIVE",
    "8 points": "EIGHT",
  };

  static fromTaskToTaskData(task?: Task): TaskData {
    return {
      id: task?.id ?? "",
      name: task?.name ?? "",
      dueDate: task?.dueDate ?? "",
      assigneeId: task?.assignee?.fullName ?? "",
      pointEstimate: `${
        this.pointEstimateMapping[task?.pointEstimate ?? "ZERO"]
      } points`,
      tags: task?.tags ?? [],
      status: this.statusMapping[task?.status ?? "TODO"],
    };
  }

  static prepareTaskDataForBackend(
    taskData: TaskData,
    users: User[]
  ): Omit<TaskData, "id"> | TaskData {
    console.log("task", taskData);

    const preparedData = {
      ...taskData,
      assigneeId: this.getUserAssigneeId(users, taskData),
      pointEstimate: this.getPointStatimate(taskData),
      dueDate: this.getDueDate(taskData),
      status: this.reverseStatusMapping[taskData.status] ?? taskData.status,
    };

    if (!taskData.id) {
      const { id, ...dataWithoutId } = preparedData;
      return dataWithoutId;
    }

    return preparedData;
  }

  private static getUserAssigneeId(users: User[], taskData: TaskData): string {
    return (
      users.find((user) => user.fullName === taskData.assigneeId)?.id ??
      taskData.assigneeId ?? ""
    );
  }

  private static getPointStatimate(taskData: TaskData): string {
    return Object.keys(this.pointEstimateMapping).includes(
      taskData.pointEstimate
    ) ||
      Object.values(this.pointEstimateMapping).includes(taskData.pointEstimate)
      ? taskData.pointEstimate
      : this.reversePointEstimateMapping[taskData.pointEstimate] || "ONE";
  }

  private static getDueDate(taskData: TaskData): string {
    return taskData.dueDate && taskData.dueDate.trim() !== ""
      ? taskData.dueDate
      : new Date().toISOString();
  }
}
