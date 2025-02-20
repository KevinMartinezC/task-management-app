import { gql } from "@apollo/client";

export const GET_USER_PROFILE_DATA = gql`
  query Profile {
    profile {
      avatar
      createdAt
      email
      fullName
      id
      type
      updatedAt
    }
  }
`;
