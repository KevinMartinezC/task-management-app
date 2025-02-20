import { View, TextInputProps, StyleSheet, ViewStyle } from "react-native";
import React, {useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useThemeColor } from "../hooks/useThemeColor";

interface Props extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  containerStyle?: ViewStyle
}

const ThemedTextInput = ({ icon, containerStyle, style, ...rest }: Props) => {
  const primayColor = useThemeColor({}, "primary");
  const textColor = useThemeColor({}, "text");
  const [isActive, setIsActive] = useState(false);
    
  return (
    <View
      style={[
        {
        ...styles.border,
        borderColor: isActive ? primayColor : "#ccc",
      }, containerStyle,
    ]}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={24}
          color={textColor}
          style={{ marginRight: 10 }}
        />
      )}
      <TextInput
        placeholderTextColor="#5c5c5c"
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        style={[styles.input, style , { color: textColor }]}
        {...rest}
      />
    </View>
  );
};

export default ThemedTextInput;

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    marginRight: 10,
    flex: 1,
  },
});
