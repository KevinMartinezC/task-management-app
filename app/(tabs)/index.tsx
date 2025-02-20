import {
  View,
  ActivityIndicator,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useTasks } from "@/presentation/dashboard/hooks/useTasks";
import { FAB } from "@/presentation/theme/components/FAB";
import TaskList from "@/presentation/dashboard/components/TaskList";
import { router } from "expo-router";
import { Searchbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const DashboardScreen = () => {
  const { tasksQuery } = useTasks();
  const [searchQuery, setSearchQuery] = useState("");

  if (tasksQuery.loading || !tasksQuery.data) {
    return <ActivityIndicator />;
  }

  const filteredTasks = tasksQuery.data.tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={style.container}>
      <View style={style.searchContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
          style={style.searchBar}
        />
        <TouchableOpacity>
          <Ionicons
            name="filter-outline"
            size={24}
            color="#fff"
            style={style.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => router.push("/profile")}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
            style={style.avatar}
          />
        </TouchableOpacity>
      </View>
      <TaskList tasks={filteredTasks} />
      <FAB iconName="add-outline" onPress={() => router.push(`/task/new`)} />
    </View>
  );
};

export default DashboardScreen;

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: Platform.OS == "ios" ? 40 : 30,
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#222",
  },
  icon: {
    marginHorizontal: 10,
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 15,
  },
});
