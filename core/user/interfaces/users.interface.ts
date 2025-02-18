export interface UsersResponse {
  users: User[];
}

export interface User {
  avatar?: string;
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  type: string;
  updatedAt: string;
}
