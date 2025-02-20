import { Ionicons } from "@expo/vector-icons";

const statusLabels = {
  BACKLOG: "Backlog",
  CANCELLED: "Cancelled",
  DONE: "Done",
  IN_PROGRESS: "In Progress",
  TODO: "To Do",
};

export const statusOptions = Object.entries(statusLabels).map(
  ([value, label]) => ({
    label,
    value,
    leadingElement: (
      <Ionicons name="layers-outline" size={18} color="white" />
    ),
  })
);
