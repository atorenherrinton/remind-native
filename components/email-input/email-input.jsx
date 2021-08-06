/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectEmailValidationError,
  setEmail,
  setEmailValidationError,
} from "../../slices/authenticate.slice";
import {  TextInput } from "react-native-paper";
import { View } from "react-native";
import ValidationText from "../validation-text/validation.text";

const EmailInput = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const emailValidationError = useSelector(selectEmailValidationError);

  const handleChange = (event) => {
    if (emailValidationError) dispatch(setEmailValidationError(false));
    dispatch(setEmail(event.target.value));
  };

  return (
    <View>
      <TextInput
        error={emailValidationError}
        id="email-input"
        label="Email"
        mode="outlined"
        onChange={handleChange}
        value={email}
      />
      <ValidationText
        text={
          emailValidationError ? "Please enter a valid email address" : null
        }
      />
    </View>
  );
};

export default EmailInput;
