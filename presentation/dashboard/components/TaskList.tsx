import {
  View,
  Text,
  StyleSheet,
  Platform,
  SectionList,
} from "react-native";
import React from "react";
import { Task } from "@/core/tasks/interfaces/task.interface";
import TaskCard from "./taskcard/CardComponent";
import { groupTasksByStatus } from "../helper/groupTasksByStatus";

interface Props {
  tasks: Task[];
}

const TaskList = ({ tasks }: Props) => {
  const getSections = groupTasksByStatus(tasks);
  const sections = getSections();

  return (
    <SectionList
      style={styles.listStyle}
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TaskCard task={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default TaskList;
const styles = StyleSheet.create({
  listStyle: {
    marginBottom: Platform.OS === "android" ? 0 : 90,
  },
  headerContainer: {
    padding: 10,
    marginTop: 5,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
