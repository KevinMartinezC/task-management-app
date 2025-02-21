import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Task } from "@/core/tasks/interfaces/task.interface";
import TagComponent from "./TagComponent";
import { COLUMN_OPTIONS } from "../utils/columnOptions";

type ColumnOptionKey = (typeof COLUMN_OPTIONS)[number]["key"];

interface TaskGroupProps {
  title: string;
  tasks: Task[];
  selectedColumnKey: ColumnOptionKey;
  getColumnValue: (task: Task, column: ColumnOptionKey) => string; 
}

const TaskGroupComponent = ({
  title,
  tasks,
  selectedColumnKey,
  getColumnValue,
}: TaskGroupProps) => {
  return (
    <View>
      <Text style={styles.statusHeader}>{title}</Text>
      {tasks.map((task) => (
        <View key={task.id} style={styles.row}>
          <Text style={styles.cell}>{task.name}</Text>
          <View style={styles.cell}>
            {selectedColumnKey === "tags" ? (
              <TagComponent tags={task.tags} />
            ) : (
              <Text style={styles.cell}>
                {getColumnValue(task, selectedColumnKey)}
              </Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  statusHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#272626",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  cell: {
    color: "white",
    flex: 1,
    textAlign: "left",
  },
});

export default TaskGroupComponent;
