import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Menu, IconButton } from "react-native-paper";

interface MenuOptions {
  label: string;
  leadingElement?: React.ReactNode;
  value: string
}

interface Props {
  options: MenuOptions[];
  selectedValue?: string;
  leftLabel?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  onSeclect: (option: string) => void;
}

const RowWithMenu = ({
  options,
  selectedValue,
  leftLabel = "Estimate",
  leftIcon,
  onSeclect,
}: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(
    selectedValue ?? ""
  );

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleSelect = (option: MenuOptions) => {
    setSelectedOption(option.label);
    onSeclect(option.value);
    closeMenu();
  };

  return (
    <View style={styles.rowContainer}>
      <View style={styles.leftSection}>
        <Ionicons
          name={leftIcon ?? "chevron-down"}
          size={20}
          color="#fff"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.text}>{selectedOption || leftLabel}</Text>
      </View>
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchorPosition="bottom"
        contentStyle={styles.menu}
        anchor={
          <IconButton
            icon={() => <Ionicons name="chevron-down" size={24} color="#fff" />}
            onPress={openMenu}
          />
        }
      >
        {options.map((option) => (
          <Menu.Item
            key={option.label}
            onPress={() => handleSelect(option)}
            title={option.label}
            leadingIcon={() => option.leadingElement || null}
          />
        ))}
      </Menu>
    </View>
  );
};

export default RowWithMenu;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 12,
    borderRadius: 8,
    marginVertical: 5,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  menu: {
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginTop: Platform.OS === "ios" ? 0 : 20,
  },
});
