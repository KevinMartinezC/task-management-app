import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  FlatList,
} from "react-native";
import { Menu, Divider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Task } from "@/core/tasks/interfaces/task.interface";
import { groupTasksByStatus } from "../dashboard/utils/groupTasksByStatus";
import { COLUMN_OPTIONS } from "./utils/columnOptions";
import TaskGroupComponent from "./components/TaskItem";
import { getColumnValue } from "./utils/getColumnValue";

type ColumnOption = (typeof COLUMN_OPTIONS)[number];

const MyTacksScreenContent = ({ tasks }: { tasks: Task[] }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<ColumnOption>(
    COLUMN_OPTIONS[0]
  );
  const groupedTasks = groupTasksByStatus(tasks);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.columnHeader}># Task Name</Text>
        <View style={styles.dropdownContainer}>
          <Text style={styles.columnHeader}>{selectedColumn.label}</Text>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => setMenuVisible(true)}
              >
                <Ionicons name="options" size={20} color="white" />
              </TouchableOpacity>
            }
            anchorPosition="bottom"
            contentStyle={styles.menu}
          >
            {COLUMN_OPTIONS.map((option, index) => (
              <React.Fragment key={option.key}>
                <Menu.Item
                  onPress={() => {
                    setSelectedColumn(option);
                    setMenuVisible(false);
                  }}
                  title={option.label}
                  titleStyle={styles.menuItemText}
                />
                {index < COLUMN_OPTIONS.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Menu>
        </View>
      </View>

      <FlatList
        data={groupedTasks}
        keyExtractor={(item) => item.title}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        renderItem={({ item }) => (
          <TaskGroupComponent
            title={item.title}
            tasks={item.data}
            selectedColumnKey={selectedColumn.key}
            getColumnValue={getColumnValue}
          />
        )}
      />
    </View>
  );
};

export default MyTacksScreenContent;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: Platform.OS === "ios" ? 60 : 40,
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    marginTop: 10,
    backgroundColor: "#333",
    borderBottomColor: "#ccc",
  },
  columnHeader: {
    fontWeight: "bold",
    color: "white",
    flex: 1,
    textAlign: "left",
  },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  menu: {
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  menuItemText: {
    color: "white",
  },
  list: {
    marginBottom: Platform.OS === "ios" ? 100 : 0,
  },
});
