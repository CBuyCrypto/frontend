import { DefaultTheme as PaperDefaultTheme } from "react-native-paper";
import { DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNativePaper {
    interface ThemeColors {
      secondary: string;
      lightText: string;
    }
  }
}
export const theme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  roundness: 20,
  dark: false,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: "#006400", //appbar colour
    secondary: "#FFFFFF", //, //first menu colour
    accent: "#00FF00", //second menu colour
    background: "#fafafa", //background for most stuff
    surface: "#edf5f7", //elevated surface colour (dropdown) and
    text: "#000000", //text and icon standard
    lightText: "#FFFFFF",
  },
};
