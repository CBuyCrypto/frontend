import { Fragment, useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ListRenderItem } from "react-native";
import { Button, Card, Paragraph, Text, Title } from "react-native-paper";
import FABs from "../components/ActionButtons";
import { DesktopContext, Item, navigationProps, Web3Context } from "../util";
import { StackScreenProps } from "@react-navigation/stack";
import { RenderItem } from "../components/Item";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { getItems, removeItem } from "../web3/smartContractCalls";

export const YourItems = ({
  route,
  navigation,
}: StackScreenProps<navigationProps, "YourItems">) => {
  const connector = useWalletConnect();
  const [items, setItems] = useState({} as Item[]);
  const [initializing, setInitializing] = useState(true);
  const web3 = useContext(Web3Context);
  useEffect(() => {    
    getItems(web3).then((items) => {
      setItems(
        items
          .filter((item) => item.seller == connector.accounts[0])
          .sort((item) => item.createdOn)
      );
      console.log(items)
      setInitializing(false);
    });
  }, []);
  const isDesktop = useContext(DesktopContext);
  const renderItem: ListRenderItem<Item> = ({ item, index }) => {
    return (
      <RenderItem
        item={item}
        status={item.status}
        action={() => {
          return (
            item.status == "AVAILABLE" && (
              <Button
                onPress={() =>
                  removeItem(web3, connector, item.id, connector.accounts[0])
                }
              >
                Remove
              </Button>
            )
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
          keyExtractor={(item) => item.id}
        />
        <FABs navigation={navigation} />
      </Fragment>
    );
  } else {
    return <ActivityIndicator />;
  }
};
