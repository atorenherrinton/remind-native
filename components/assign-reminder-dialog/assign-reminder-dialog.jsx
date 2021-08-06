/** @format */

import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectName, selectUid } from "../../slices/authenticate.slice";
import {
  selectIsAssignReminderDialogOpen,
  setIsAssignReminderDialogOpen,
} from "../../slices/reminder-card.slice";
import {
  selectReminder,
  setToggleMoreOptions,
} from "../../slices/reminders.slice";
import {
  changeReminder,
  sendReminderEmail,
  sendReminderTextMessage,
} from "../../utils/utils";
import { Button, Paragraph, Dialog, Portal } from "react-native-paper";
import { View } from "react-native";

const AssignReminderDialog = ({ date, email, phoneNumber }) => {
  const dispatch = useDispatch();
  let displayDate;
  const today = new Date();
  const comparedDate = new Date(date);

  if (comparedDate >= today && comparedDate.getDay() === today.getDay()) {
    displayDate =
      "Today at " +
      new Date(date).toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "numeric",
      });
  } else if (comparedDate >= today) {
    displayDate = new Date(date).toLocaleString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }
  const isAssignReminderDialogOpen = useSelector(
    selectIsAssignReminderDialogOpen
  );
  const name = useSelector(selectName);
  const reminder = useSelector(selectReminder);
  const uid = useSelector(selectUid);

  const handleCancelSaveReminder = () => {
    dispatch(setIsAssignReminderDialogOpen());
  };

  const handleSaveReminder = () => {
    changeReminder(reminder, uid);
    if (reminder.email) {
      sendReminderEmail(
        reminder.date,
        displayDate,
        reminder.id,
        reminder.email,
        name,
        reminder.title,
        uid
      );
    } else {
      sendReminderTextMessage(
        reminder.id,
        name,
        reminder.phoneNumber,
        reminder.title,
        uid
      );
    }

    dispatch(setIsAssignReminderDialogOpen());
    dispatch(setToggleMoreOptions());
  };

  return (
    <View>
      <Portal>
        <Dialog
          id="assign-reminder-dialog"
          onDismiss={() => dispatch(setIsAssignReminderDialogOpen())}
          visible={isAssignReminderDialogOpen}
        >
          <Dialog.Title id="alert-dialog-title">Assign reminder</Dialog.Title>
          <Dialog.Content>
            <Paragraph id="assign-reminder-description">
              Do you want to assign the reminder to {email || phoneNumber}? It
              will be sent {displayDate || "immediately"}.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              id="cancel-send-assignment"
              onPress={handleCancelSaveReminder}
            >
              Cancel
            </Button>
            <Button
              id="send-assignment"
              onPress={handleSaveReminder}
              mode="contained"
            >
              Send
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default AssignReminderDialog;
