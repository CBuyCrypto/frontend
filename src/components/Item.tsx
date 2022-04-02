import { ReactNode, useContext } from "react";
import { Image, View } from "react-native";
import { Button, Card, Subheading, Text } from "react-native-paper";
import { DesktopContext, Item } from "../util";

export const RenderItem = (props: {
  item: Item;
  action: () => ReactNode;
  status?: string;
}) => {
  const isDesktop = useContext(DesktopContext);
  return (
    <Card style={[{ margin: 10, height: 300 }, isDesktop && { width: 300 }]}>
      <Card.Cover
        source={{ uri: "https://ipfs.io/ipfs/" + props.item.ipfshash }}
      />
      <View
        style={{
          flexDirection: "row",
          flex: 1,
        }}
      >
        <View style={{ flex: 1, marginLeft: 5 }}>
          <Subheading numberOfLines={1}>{props.item.title}</Subheading>
          {props.status && <Text>{props.status}</Text>}
          <Text numberOfLines={4}>{props.item.description}</Text>
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
            <Subheading>{props.item.price}</Subheading>
            <Image
              source={{
                uri:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/9467.png",
              }}
              style={{ resizeMode: "center", height: 20, width: 20 }}
            />
          </View>
          {props.action()}
        </View>
      </View>
    </Card>
  );
};
