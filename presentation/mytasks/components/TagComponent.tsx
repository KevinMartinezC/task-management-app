import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { getTagColor } from "@/presentation/dashboard/utils/getTagColor";

interface Props {
  tags: string[];
}

const TagComponent = ({ tags }: Props) => {
  return (
    <View style={styles.tagContainer}>
      {tags.slice(0, 1).map((tag, index) => (
        <View 
        key={index}
        style={[styles.tag, { backgroundColor: getTagColor(tag) }]}
        >
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
      {tags.length > 1 && (
        <View style={styles.tagCount}>  
          <Text style={styles.tagText}>+{tags.length - 1}</Text>
        </View>
      )}
    </View>
  );
};

export default TagComponent;

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  tagText: {
    color: "white",
    fontWeight: "bold",
  },
  tagCount: {
    backgroundColor: "#444",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
