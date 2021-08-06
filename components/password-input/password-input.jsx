import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPassword,
  selectPasswordValidationError,
  setPassword,
  setPasswordValidationError,
} from "../../slices/authenticate.slice";
import {  TextInput } from "react-native-paper";
import { View } from "react-native";
import ValidationText from "../validation-text/validation.text";

const PasswordInput = () => {
  const dispatch = useDispatch();
  const password = useSelector(selectPassword);
  const passwordValidationError = useSelector(selectPasswordValidationError);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (text) => {
    if (passwordValidationError) dispatch(setPasswordValidationError(false));
    dispatch(setPassword(text));
  };

  return (
    <View>
      <TextInput
        error={passwordValidationError}
        id="password-input"
        label="Password"
        onChangeText={handlePasswordChange}
        mode="outlined"
        right={(props) => (
          <TextInput.Icon
            {...props}
            onPress={() => {
              setShowPassword(!showPassword);
            }}
            name={showPassword ? "eye" : "eye-off"}
          />
        )}
        secureTextEntry={!showPassword}
        value={password}
      />
      {passwordValidationError ? ( <ValidationText text="Please enter a valid password"/>):null}
     

    </View>
  );
};

export default PasswordInput;
