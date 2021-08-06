/** @format */

import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { selectIsNewUser } from "../../slices/authenticate.slice";
import AppBar from "../../components/app-bar/app-bar";
import SignIn from "../../components/sign-in/sign-in";
import SignUp from "../../components/sign-up/sign-up";

const Authenticate = () => {
  const isNewUser = useSelector(selectIsNewUser);
  return (
    <View id="authenticate">
      <AppBar />
      {isNewUser ? <SignUp /> : <SignIn />}
    </View>
  );
};

export default Authenticate;
