/** @format */
import React, { useEffect } from "react";
import firebase from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUid } from "../../slices/authenticate.slice";
import { selectIsDrawerOpen } from "../../slices/nav-drawer.slice";
import {
  selectToggleMoreOptions,
  selectWhichReminders,
  setCompleted,
  setScheduled,
  setTodos,
} from "../../slices/reminders.slice";
import AppBar from "../../components/app-bar/app-bar";
import NavDrawer from "../../components/nav-drawer/nav-drawer";
import ReminderCard from "../../components/reminder-card/reminder-card";
import ReminderList from "../../components/reminder-list/reminder-list";
import { View } from "react-native";

const Main = () => {
  const db = firebase.firestore();
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(selectIsDrawerOpen);
  const toggleMoreOptions = useSelector(selectToggleMoreOptions);
  const uid = useSelector(selectUid);
  const whichReminders = useSelector(selectWhichReminders);

  useEffect(() => {
    const loadReminders = () => {
      if (whichReminders === "Todos") {
        db.collection("users")
          .doc(uid)
          .collection("reminders")
          .where("isCompleted", "==", false)
          .orderBy("timestamp")
          .onSnapshot((querySnapshot) => {
            const reminders = [];
            querySnapshot.forEach((doc) => {
              const reminder = doc.data();
              reminder["id"] = doc.id;
              reminder["timestamp"] = doc.data().timestamp.toJSON();
              reminders.push(reminder);
            });
            dispatch(setTodos(reminders));
          });
      } else if (whichReminders === "Scheduled") {
        db.collection("users")
          .doc(uid)
          .collection("reminders")
          .where("date", "!=", false)
          .where("isCompleted", "==", false)
          .orderBy("date")
          .onSnapshot((querySnapshot) => {
            const reminders = [];
            querySnapshot.forEach((doc) => {
              const reminder = doc.data();
              reminder["id"] = doc.id;
              reminder["timestamp"] = doc.data().timestamp.toJSON();
              reminders.push(reminder);
            });
            dispatch(setScheduled(reminders));
          });
      } else if (whichReminders === "Completed") {
        db.collection("users")
          .doc(uid)
          .collection("reminders")
          .where("isCompleted", "==", true)
          .orderBy("timestamp")
          .onSnapshot((querySnapshot) => {
            const reminders = [];
            querySnapshot.forEach((doc) => {
              const reminder = doc.data();
              reminder["id"] = doc.id;
              reminder["timestamp"] = doc.data().timestamp.toJSON();
              reminders.push(reminder);
            });
            dispatch(setCompleted(reminders));
          });
      }
    };

    loadReminders();
  });

  return (
    <View id="main">
      <AppBar />
      {isDrawerOpen ? <NavDrawer title="navigation-drawer" /> : null}
      {toggleMoreOptions ? <ReminderCard /> : <ReminderList />}
    </View>
  );
};
export default Main;
