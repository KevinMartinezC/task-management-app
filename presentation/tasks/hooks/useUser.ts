import { GET_USERS } from "@/core/queries/get-users-query";
import { UsersResponse } from "@/core/user/interfaces/users.interface";
import { useQuery } from "@apollo/client";

export const useUser = () => {
  const usersQuery = useQuery<UsersResponse>(GET_USERS);
  return {
    usersQuery,
  };
};
