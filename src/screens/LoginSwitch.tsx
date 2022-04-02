import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useCallback } from "react";
import { View } from "react-native";
import { Button, Headline, Text } from "react-native-paper";
import { Stack } from "./Stack";

export const LoginSwitch = () => {
  const connector = useWalletConnect();
  const connectWallet = useCallback(() => {
    return connector.connect();
  }, [connector]);

  return (
    <View style={{ flex: 1 }}>
      <Headline>CBuy</Headline>
      {!connector.connected && (
        <Button mode="contained" onPress={connectWallet}>
          <Text>Connect a Wallet</Text>
        </Button>
      )}
      {!!connector.connected && <Stack />}
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
