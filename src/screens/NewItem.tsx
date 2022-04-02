import { StackScreenProps } from "@react-navigation/stack";
import { useContext, useState } from "react";
import { Image, View } from "react-native";
import { Button, FAB, HelperText, TextInput } from "react-native-paper";
import { Item, navigationProps, Web3Context } from "../util";
import * as ImagePicker from "expo-image-picker";
import FABs from "../components/ActionButtons";
import { uploadFile } from "../web3/IPFS";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import greeterInfo from "../contractData/GreeterInfo";

export const NewItem = ({
  route,
  navigation,
}: StackScreenProps<navigationProps, "YourItems">) => {
  const [item, setItem] = useState({} as Item);
  const [error, setError] = useState("");
  const web3 = useContext(Web3Context);
  const connector = useWalletConnect();

  async function listNewItem() {
    const address = connector.accounts[0];
    console.log(address);
    const data = web3.eth.abi.encodeFunctionCall(
      {
        name: "setGreeting",
        type: "function",
        inputs: [
          {
            type: "string",
            name: "_greeting",
          },
        ],
      },
      ["Writing from WITHIN!!!"]
    );

    const estimatedGas = await web3.eth.estimateGas({
      from: address,
      to: greeterInfo.address,
      data: data,
    });

    console.log("Estimated Gas: " + estimatedGas);

    const txHash = await connector.sendTransaction({
      from: address,
      to: greeterInfo.address,
      gas: estimatedGas,
      gasPrice: estimatedGas + estimatedGas * 0.1,
      value: "0x00",
      data: data,
      nonce: await web3.eth.getTransactionCount(greeterInfo.address),
    });

    console.log("TX: ");
    console.log(txHash);

    if (!item.title || !item.description || !item.ipfshash || !item.price) {
      setError("Not everything filled out.");
      return;
    }
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
          value={item.title}
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
          value={item.title}
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
