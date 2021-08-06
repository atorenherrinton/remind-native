/** @format */

import React, { useEffect, useState } from "react";
import { changeReminder, deleteReminder } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { selectUid } from "../../slices/authenticate.slice";
import {
  selectIsButtonDisabled,
  setIsAssignReminderDialogOpen,
  setIsButtonDisabled,
} from "../../slices/reminder-card.slice";
import {
  addDate,
  addTime,
  changeTitle,
  removeDate,
  removeTime,
  selectDate,
  selectReminder,
  selectTime,
  setToggleMoreOptions,
} from "../../slices/reminders.slice";
import AssignReminder from "../assign-reminder/assign-reminder";
import AssignReminderDialog from "../assign-reminder-dialog/assign-reminder-dialog";
import {
  Button,
  Card,
  Divider,
  IconButton,
  List,
  Menu,
  Switch,
  TextInput,
  Title,
} from "react-native-paper";
import DatePicker from "../date-picker/date-picker";
import TimePicker from "../time-picker/time-picker";
import { View } from "react-native";

const ReminderCard = (props) => {
  const dispatch = useDispatch();
  const date = useSelector(selectDate) || props.date;
  const isButtonDisabled = useSelector(selectIsButtonDisabled);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const reminder = useSelector(selectReminder) || props.reminder;
  const time = useSelector(selectTime) || props.time;
  const title = reminder.title;
  const [toggleInput, setToggleInput] = useState(false);
  const [toggleDatePicker, setToggleDatePicker] = useState(false);
  const [toggleTimePicker, setToggleTimePicker] = useState(false);
  const uid = useSelector(selectUid);

  const handleDeleteReminder = () => {
    deleteReminder(reminder.id, uid);
    dispatch(setToggleMoreOptions());
  };

  const handleSaveReminder = () => {
    if (
      (reminder.email && !reminder.isAssigned) ||
      (reminder.phoneNumber && !reminder.isAssigned)
    ) {
      dispatch(setIsAssignReminderDialogOpen());
    } else {
      changeReminder(reminder, uid);
      dispatch(setToggleMoreOptions());
    }
  };

  useEffect(() => {
    const loadDueDateAndTime = () => {
      if (!isLoaded) {
        if (date) {
          setToggleDatePicker(true);
        }
        if (time) {
          setToggleTimePicker(true);
        }
        setIsLoaded(true);
      }
    };
    loadDueDateAndTime();
  }, [date, time, isLoaded]);

  return (
    <View id="reminder-card">
      <Card id="card">
        <Card.Title
          right={(props) => (
            <Menu
              {...props}
              visible={isMenuOpen}
              onDismiss={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
              anchor={
                <IconButton
                  icon="dots-vertical"
                  onPress={() => {
                    setIsMenuOpen(!isMenuOpen);
                  }}
                />
              }
            >
              <Menu.Item
                onPress={handleDeleteReminder}
                title="Delete Reminder"
              />
            </Menu>
          )}
          title={
            toggleInput ? (
              <TextInput
                onChangeText={(text) => {
                  dispatch(changeTitle(text));
                  if (text.length < 1) {
                    dispatch(setIsButtonDisabled(true));
                  } else if (text.length > 0 && isButtonDisabled) {
                    dispatch(setIsButtonDisabled(false));
                  }
                }}
                multiline
                value={title}
              />
            ) : (
              <Title
                onClick={() => {
                  setToggleInput(true);
                }}
              >
                {title}
              </Title>
            )
          }
        />
        <Divider />
        <Card.Content>
          <List.Section>
            <List.Item
              left={(props) => <List.Icon {...props} icon="calendar-range" />}
              right={(props) => (
                <Switch
                  {...props}
                  id="toggle-date-switch"
                  onClick={() => {
                    if (!date) {
                      dispatch(addDate(new Date().toJSON()));
                    } else {
                      dispatch(removeDate());
                      dispatch(removeTime());
                    }

                    setToggleDatePicker(!toggleDatePicker);

                    if (toggleTimePicker && toggleDatePicker) {
                      setToggleTimePicker(false);
                    }
                  }}
                  value={toggleDatePicker}
                />
              )}
              title="Date"
            ></List.Item>
            {toggleDatePicker ? (
              <List.Item>
                <DatePicker id={reminder.id} />
              </List.Item>
            ) : null}
            <List.Item
              left={(props) => <List.Icon {...props} icon="clock-outline" />}
              right={(props) => (
                <Switch
                  {...props}
                  id="toggle-time-switch"
                  onClick={() => {
                    if (!date) {
                      dispatch(addDate(new Date().toJSON()));
                    }

                    if (!time) {
                      dispatch(addTime());
                    } else {
                      dispatch(removeTime());
                    }

                    setToggleTimePicker(!toggleTimePicker);

                    if (!toggleDatePicker) {
                      setToggleDatePicker(true);
                    }
                  }}
                  value={toggleTimePicker}
                />
              )}
              title="Time"
            ></List.Item>
            {toggleTimePicker ? (
              <List.Item id="time-picker-container">
                <TimePicker id={reminder.id} />
              </List.Item>
            ) : null}
            <AssignReminder
              email={reminder.email}
              phoneNumber={reminder.phoneNumber}
            />
          </List.Section>
        </Card.Content>
        <Card.Actions>
          <Button
            disabled={isButtonDisabled}
            id="done"
            onPress={handleSaveReminder}
          >
            Done
          </Button>
        </Card.Actions>
        <AssignReminderDialog
          date={reminder.date}
          email={reminder.email}
          phoneNumber={reminder.phoneNumber}
        />
      </Card>
    </View>
  );
};

export default ReminderCard;
