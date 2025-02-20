import { Alert } from "react-native";

interface Props {
  taskName: string;
  onDeleteClick: () => void;
}

export const onDeleteAlert = ({ taskName, onDeleteClick }: Props) => {
  Alert.alert(
    "Delete Task",
    `Are you sure you want to delete the ${taskName} task?`,
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDeleteClick,
      },
    ]
  );
};
