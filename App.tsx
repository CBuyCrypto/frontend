import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Home from "./src/screens/Home";
import { utils } from "ethers";
export default function App() {
  console.log(utils.hexlify(321));
  return <Home />;
}
