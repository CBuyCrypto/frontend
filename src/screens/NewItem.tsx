import { StackScreenProps } from "@react-navigation/stack";
import { useContext, useState } from "react";
import { Image, View } from "react-native";
import { Button, FAB, HelperText, TextInput } from "react-native-paper";
import { Item, navigationProps, Web3Context } from "../util";
import * as ImagePicker from "expo-image-picker";
import FABs from "../components/ActionButtons";
import { uploadFile } from "../web3/IPFS";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import marketplaceInfo from "../contractData/MarketplaceInfo";
import { listItem } from "../web3/smartContractCalls";
import { ItemList } from "./ItemList";

export const NewItem = ({
  route,
  navigation,
}: StackScreenProps<navigationProps, "YourItems">) => {
  const [item, setItem] = useState({
    title: "",
    description: "",
    ipfshash: "",
    price: 0,
  } as Item);
  const [error, setError] = useState("");
  const web3 = useContext(Web3Context);
  const connector = useWalletConnect();

  async function listNewItem() {
    if (!item.title || !item.description || !item.ipfshash || !item.price) {
      setError("Not everything filled out.");
      console.log("Not everything filled out")
      console.log(item)
      return;
    }
    console.log("attempting list item");
    const ipfsHash = await uploadFile(item.ipfshash);
    const resp = await listItem(web3, connector, connector.accounts[0], {
      ...item,
      ipfshash: ipfsHash,
    });
    navigation.navigate("ItemList");
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 20,
        overflow: "scroll",
      }}
    >
      <View
        style={{
          maxWidth: 500,
          width: "100%",
          marginVertical: 5,
        }}
      >
        <TextInput
          autoComplete={undefined}
          value={item.title}
          mode="flat"
          label="Title"
          style={{ marginVertical: 5, width: "100%" }}
          onChangeText={(value) => setItem({ ...item, title: value })}
        />
        <TextInput
          autoComplete={undefined}
          value={item.price ? item.price.toString() : ""}
          mode="flat"
          label="Price"
          style={{ marginVertical: 5, width: "100%" }}
          onChangeText={(value) =>
            setItem({ ...item, price: parseFloat(value) })
          }
          right={
            <Image
              source={{
                uri:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/9467.png",
              }}
              style={{ resizeMode: "center", height: 20, width: 20 }}
            />
          }
        />
        <TextInput
          autoComplete={undefined}
          value={item.description}
          mode="flat"
          label="Description"
          multiline
          style={{ height: 200, marginVertical: 5, width: "100%" }}
          onChangeText={(value) => setItem({ ...item, description: value })}
        />
        {item.ipfshash && (
          <Image
            style={{
              resizeMode: "center",
              height: 200,
              width: "100%",
            }}
            source={{ uri: item.ipfshash }}
          />
        )}
        <Button
          onPress={() =>
            ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            }).then((result) => {
              if (!result.cancelled) {
                setItem({ ...item, ipfshash: result.uri });
              }
            })
          }
          mode="text"
        >
          Upload Image
        </Button>
        <Button onPress={listNewItem} mode="contained">
          List item
        </Button>
        <HelperText style={{ fontSize: 14 }} type="error" visible={error != ""}>
          {error}
        </HelperText>
      </View>
      <FABs navigation={navigation} />
    </View>
  );
};
