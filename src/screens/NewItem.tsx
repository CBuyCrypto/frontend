import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";
import { Image, View } from "react-native";
import { Button, FAB, HelperText, TextInput } from "react-native-paper";
import { Item, navigationProps } from "../util";
import * as ImagePicker from "expo-image-picker";
import FABs from "../components/ActionButtons";

export const NewItem = ({
  route,
  navigation,
}: StackScreenProps<navigationProps, "YourItems">) => {
  const [item, setItem] = useState({} as Item);
  const [error, setError] = useState("");
  async function listNewItem() {
    //IMPLEMENT HERE
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
              height: 30,
            }}
            source={{ uri: "https://ipfs.io/ipfs/" + item.ipfshash }}
          />
        )}
        <Button
          onPress={() =>
            ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
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
