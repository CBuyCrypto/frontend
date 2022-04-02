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

  return (
    <>
      <Text>{shortenAddress(connector.accounts[0])}</Text>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="ItemList" component={ItemList} />
        <Stack.Screen name="NewItem" component={NewItem} />
      </Stack.Navigator>
    </>
  );
};
