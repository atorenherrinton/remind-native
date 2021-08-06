/** @format */

import React, { useState } from "react";
import { setReminderCompleted } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { selectUid } from "../../slices/authenticate.slice";
import {
  setReminder,
  setToggleMoreOptions,
} from "../../slices/reminders.slice";
import { Checkbox, List } from "react-native-paper";

const ReminderItem = ({
  id,
  date,
  email,
  isAssigned,
  isCompleted,
  phoneNumber,
  time,
  timestamp,
  title,
}) => {
  const createDisplayDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    const tomorrow = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (
      date &&
      !time &&
      new Date(date).toLocaleDateString() === today.toLocaleDateString()
    ) {
      // Today without time
      date = "Today";
    } else if (
      date &&
      time &&
      new Date(date).toLocaleDateString() === today.toLocaleDateString()
    ) {
      // Today with time
      date =
        "Today, " +
        new Date(date).toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "numeric",
        });
    } else if (
      date &&
      !time &&
      new Date(date).toLocaleDateString() === yesterday.toLocaleDateString()
    ) {
      // Yesterday without time
      date = "Yesterday";
    } else if (
      date &&
      time &&
      new Date(date).toLocaleDateString() === yesterday.toLocaleDateString()
    ) {
      // Yesterday with time
      date =
        "Yesterday, " +
        new Date(date).toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "numeric",
        });
    } else if (
      date &&
      !time &&
      new Date(date).toLocaleDateString() === tomorrow.toLocaleDateString()
    ) {
      // Tomorrow without time
      date = "Tomorrow";
    } else if (
      date &&
      time &&
      new Date(date).toLocaleDateString() === tomorrow.toLocaleDateString()
    ) {
      // Tomorrow with time
      date =
        "Tomorrow, " +
        new Date(date).toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "numeric",
        });
    } else if (date && !time) {
      // Any other day without time
      date = new Date(date).toLocaleString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } else if (date && time) {
      // Any other day with time
      date = new Date(date).toLocaleString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    }
    return date;
  };
  const dispatch = useDispatch();
  const displayDate = createDisplayDate(date);
  const [isChecked, setIsChecked] = useState(isCompleted);
  const uid = useSelector(selectUid);

  const handleSetCompleted = () => {
    setIsChecked(!isChecked);
    setReminderCompleted(id, !isCompleted, uid);
  };

  return (
    <div id="reminder-item">
      <List.Item
        description={
          email || (phoneNumber && displayDate)
            ? email || phoneNumber + "\n" + displayDate
            : displayDate
            ? displayDate
            : null
        }
        id="open-reminder-card"
        onPress={() => {
          dispatch(
            setReminder({
              id,
              isAssigned,
              date,
              displayDate,
              email,
              phoneNumber,
              time,
              timestamp,
              title,
            })
          );
          dispatch(setToggleMoreOptions());
        }}
        right={(props) => (
          <Checkbox
            {...props}
            id="checkbox"
            onPress={handleSetCompleted}
            status={isChecked ? "checked" : "unchecked"}
          />
        )}
        title={title}
      ></List.Item>
    </div>
  );
};

export default ReminderItem;
