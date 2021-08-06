/** @format */

import React from "react";
import { loadName } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { setName, setUid } from "../../slices/authenticate.slice";
import { Button } from "react-native-paper";
import firebase from "../../firebase/firebase";
import { StyleSheet } from "react-native";

const GoogleSignInButton = () => {
  const dispatch = useDispatch();
  const provider = new firebase.auth.GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        const user = result.user;
        dispatch(setUid(user.uid));
        loadName(user.uid).then((result) => {
          dispatch(setName(result.name));
          localStorage.setItem("name", JSON.stringify(result.name));
        });
        localStorage.setItem("user", JSON.stringify(user.uid));
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <Button
      id="continue-with-google"
      mode="outlined"
      onPress={handleGoogleSignIn}
      style={styles.button}
    >
      Continue with Google
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
  },
});

export default GoogleSignInButton;
