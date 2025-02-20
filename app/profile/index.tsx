import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import ProfileScreenContent from "@/presentation/profile/ProfileScreenContent";
import { useProfile } from "@/presentation/profile/hooks/useProfile";

const ProfileScreen = () => {
  const { profileQuery } = useProfile();

  if (profileQuery.loading || !profileQuery.data) {
    return <ActivityIndicator />;
  }

  return <ProfileScreenContent profileInfo={profileQuery.data.profile} />;
};

export default ProfileScreen;
