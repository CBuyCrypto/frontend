import { Fragment, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Image,
  View,
} from "react-native";
import {
  Button,
  Card,
  Headline,
  Paragraph,
  Subheading,
  Text,
  Title,
} from "react-native-paper";
import FABs from "../components/ActionButtons";
import { DesktopContext, Item, navigationProps, Web3Context } from "../util";
import { StackScreenProps } from "@react-navigation/stack";
import { RenderItem } from "../components/Item";
import { buyItem, getItems } from "../web3/smartContractCalls";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

export const ItemList = ({
  route,
  navigation,
}: StackScreenProps<navigationProps, "ItemList">) => {
  const connector = useWalletConnect();
  const [items, setItems] = useState({} as Item[]);
  const isFocused = useIsFocused();
  const [initializing, setInitializing] = useState(true);
  useEffect(() => {
    setInitializing(true);
  }, [isFocused]);
  useEffect(() => {
    if (initializing)
      getItems(web3).then((items) => {
        setItems(
          items
            .filter(
              (item) =>
                item.status == "AVAILABLE" &&
                item.seller != connector.accounts[0]
            )
            .sort((item) => item.createdOn)
        );
        setInitializing(false);
      });
  }, [initializing]);
  const web3 = useContext(Web3Context);
  const isDesktop = useContext(DesktopContext);
  /*const items = [
    {
      id: "2",
      description: "DESC1w",
      ipfsHash: "QmexegxWiS82f9KxLxPALf9pn65yQcxxttfpfH41j6xFsx",
      title: "TITLE1",
      price: 1,
      seller: "0x980988902345",
      status: "AVAILABLE",
    },
    {
      id: "1",
      description:
        "DESC1wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      ipfsHash: "QmexegxWiS82f9KxLxPALf9pn65yQcxxttfpfH41j6xFsx",
      title: "TITLE1",
      price: 1,
      seller: "0x980988902345",
      status: "AVAILABLE",
    },
  ];*/
  const renderItem: ListRenderItem<Item> = ({ item, index }) => {
    return (
      <RenderItem
        item={item}
        action={() => {
          return (
            <Button
              style={{ marginBottom: 10 }}
              onPress={() =>
                buyItem(
                  web3,
                  connector,
                  item.itemId,
                  connector.accounts[0],
                  item.price
                ).then(() => {
                  setInitializing(true);
                })
              }
            >
              Buy
            </Button>
          );
        }}
      />
    );
  };
  if (!initializing) {
    return (
      <View style={{ flex: 1 }}>
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
          ListFooterComponent={<View style={{ height: 70 }}></View>}
        />
        <FABs navigation={navigation} />
      </View>
    );
  } else {
    return <ActivityIndicator />;
  }
};
