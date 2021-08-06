/** @format */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDate, selectDate } from "../../slices/reminders.slice";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View } from "react-native";

const DatePicker = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectDate);
  const [show, setShow] = useState(false);

  const handleChange = (date) => {
    setShow(Platform.OS === "ios");
    dispatch(addDate(date.toJSON()));
  };

  return (
    <View title="date-picker">
      {show && (
        <DateTimePicker
          display="default"
          is24Hour={false}
          mode="date"
          onChange={handleChange}
          value={selectedDate}
        />
      )}
    </View>
  );
};

export default DatePicker;
