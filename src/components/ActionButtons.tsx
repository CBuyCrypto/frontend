import React, { useState } from "react";
import { FAB, Portal } from "react-native-paper";

const FABs = (props: { navigation: any }) => {
  const [open, setOpen] = useState(false);

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible={true}
        icon={"alpha-c"}
        actions={[
          {
            icon: "plus",
            label: "Sell Item",
            onPress: () => props.navigation.navigate("NewItem"),
          },
          {
            icon: "shopping",
            label: "Items you bought",
            onPress: () => props.navigation.navigate("BoughtItems"),
          },
          {
            icon: "account",
            label: "Items you are selling",
            onPress: () => props.navigation.navigate("account"),
          },
          {
            icon: "home",
            label: "Home",
            onPress: () => props.navigation.navigate("ItemList"),
            small: false,
          },
        ]}
        onStateChange={({ open }) => setOpen(open)}
      />
    </Portal>
  );
};

export default FABs;
