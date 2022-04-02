import React, { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native-paper";

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
};

const contractAddress = "";

export const Stack = () => {
  const connector = useWalletConnect();
  const Stack = createNativeStackNavigator();
  const killSession = useCallback(() => {
    return connector.killSession();
  }, [connector]);
  const result = connector.sendTransaction({
    from: String(connector.accounts[0]), // Required
    to: "0x5AD22f3d353Ee97c041d5f504b1e77e2C766F3d2", // Required
    //gas: "string", // Required
    //gasPrice: "string", // Required
    //value: "string", // Required
    data: "0xcfae3217", // Required
    //nonce: "string", // Required
  });
}, [connector])
  /*
  const contractCall = React.useCallback(() => {
    console.log("Contract Call Happens Here")
*/

  /*
  function testing(){
    const testData = "0x53d9d9100000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a6d9c5f7d4de3cef51ad3b7235d79ccc95114de5000000000000000000000000a6d9c5f7d4de3cef51ad3b7235d79ccc95114daa";
    const decodedData = abiDecoder.decodeMethod(testData);
    console.log(decodedData);
  }*/

  return (
    <>
      <Text>{shortenAddress(connector.accounts[0])}</Text>
      {/*<TouchableOpacity onPress={contractCall}>
        <Text>Contract Call</Text>
  </TouchableOpacity>*/}
      <Button onPress={killSession}>
        <Text>Log out</Text>
      </Button>
    </>
  );
};
