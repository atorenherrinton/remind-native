/** @format */
import React from "react";
import { useSelector } from "react-redux";
import {
  selectCompleted,
  selectScheduled,
  selectTodos,
  selectWhichReminders,
} from "../../slices/reminders.slice";
import AddReminder from "../add-reminder/add-reminder";
import { Divider, List } from "react-native-paper";
import ReminderItem from "../reminder-item/reminder-item";
import { View } from "react-native";


const ReminderList = () => {
  const completed = useSelector(selectCompleted);
  let reminders;
  const scheduled = useSelector(selectScheduled);
  const todos = useSelector(selectTodos);
  const whichReminders = useSelector(selectWhichReminders);

  if (whichReminders === "Todos") {
    reminders = todos;
  } else if (whichReminders === "Scheduled") {
    reminders = scheduled;
  } else if (whichReminders === "Completed") {
    reminders = completed;
  }

  return (
    <View id="reminder-list">
      <List.Section>
        <List.Subheader>{whichReminders}</List.Subheader>
        {reminders.length > 0 ? <Divider id="divider" /> : null}
        {reminders.map((reminder) => (
          <ReminderItem
            key={reminder.id}
            id={reminder.id}
            date={reminder.date}
            email={reminder.email}
            isAssigned={reminder.isAssigned}
            isCompleted={reminder.isCompleted}
            phoneNumber={reminder.phoneNumber}
            time={reminder.time}
            timestamp={reminder.timestamp}
            title={reminder.title}
          />
        ))}
      </List.Section>
      <AddReminder />
    </View>
  );
};

export default ReminderList;
