import { Platform, Text, useWindowDimensions } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LoginSwitch } from "./src/screens/LoginSwitch";
import { Provider as PaperProvider } from "react-native-paper";
import { theme } from "./src/styles/theme";
import { NavigationContainer } from "@react-navigation/native";
import { DesktopContext, Web3Context } from "./src/util";
import React from "react";
import Web3 from "web3";
export default function App() {
  const windowWidth = useWindowDimensions().width;
  const web3 = React.useMemo(
    //() => new Web3(new Web3.providers.HttpProvider(`https://${localhost}:8545/`)),
    () =>
      new Web3(
        new Web3.providers.HttpProvider(
          `https://alfajores-forno.celo-testnet.org/`
        )
      ),
    []
  );
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <DesktopContext.Provider
          value={
            Platform.OS != "ios" &&
            Platform.OS != "android" &&
            windowWidth > 500
          }
        >
          <Web3Context.Provider
          value={web3}
        >
          <LoginSwitch />
          </Web3Context.Provider>
        </DesktopContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
}
