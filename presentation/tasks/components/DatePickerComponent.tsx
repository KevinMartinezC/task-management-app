import React, { useState } from "react";
import { View, Text, useColorScheme, Platform } from "react-native";
import { Button } from "react-native-paper";
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const DatePickerComponent = () => {
  const [date, setDate] = useState(new Date());
  const colorScheme = useColorScheme(); // Detect dark mode

  const showPicker = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: date,
        onChange: (event, selectedDate) => {
          if (selectedDate) setDate(selectedDate);
        },
        mode: 'date',
        is24Hour: true,
        display: 'calendar', // Ensures proper UI on Android
      });
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colorScheme === "dark" ? "#121212" : "#FFF" }}>
      <Button onPress={showPicker}>Select Date</Button>

      {/* iOS Picker (Android uses imperative API above) */}
      {Platform.OS === 'ios' && (
        <DateTimePicker
          value={date}
          mode="date"
          themeVariant="dark"
          onChange={(event, selectedDate) => {
            if (selectedDate) setDate(selectedDate);
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

