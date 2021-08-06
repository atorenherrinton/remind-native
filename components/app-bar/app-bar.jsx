/** @format */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setName, setUid, selectUid } from "../../slices/authenticate.slice";
import { setIsDrawerOpen } from "../../slices/nav-drawer.slice";
import { reset } from "../../slices/reminders.slice";
import { Appbar, Menu } from "react-native-paper";
import firebase from "../../firebase/firebase";
import { View } from "react-native";

const AppBar = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const uid = useSelector(selectUid);

  const _handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.clear();
        dispatch(setName(undefined));
        dispatch(setUid(undefined));
        dispatch(reset());
        // Sign-out successful.
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View id="app-bar">
      <Appbar.Header>
        {uid ? (
          <Appbar.Action
            icon="menu"
            onPress={() => {
              dispatch(setIsDrawerOpen());
            }}
          />
        ) : null}
        <Appbar.Content title="Remind" />

        {uid ? (
          <Menu
            visible={isMenuOpen}
            onDismiss={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            anchor={
              <Appbar.Action
                color="white"
                icon="dots-vertical"
                onPress={() => {
                  setIsMenuOpen(!isMenuOpen);
                }}
              />
            }
          >
            <Menu.Item onPress={_handleSignOut} title="Sign Out" />
          </Menu>
        ) : null}
      </Appbar.Header>
    </View>
  );
};

export default AppBar;
