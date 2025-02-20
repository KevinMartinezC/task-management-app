import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query Tasks($input: FilterTaskInput!) {
    tasks(input: $input) {
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
