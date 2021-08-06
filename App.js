import React from "react";
import { View } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider, useSelector } from "react-redux";
import { selectUid } from "./slices/authenticate.slice";
import store from "./app/store";

import Authenticate from "./pages/authenticate/authenticate";
import Main from "./pages/main/main";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#242038",
    accent: "#725AC1",
  },
};

const App = () => {
  const uid = useSelector(selectUid);
  return <View>{uid ? <Main /> : <Authenticate />}</View>;
};

const WrappedApp = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </StoreProvider>
  );
};

export default WrappedApp;
