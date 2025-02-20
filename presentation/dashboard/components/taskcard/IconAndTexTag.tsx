import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  boxbBackGroundColor?: string;
  textColor?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  tagText: string;
}

const IconAndTexTag = ({
  tagText,
  boxbBackGroundColor = "#3a3a3a",
  textColor = "white",
  iconName = "time-outline",
}: Props) => {
  return (
    <View style={[styles.tag, { backgroundColor: boxbBackGroundColor }]}>
      <Ionicons name={iconName} size={14} color={textColor} />
      <Text style={[styles.tagText, { color: textColor }]}>
        {new Date(tagText).toLocaleDateString()}
      </Text>
    </View>
  );
};

export default IconAndTexTag;

const styles = StyleSheet.create({
  tag: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    alignItems: "center",
  },
  tagText: {
    color: "white",
    fontSize: 12,
    marginLeft: 5,
  },
});
