import React from "react";
import { HelperText } from "react-native-paper";
import { StyleSheet } from "react-native";

const ValidationText = ({ text }) => {
  return <HelperText style={styles.text}>{text}</HelperText>;
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 15,
  },
});

export default ValidationText;
