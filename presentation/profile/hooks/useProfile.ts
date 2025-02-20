import { ProfileResponse } from "@/core/profile/interfaces/profile.interface";
import { GET_USER_PROFILE_DATA } from "@/core/queries/profile/get-user-profile-data.query";
import { useQuery } from "@apollo/client";

export const useProfile = () => {
  const profileQuery = useQuery<ProfileResponse>(GET_USER_PROFILE_DATA);
  return {
    profileQuery,
  };
};
