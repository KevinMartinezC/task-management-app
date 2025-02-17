import React, { useState, useRef } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Menu } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

const TaskMenu = ({ onDelete, onEdit }: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Ionicons name="ellipsis-vertical" size={20} color="white" />
          </TouchableOpacity>
        }
        anchorPosition="bottom"
        contentStyle={style.menu}
      >
        <Menu.Item
          onPress={() => {
            setMenuVisible(false);
            onEdit();
          }}
          title="Edit"
          leadingIcon={() => (
            <Ionicons name="pencil-outline" size={24} color="white" />
          )}
          titleStyle={{ color: "white" }}
        />
        <Menu.Item
          onPress={() => {
            setMenuVisible(false);
            onDelete();
          }}
          title="Delete"
          leadingIcon={() => (
            <Ionicons name="trash-outline" size={24} color="white" />
          )}
          titleStyle={{ color: "white" }}
        />
      </Menu>
    </View>
  );
};

export default TaskMenu;

const style = StyleSheet.create({
  menu: {
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
});
