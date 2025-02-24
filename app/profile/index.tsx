import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useProfile } from "@/presentation/profile/hooks/useProfile";
import ProfileScreenContent from "@/presentation/profile/components/ProfileScreenContent";
import LoadingIndicator from "@/presentation/shared/components/LoadingIndicator";

const ProfileScreen = () => {
  const { profileQuery } = useProfile();

  if (profileQuery.loading || !profileQuery.data) {
    return <LoadingIndicator/>;
  }

  return <ProfileScreenContent profileInfo={profileQuery.data.profile} />;
};

export default ProfileScreen;
