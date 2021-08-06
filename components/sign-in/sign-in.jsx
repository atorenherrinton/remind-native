/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadName, validateEmail, validatePassword } from "../../utils/utils";
import {
  selectEmail,
  selectErrorMessage,
  selectPassword,
  setEmailValidationError,
  setErrorMessage,
  setName,
  setPasswordValidationError,
  setUid,
} from "../../slices/authenticate.slice";
import { Avatar, Button, Card, Divider } from "react-native-paper";
import ChangeAuthButton from "../change-auth-button/change-auth-button";
import EmailInput from "../email-input/email-input";
import ErrorAlert from "../error-alert/error-alert";
import firebase from "../../firebase/firebase";
import GoogleSignInButton from "../google-signin-button/google-signin-button";
import PasswordInput from "../password-input/password-input";
import { StyleSheet, View } from "react-native";

const SignIn = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const errorMessage = useSelector(selectErrorMessage);
  const password = useSelector(selectPassword);

  const handleSignIn = () => {
    const validatedEmail = validateEmail(email);
    const validatedPassword = validatePassword(password);

    if (validatedEmail && validatedPassword) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch(setUid(user.uid));
          loadName(user.uid).then((result) => {
            dispatch(setName(result.name));
            localStorage.setItem("name", JSON.stringify(result.name));
          });
          localStorage.setItem("user", JSON.stringify(user.uid));
        })
        .catch((error) => {
          dispatch(setErrorMessage(error.message));
        });
    } else {
      if (!validatedEmail) {
        dispatch(setEmailValidationError(true));
      }
      if (!validatedPassword) {
        dispatch(setPasswordValidationError(true));
      }
    }
  };

  return (
    <View title="sign-in">
      <Card role="card">
        <Card.Title
          id="card-header"
          left={(props) => <Avatar.Icon {...props} icon="account" />}
          title="Sign in"
        />
        <Divider id="divider" style={styles.divider} />
        <Card.Content role="card-content">
          <EmailInput />
          <PasswordInput />
          {errorMessage ? <ErrorAlert message={errorMessage} /> : null}
          <Button id="sign-in" mode="contained" onPress={handleSignIn} style={styles.button}>
            Sign in
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

export default SignIn;
