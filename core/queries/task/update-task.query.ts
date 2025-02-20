import { gql } from "@apollo/client";

export const UPDATE_TASK_QUERY = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
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
