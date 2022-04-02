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
      <Card style={[{ margin: 10, height: 300 }, isDesktop && { width: 300 }]}>
        <Card.Cover source={{ uri: "https://ipfs.io/ipfs/" + item.ipfshash }} />
        <View
          style={{
            flexDirection: "row",
            flex: 1,
          }}
        >
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Subheading numberOfLines={1}>{item.title}</Subheading>
            <Text numberOfLines={4}>{item.description}</Text>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              marginRight: 5,
              marginTop: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Subheading>{item.price}</Subheading>
              <Image
                source={{
                  uri:
                    "https://s2.coinmarketcap.com/static/img/coins/64x64/9467.png",
                }}
                style={{ resizeMode: "center", height: 20, width: 20 }}
              />
            </View>
            <Button style={{ marginBottom: 10 }} onPress={() => buyItem(index)}>
              Buy
            </Button>
          </View>
        </View>
      </Card>
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
