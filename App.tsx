import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LoginSwitch } from "./src/screens/LoginSwitch";
import { Provider as PaperProvider } from "react-native-paper";
import { theme } from "./src/styles/theme";
import { NavigationContainer } from "@react-navigation/native";
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <LoginSwitch />
      </NavigationContainer>
    </PaperProvider>
  );
}
