import { Fragment, useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ListRenderItem } from "react-native";
import { Button, Card, Paragraph, Text, Title } from "react-native-paper";
import FABs from "../components/ActionButtons";
import { DesktopContext, Item, navigationProps } from "../util";
import { StackScreenProps } from "@react-navigation/stack";
import { RenderItem } from "../components/Item";

export const BoughtItems = ({
  route,
  navigation,
}: StackScreenProps<navigationProps, "BoughtItems">) => {
  const [items, setItems] = useState({} as Item[]);
  const [initializing, setInitializing] = useState(true);
  useEffect(() => {
    //getItems
    //CALL CONTRACT HERE
    setInitializing(false);
  }, []);
  const isDesktop = useContext(DesktopContext);
  async function received(itemIndex: number) {
    //IMPLEMENT
    //change status to received
    //return 1*value to buyer
    //return 2*value to seller (or 1*value if seller already claimed to get back deposit)
  }
  const renderItem: ListRenderItem<Item> = ({ item, index }) => {
    return (
      <RenderItem
        item={item}
        action={() => {
          return <Button onPress={() => received(index)}>Received</Button>;
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
