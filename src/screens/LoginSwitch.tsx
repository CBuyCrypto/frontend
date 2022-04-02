import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { Fragment, useCallback, useState } from "react";
import { View } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Button,
  Headline,
  IconButton,
  Subheading,
  Text,
} from "react-native-paper";
import { Stack } from "./Stack";
const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
};
export const LoginSwitch = () => {
  const connector = useWalletConnect();
  const [initializing, setInitializing] = useState(false);
  const connectWallet = useCallback(async () => {
    const resp = await connector.connect();
    return resp;
  }, [connector]);
  const logout = useCallback(() => {
    return connector.killSession();
  }, [connector]);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Cbuy" style={{ flexShrink: 0.5, flexGrow: 4 }} />
        {connector && connector.accounts && connector.accounts[0] && (
          <Fragment>
            <Subheading style={{ color: "white", marginRight: 20 }}>
              Welcome, {shortenAddress(connector.accounts[0])}
            </Subheading>
            <IconButton icon="power" onPress={logout} color="white" />
          </Fragment>
        )}
      </Appbar.Header>
      {!initializing && !connector.connected && (
        <Button mode="contained" onPress={connectWallet}>
          <Text>Connect a Wallet</Text>
        </Button>
      )}
      {!initializing && !!connector.connected && <Stack />}
    </View>
  );
};
/*  async function contractCall() {
    console.log("Contract Call Happens Here");

    const result = await connector.sendTransaction({
      from: String(connector.accounts[0]), // Required
      to: "0x5AD22f3d353Ee97c041d5f504b1e77e2C766F3d2", // Required
      //gas: "string", // Required
      //gasPrice: "string", // Required
      //value: "string", // Required
      data: "0xcfae3217", // Required
      //nonce: "string", // Required
    });
    console.log(result);
    return result;
  }*/
