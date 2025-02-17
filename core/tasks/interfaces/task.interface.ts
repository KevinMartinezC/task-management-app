export interface TaskResponse {
  tasks: Task[];
}

export interface Task {
  name: string;
  tags: string[];
  status: string;
  position: number;
  pointEstimate: string;
  id: string;
  dueDate: string;
  creator: Creator;
  createdAt: string;
  assignee?: Creator;
}

export interface Creator {
  updatedAt?: string;
  type: String;
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  avatar?: string;
}
