/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectErrorMessage,
  setErrorMessage,
} from "../../slices/authenticate.slice";
import { Snackbar } from "react-native-paper";

const ErrorAlert = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);
  return (
    <Snackbar
      duration={5000}
      id="error-alert"
      onDismiss={() => {
        dispatch(setErrorMessage(""));
      }}
      visible={errorMessage}
    >
      {errorMessage}
    </Snackbar>
  );
};

export default ErrorAlert;
