import { Ionicons } from "@expo/vector-icons";

export const statusLabels = {
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
    leadingElement: <Ionicons name="layers-outline" size={18} color="white" />,
  })
);

export const getStatusLabel = (
  status: keyof typeof statusLabels | undefined
): string => {
  return status ? statusLabels[status] ?? "" : "";
};
