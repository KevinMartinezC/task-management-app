import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { Profile } from "@/core/profile/interfaces/profile.interface";

interface Props {
  profileInfo: Profile;
}

const ProfileScreenContent = ({ profileInfo }: Props) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.header}>
          {profileInfo.avatar ? (
            <Avatar.Image source={{ uri: profileInfo.avatar }} size={80} />
          ) : (
            <Avatar.Text label={profileInfo.fullName.charAt(0)} size={80} />
          )}
          <View style={styles.userInfo}>
            <Text style={styles.name}>{profileInfo.fullName}</Text>
            <Text style={styles.email}>{profileInfo.email}</Text>
          </View>
        </View>
      </Card>

      <Card style={styles.infoCard}>
        <Text style={styles.label}>Account Type</Text>
        <Text style={styles.value}>{profileInfo.type}</Text>

        <Text style={styles.label}>Joined</Text>
        <Text style={styles.value}>
          {new Date(profileInfo.createdAt).toDateString()}
        </Text>
      </Card>
    </View>
  );
};

export default ProfileScreenContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  userInfo: {
    marginLeft: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  email: {
    fontSize: 14,
    color: "#BBBBBB",
  },
  infoCard: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#1E1E1E",
  },
  label: {
    fontSize: 14,
    color: "#BBBBBB",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
