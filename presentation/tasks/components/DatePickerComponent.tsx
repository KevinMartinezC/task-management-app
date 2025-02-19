import React from "react";
import { View, Text, useColorScheme, Platform } from "react-native";
import { Button } from "react-native-paper";
import DateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

interface DatePickerProps {
  date: Date;
  onChange: (date: Date) => void;
}

const DatePickerComponent = ({ date, onChange }: DatePickerProps) => {
  const colorScheme = useColorScheme();

  const showPicker = () => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: date,
        onChange: (event, selectedDate) => {
          if (selectedDate) onChange(selectedDate);
        },
        mode: "date",
        is24Hour: true,
        display: "calendar",
      });
    }
  };

  return (
    <View style={{ alignItems: "center", marginBottom: 10 }}>
      <Button onPress={showPicker}>Select Date</Button>

      {Platform.OS === "ios" && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={(event, selectedDate) => {
            if (selectedDate) onChange(selectedDate);
          }}
        />
      )}

      <Text style={{ color: colorScheme === "dark" ? "white" : "black" }}>
        Selected Date: {date.toDateString()}
      </Text>
    </View>
  );
};

export default DatePickerComponent;
