import { gql } from "@apollo/client";

export const CREATE_TASK_QUERY = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      name
      tags
      status
      position
      pointEstimate
      dueDate
      creator {
        id
        fullName
        email
      }
      assignee {
        id
        fullName
        email
        avatar
      }
    }
  }
`;
