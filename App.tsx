import { Platform, Text, useWindowDimensions } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LoginSwitch } from "./src/screens/LoginSwitch";
import { Provider as PaperProvider } from "react-native-paper";
import { theme } from "./src/styles/theme";
import { NavigationContainer } from "@react-navigation/native";
import { DesktopContext } from "./src/util";
export default function App() {
  const windowWidth = useWindowDimensions().width;
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
          <LoginSwitch />
        </DesktopContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
}
