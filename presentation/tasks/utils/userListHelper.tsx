import { User } from "@/core/user/interfaces/users.interface";
import { validate } from "graphql";
import { View, Image } from "react-native";

export const generateUserList = (users: User[]) => {
  return users.map((user) => ({
    label: user.fullName,
    value: user.id,
    leadingElement: (
      <View>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            marginRight: 8,
          }}
        />
      </View>
    ),
  }));
};

export const getAssigneeName = (
  assigneeId: string | undefined,
  users: User[]
) => {
  if (!assigneeId) return ""; // Default empty string
  const foundUser = users.find((user) => user.id === assigneeId);
  return foundUser ? foundUser.fullName : ""; // Return user name
};
