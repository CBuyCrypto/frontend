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

export const carnoTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  roundness: 2,
  dark: false,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: "#202532", //appbar colour
    secondary: "#FFFFFF", //, //first menu colour
    accent: "#eef2f5", //second menu colour
    background: "#f8f9fa", //background for most stuff  "#a1c3e6"
    surface: "#d8e0e6", //elevated surface colour (dropdown) and
    text: "#000000", //text and icon standard
    lightText: "#FFFFFF",
  },
  // #202532 Dark blue - background and header
  // #37b877 Bright Green - Primary CTAs on the website are
  // #f8f9fa Light grey background

  // #eef2f5 Lighter grey 1
  // #d8e0e6 Lighter grey

  // #c2cdd4
  // #aebcc6
  // #9aabb8
};
