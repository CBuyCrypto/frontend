import React, { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-paper";
import { ItemList } from "./ItemList";
import { NewItem } from "./NewItem";
import { BoughtItems } from "./BoughtItems";
import { YourItems } from "./YourItems";

const contractAddress = "";

export const Stack = () => {
  const connector = useWalletConnect();
  const Stack = createStackNavigator();

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="ItemList" component={ItemList} />
        <Stack.Screen name="BoughtItems" component={BoughtItems} />
        <Stack.Screen name="NewItem" component={NewItem} />
        <Stack.Screen name="YourItems" component={YourItems} />
      </Stack.Navigator>
    </View>
  );
};
