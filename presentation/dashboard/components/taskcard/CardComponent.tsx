import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Task } from "@/core/tasks/interfaces/task.interface";
import IconAndTexTag from "./IconAndTexTag";
import { usePointEstimateToNumber } from "../../helper/pointEstimateToNumber";
import { getTagColor } from "../../helper/getTagColor";

interface Props {
  task: Task;
}
export const TaskCard = ({ task }: Props) => {
  const { width } = useWindowDimensions(); 
  const pointEstimateToNumber = usePointEstimateToNumber();
  const onDeleteClick = (taskName: string) => {
    Alert.alert("Delete Task", `Are you sure you want to delete the ${taskName} task?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
      },
  ]);
};
  return (
    <View style={{ ...styles.card, width: width * 0.9 }}>
      <View style={styles.header}>
        <Text style={styles.title}>{task.name}</Text>
        <TouchableOpacity onPress={ () => onDeleteClick(task.name) }>
          <Ionicons name="ellipsis-vertical" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Puntuación y Etiquetas */}
      <View style={styles.header}>
        <Text style={styles.points}>
          {pointEstimateToNumber(task.pointEstimate)} Pts
        </Text>
        <IconAndTexTag tagText={task.dueDate} />
      </View>

      {/* Tags */}
      <View style={styles.tagContainer}>
        {task.tags.map((tag, index) => (
          <View key={index} style={[styles.label,{ backgroundColor: getTagColor(tag) }]}>
            <Text style={styles.labelText}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Pie de Card con Avatar e Iconos alineados a la derecha */}
      <View style={styles.footer}>
        {/* Imagen de usuario */}
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
          style={styles.avatar}
        />

        {/* Iconos de información alineados a la derecha */}
        <View style={styles.iconRow}>
          <Ionicons name="attach-outline" size={16} color="white" />
          <Text style={styles.iconText}>5</Text>
          <Ionicons name="chatbubble-outline" size={16} color="white" />
          <Text style={styles.iconText}>3</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e1e1e",
    padding: 15,
    borderRadius: 10,
    alignSelf: "center",
    shadowColor: "#000",
    margin: 10,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  points: {
    color: "#ccc",
    fontSize: 14,
  },
  label: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 8,
  },
  labelText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 15,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconText: {
    color: "white",
    fontSize: 14,
    marginLeft: 4,
    marginRight: 10,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4
  },
});

export default TaskCard;
