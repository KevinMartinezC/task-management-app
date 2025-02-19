import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { Portal, Checkbox } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

interface MenuOption {
  label: string;
}

interface Props {
  options: MenuOption[];
  selectedOptions?: string[];
  leftLabel?: string;
  onSelect: (selected: string[]) => void;
}

const CustomMultiSelect = ({
  options,
  selectedOptions = [],
  leftLabel = "Stacks",
  onSelect,
}: Props) => {
  const [visible, setVisible] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>(selectedOptions);

  const open = () => setVisible(true);
  const close = () => setVisible(false);

  const toggleOption = (label: string) => {
    const updated = selected.includes(label)
      ? selected.filter((item) => item !== label)
      : [...selected, label];

    setSelected(updated);
    onSelect(updated);
  };

  /** Remove an item from the selected array without opening the dropdown. */
  const removeTag = (label: string) => {
    const updated = selected.filter((item) => item !== label);
    setSelected(updated);
    onSelect(updated);
  };

  /**
   * Renders the selected items as small "tags"
   * with a little X button inside each tag to remove it.
   */
  const renderSelectedItems = () => {
    if (selected.length === 0) {
      return <Text style={styles.openButtonText}>{leftLabel}</Text>;
    }
    return (
      <View style={styles.tagContainer}>
        {selected.map((item) => (
          <View key={item} style={styles.tagBox}>
            <Text style={styles.tagText}>{item}</Text>

            {/* X button inside the tag to remove that item */}
            <TouchableOpacity
              onPress={() => removeTag(item)}
              style={styles.tagCloseButton}
            >
              <Ionicons name="close" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Press this to open the dropdown (Portal/Modal) */}
      <Pressable onPress={open} style={styles.openButton}>
        {/* Outer row: space-between to push left section and chevron apart */}
        <View style={styles.row}>
          {/* Left section: plus icon + tags */}
          <View style={styles.leftSection}>
            <Ionicons
              name="pricetag-outline"
              size={20}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            {renderSelectedItems()}
          </View>

          {/* Right icon: chevron */}
          <Ionicons
            name="chevron-down"
            size={25}
            color="#fff"
            style={{ marginRight: 16 }}
          />
        </View>
      </Pressable>

      {/* The Portal draws above other content */}
      <Portal>
        {visible && (
          <View style={styles.overlay}>
            <View style={styles.dropdown}>
              {/* Header row with a title and an 'X' to close */}
              <View style={styles.headerRow}>
                <Text style={styles.title}>Select Options</Text>
                <TouchableOpacity onPress={close} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
              </View>

              {/* List of options with checkboxes */}
              {options.map((item) => (
                <TouchableOpacity
                  key={item.label}
                  onPress={() => toggleOption(item.label)}
                  style={styles.option}
                >
                  <Checkbox.Android
                    color="#DA584B"
                    status={
                      selected.includes(item.label) ? "checked" : "unchecked"
                    }
                  />
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </Portal>
    </View>
  );
};

export default CustomMultiSelect;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  openButton: {
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  /** Row that contains left + right sections */
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start", // Left side on left, chevron on right
    flexWrap: "wrap",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    flex: 1,
  },
  openButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  /** Wraps all the tags so they can break into multiple lines if needed */
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  /** Each individual tag box */
  tagBox: {
    flexDirection: "row", // So label + X are in a row
    alignItems: "center",
    backgroundColor: "#444",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    color: "#fff",
    fontSize: 14,
  },
  /** The X button inside each tag */
  tagCloseButton: {
    marginLeft: 6, // gap between label and X
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  dropdown: {
    padding: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "#1e1e1e",
    width: 300,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    color: "#fff",
    fontSize: 18,
  },
  closeButton: {
    padding: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  optionText: {
    color: "#fff",
    marginLeft: 8,
  },
});
