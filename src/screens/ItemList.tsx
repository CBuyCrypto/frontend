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
import { DesktopContext, Item, navigationProps } from "../util";
import { StackScreenProps } from "@react-navigation/stack";
import { RenderItem } from "../components/Item";

export const ItemList = ({
  route,
  navigation,
}: StackScreenProps<navigationProps, "ItemList">) => {
  //const [items, setItems] = useState({} as Item[]);
  const [initializing, setInitializing] = useState(true);
  useEffect(() => {
    //getItems
    //CALL CONTRACT HERE
    setInitializing(false);
  }, []);
  const isDesktop = useContext(DesktopContext);
  async function buyItem(itemIndex: number) {
    //IMPLEMENT
    //change item status to sold
    //put money in
  }
  const items = [
    {
      id: "2",
      description: "DESC1w",
      ipfshash: "QmexegxWiS82f9KxLxPALf9pn65yQcxxttfpfH41j6xFsx",
      title: "TITLE1",
      price: 1,
      seller: "0x980988902345",
      status: "AVAILABLE",
    },
    {
      id: "1",
      description:
        "DESC1wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      ipfshash: "QmexegxWiS82f9KxLxPALf9pn65yQcxxttfpfH41j6xFsx",
      title: "TITLE1",
      price: 1,
      seller: "0x980988902345",
      status: "AVAILABLE",
    },
  ];
  const renderItem: ListRenderItem<Item> = ({ item, index }) => {
    return (
      <RenderItem
        item={item}
        action={() => {
          return (
            <Button style={{ marginBottom: 10 }} onPress={() => buyItem(index)}>
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
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={{ height: 70 }}></View>}
        />
        <FABs navigation={navigation} />
      </View>
    );
  } else {
    return <ActivityIndicator />;
  }
};
