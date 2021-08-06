import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsNewUser,
  setEmailValidationError,
  setIsNewUser,
  setNameValidationError,
  setPasswordValidationError,
} from "../../slices/authenticate.slice";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";


const ChangeAuthButton = () => {
  const dispatch = useDispatch();
  const isNewUser = useSelector(selectIsNewUser);

  const handleClick = () => {
    dispatch(setIsNewUser());
    dispatch(setEmailValidationError(false));
    dispatch(setNameValidationError(false));
    dispatch(setPasswordValidationError(false));
  };

  return (
    <Button
      id="change-auth-button"
      mode="text"
      onPress={handleClick}
      style={styles.button}
    >
      {isNewUser
        ? "Already have an account? Sign in instead"
        : "Don't have an account? Sign up instead"}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 5,
  },
});

export default ChangeAuthButton;
