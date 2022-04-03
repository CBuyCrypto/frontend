import { Fragment, useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ListRenderItem } from "react-native";
import { Button, Card, Paragraph, Text, Title } from "react-native-paper";
import FABs from "../components/ActionButtons";
import { DesktopContext, Item, navigationProps, Web3Context } from "../util";
import { StackScreenProps } from "@react-navigation/stack";
import { RenderItem } from "../components/Item";
import {
  getBuyersItems,
  getItems,
  receivedItem,
} from "../web3/smartContractCalls";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useIsFocused } from "@react-navigation/native";

export const BoughtItems = ({
  route,
  navigation,
}: StackScreenProps<navigationProps, "BoughtItems">) => {
  const connector = useWalletConnect();
  const [items, setItems] = useState({} as Item[]);
  const [initializing, setInitializing] = useState(true);
  const web3 = useContext(Web3Context);
  const isFocused = useIsFocused();
  useEffect(() => {
    setInitializing(true);
  }, [isFocused]);
  useEffect(() => {
    if (initializing)
      getBuyersItems(web3).then((items) => {
        setItems(items.sort((item) => item.createdOn));
        setInitializing(false);
      });
  }, [initializing]);
  const isDesktop = useContext(DesktopContext);
  const renderItem: ListRenderItem<Item> = ({ item, index }) => {
    return (
      <RenderItem
        item={item}
        action={() => {
          return (
            <Button
              onPress={() =>
                receivedItem(
                  web3,
                  connector,
                  item.itemId,
                  connector.accounts[0]
                ).then(() => setInitializing(true))
              }
            >
              Received
            </Button>
          );
        }}
      />
    );
  };
  if (!initializing) {
    return (
      <Fragment>
        <FlatList
          contentContainerStyle={
            isDesktop
              ? {
                  flexWrap: "wrap",
                  flexDirection: "row",
                  alignItems: "stretch",
                  justifyContent: "center",
                }
              : {
                  width: "100%",
                }
          }
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.itemId}
        />
        <FABs navigation={navigation} />
      </Fragment>
    );
  } else {
    return <ActivityIndicator />;
  }
};
