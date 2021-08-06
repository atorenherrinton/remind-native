/** @format */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { validateEmail, validatePhoneNumber } from "../../utils/utils";
import { setIsButtonDisabled } from "../../slices/reminder-card.slice";
import {
  addEmail,
  addPhoneNumber,
  removeAssignment,
} from "../../slices/reminders.slice";
import DropDown from "react-native-paper-dropdown";
import { IconButton, List, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import ValidationText from "../validation-text/validation.text";

const AssignReminderForm = (props) => {
  const dispatch = useDispatch();
  const [isReminderAssigned, setIsReminderAssigned] = useState(true);
  const [email, setEmail] = useState(props.email);
  const [validationError, setValidationError] = useState(false);
  const [sendOption, setSendOption] = useState("email");
  const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber);
  const [showDropDown, setShowDropDown] = useState(false);

  const resetButton = () => {
    dispatch(setIsButtonDisabled(false));
  };
  const resetValidationError = () => {
    if (validationError) setValidationError(false);
  };

  const validate = () => {
    if (sendOption === "email") {
      if (validateEmail(email)) {
        dispatch(addEmail(email));
        setIsReminderAssigned(true);
        resetButton();
      } else {
        setValidationError(true);
      }
    } else {
      if (validatePhoneNumber(phoneNumber)) {
        setValidationError(true);
      } else {
        setEmail("");
        dispatch(addPhoneNumber(phoneNumber));
        setIsReminderAssigned(true);
        resetButton();
      }
    }
  };

  const handleSetEmail = (text) => {
    resetValidationError();
    setEmail(text);
  };

  const handleSetPhoneNumber = (text) => {
    resetValidationError();
    setPhoneNumber(text);
  };

  const handleActivateForm = () => {
    setIsReminderAssigned(false);
    dispatch(setIsButtonDisabled(true));
  };

  const handleAdd = () => {
    validate();
  };

  const handleDelete = () => {
    setPhoneNumber("");
    setEmail("");
    dispatch(removeAssignment());
    setIsReminderAssigned(true);
    resetButton();
  };

  const sendOptions = [
    {
      label: "@",
      value: "email",
    },
    {
      label: "#",
      value: "phone",
    },
  ];

  return (
    <View id="assign-reminder">
      {isReminderAssigned ? (
        <List.Item
          id="assign-reminder-button"
          left={(props) => (
            <List.Icon {...props} icon="account" id="person-icon" />
          )}
          right={(props) => (
            <IconButton
              {...props}
              icon={!email && !phoneNumber ? "plus" : "close"}
              id={email || phoneNumber ? "assign-button" : "cancel-assignment"}
              onPress={email || phoneNumber ? handleDelete : handleActivateForm}
            />
          )}
          title={email || phoneNumber || "Assign Reminder"}
        ></List.Item>
      ) : (
        <List.Item
          id="assign-reminder-form"
          left={(props) => (
            <View style={styles.form}>
              <View style={styles.dropdown}>
                <DropDown
                  {...props}
                  list={sendOptions}
                  mode={"outlined"}
                  onDismiss={() => setShowDropDown(false)}
                  setValue={setSendOption}
                  showDropDown={() => setShowDropDown(true)}
                  visible={showDropDown}
                  value={sendOption}
                />
              </View>
              <View style={styles.textInput}>
                <TextInput
                  error={validationError}
                  id="assign-textfield"
                  mode={"outlined"}
                  onChangeText={
                    sendOption === "email"
                      ? handleSetEmail
                      : handleSetPhoneNumber
                  }
                  value={sendOption === "email" ? email : phoneNumber}
                />
                <ValidationText
                  text={
                    validationError && sendOption === "email"
                      ? "Please enter a valid email address"
                      : validationError && sendOption === "phone"
                      ? "Please enter a valid phone number"
                      : null
                  }
                />
              </View>
            </View>
          )}
          right={(props) => (
            <IconButton
              {...props}
              icon={email || phoneNumber ? "plus" : "close"}
              id={email || phoneNumber ? "assign-button" : "cancel-assignment"}
              onPress={email || phoneNumber ? handleAdd : handleDelete}
            />
          )}
        ></List.Item>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: 100,
  },
  form: {
    flexDirection: "row",
  },
  textInput: {
    width: 300,
  },
});

export default AssignReminderForm;
