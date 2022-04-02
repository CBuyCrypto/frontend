import { Fragment, useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ListRenderItem } from "react-native";
import { Button, Card, Paragraph, Text, Title } from "react-native-paper";
import FABs from "../components/ActionButtons";
import { DesktopContext, Item, navigationProps } from "../util";
import { StackScreenProps } from "@react-navigation/stack";
import { RenderItem } from "../components/Item";

export const YourItems = ({
  route,
  navigation,
}: StackScreenProps<navigationProps, "YourItems">) => {
  const [items, setItems] = useState({} as Item[]);
  const [initializing, setInitializing] = useState(true);
  useEffect(() => {
    //getItems
    //CALL CONTRACT HERE
    setInitializing(false);
  }, []);
  const isDesktop = useContext(DesktopContext);
  async function removeItem(itemIndex: number) {
    //IMPLEMENT ITEM removal HERE:
    //item removed
    //2*value returned
  }
  const renderItem: ListRenderItem<Item> = ({ item, index }) => {
    return (
      <RenderItem
        item={item}
        action={() => {
          return (
            item.status == "AVAILABLE" && (
              <Button onPress={() => removeItem(index)}>Remove</Button>
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
