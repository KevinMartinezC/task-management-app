import { Ionicons } from "@expo/vector-icons";

const pointsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export const estimatePointsOptions = pointsArray.map((point) => ({
  label: `${point} Points`,
  leadingElement: <Ionicons name="timer-outline" size={18} color="white" />,
}));

