import { Ionicons } from "@expo/vector-icons";

const pointsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const numberWords = [
  "ZERO",
  "ONE",
  "TWO",
  "THREE",
  "FOUR",
  "FIVE",
  "SIX",
  "SEVEN",
  "EIGHT",
];

export const estimatePointsOptions = pointsArray.map((point, index) => ({
  label: `${point} Points`,
  value: numberWords[index],
  leadingElement: <Ionicons name="timer-outline" size={18} color="white" />,
}));
