import { Ionicons } from "@expo/vector-icons";
import {
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";

interface Props {
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const FAB = ({ style, iconName, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={[style, styleSheed.componentStyle]}
      onPress={onPress}
    >
      <Ionicons name={iconName} size={30} color="white" />
    </TouchableOpacity>
  );
};

const styleSheed = StyleSheet.create({
  componentStyle: {
    position: "absolute",
    bottom: Platform.OS == 'ios'?  100 : 15,
    right: 20,
    width: 60,
    height: 60,
    shadowColor: "black",
    backgroundColor: "#DA584B",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 3,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
