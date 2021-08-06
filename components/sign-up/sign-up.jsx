/** @format */

import React from "react";
import {
  addUserToDatabase,
  validateEmail,
  validateName,
  validatePassword,
} from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectErrorMessage,
  selectName,
  selectNameValidationError,
  selectPassword,
  setEmailValidationError,
  setErrorMessage,
  setName,
  setNameValidationError,
  setPasswordValidationError,
  setUid,
} from "../../slices/authenticate.slice";
import { Avatar, Button, Card, Divider, TextInput } from "react-native-paper";
import ChangeAuthButton from "../change-auth-button/change-auth-button";
import ErrorAlert from "../error-alert/error-alert";
import GoogleSignInButton from "../google-signin-button/google-signin-button";
import firebase from "../../firebase/firebase";
import EmailInput from "../email-input/email-input";
import PasswordInput from "../password-input/password-input";
import { StyleSheet, View } from "react-native";
import ValidationText from "../validation-text/validation.text";

const SignUp = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const errorMessage = useSelector(selectErrorMessage);
  const name = useSelector(selectName);
  const nameValidationError = useSelector(selectNameValidationError);
  const password = useSelector(selectPassword);

  const handleSignUp = () => {
    const validatedEmail = validateEmail(email);
    const validatedName = validateName(name);
    const validatedPassword = validatePassword(password);

    if (validatedEmail && validatedName && validatedPassword) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          addUserToDatabase(name, user.uid);
          dispatch(setUid(user.uid));
          localStorage.setItem("user", JSON.stringify(user.uid));
          localStorage.setItem("name", JSON.stringify(name));
        })
        .catch((error) => {
          dispatch(setErrorMessage(error.message));
        });
    } else {
      if (!validatedEmail) {
        dispatch(setEmailValidationError(true));
      }
      if (!validatedName) {
        dispatch(setNameValidationError(true));
      }
      if (!validatedPassword) {
        dispatch(setPasswordValidationError(true));
      }
    }
  };

  const handleSetName = (text) => {
    if (nameValidationError) {
      dispatch(setNameValidationError(false));
    }
    dispatch(setName(text));
  };

  return (
    <View title="sign-up">
      <Card role="card">
        <Card.Title
          id="card-header"
          left={(props) => <Avatar.Icon {...props} icon="account" />}
          title="Sign up"
        />
        <Divider role="divider" style={styles.divider} />
        <Card.Content role="card-content">
          <TextInput
            error={nameValidationError}
            id="name-input"
            mode="outlined"
            onChangeText={handleSetName}
            label="Name"
            value={name}
          />
          <ValidationText
            text={nameValidationError ? "Please enter a valid name" : null}
          />
          <EmailInput />
          <PasswordInput />
          {errorMessage ? <ErrorAlert message={errorMessage} /> : null}
          <Button
            id="sign-up"
            mode="contained"
            onPress={handleSignUp}
            style={styles.button}
          >
            Sign up
          </Button>
          <GoogleSignInButton />
          <ChangeAuthButton />
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 25,
  },
  divider: {
    marginBottom: 20,
  },
});

export default SignUp;
