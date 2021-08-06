/** @format */

import React, { useState } from "react";
import { addReminder } from "../../utils/utils";
import { Button, TextInput } from "react-native-paper";
import { selectUid } from "../../slices/authenticate.slice";
import { selectWhichReminders } from "../../slices/reminders.slice";
import { useSelector } from "react-redux";

const AddReminder = () => {
  const [textField, setTextField] = useState("");
  const [toggleInput, setToggleInput] = useState(false);
  const uid = useSelector(selectUid);
  const whichReminders = useSelector(selectWhichReminders);

  const handleAddReminder = () => {
    if (textField.length > 0) {
      // Add to firestore
      addReminder(textField, uid, whichReminders);
      setTextField("");
      setToggleInput(false);
    }
  };

  return (
    <div title="add-reminder">
      {toggleInput ? (
        <TextInput
          id="add-reminder-input"
          mode="outlined"
          onChangeText={(text) => {
            setTextField(text);
          }}
          right={
            <TextInput.Icon
              onPress={handleAddReminder}
              icon="plus-circle-outline"
            />
          }
          value={textField}
        />
      ) : (
        <Button
          id="add-reminder-button"
          mode="outlined"
          onPress={() => {
            setToggleInput(true);
          }}
        >
          Add Reminder
        </Button>
      )}
    </div>
  );
};

export default AddReminder;
