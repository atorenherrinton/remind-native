/** @format */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsDrawerOpen } from "../../slices/nav-drawer.slice";
import { setWhichReminders } from "../../slices/reminders.slice";
import { Drawer } from "react-native-paper";
import { View } from "react-native";

const NavDrawer = () => {
  const [active, setActive] = useState("");
  const dispatch = useDispatch();

  const handleClick = (whichReminders) => {
    setActive(whichReminders);
    dispatch(setWhichReminders(whichReminders));
    dispatch(setIsDrawerOpen());
  };

  return (
    <View id="nav-drawer">
      <Drawer.Section>
        <Drawer.Item
          label="Todos"
          active={active === "Todos"}
          onPress={() => handleClick("Todos")}
        />
        <Drawer.Item
          label="Scheduled"
          active={active === "Scheduled"}
          onPress={() => handleClick("Scheduled")}
        />
        <Drawer.Item
          label="Completed"
          active={active === "Completed"}
          onPress={() => handleClick("Completed")}
        />
      </Drawer.Section>
    </View>
  );
};

export default NavDrawer;
