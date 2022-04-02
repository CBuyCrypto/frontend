import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
//@ts-ignore
import abiDecoder from "abi-decoder";
import { useWalletConnect } from "@walletconnect/react-native-dapp";

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
};

const contractAddress = "";

export default function Home() {
  const connector = useWalletConnect();

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  const contractCall = React.useCallback(() => {
    console.log("here");
    return connector.signTransaction({
      from: String(connector.accounts[0]), // Required
      to: "0x5AD22f3d353Ee97c041d5f504b1e77e2C766F3d2", // Required
      //gas: "string", // Required
      //gasPrice: "string", // Required
      //value: "string", // Required
      data: "0xcfae3217", // Required
      //nonce: "string", // Required
    });
  }, [connector]);

  function testing() {
    console.log("hi", abiDecoder);
    const testABI = [
      {
        inputs: [{ type: "address", name: "" }],
        constant: true,
        name: "isInstantiation",
        payable: false,
        outputs: [{ type: "bool", name: "" }],
        type: "function",
      },
      {
        inputs: [
          { type: "address[]", name: "_owners" },
          { type: "uint256", name: "_required" },
          { type: "uint256", name: "_dailyLimit" },
        ],
        constant: false,
        name: "create",
        payable: false,
        outputs: [{ type: "address", name: "wallet" }],
        type: "function",
      },
      {
        inputs: [
          { type: "address", name: "" },
          { type: "uint256", name: "" },
        ],
        constant: true,
        name: "instantiations",
        payable: false,
        outputs: [{ type: "address", name: "" }],
        type: "function",
      },
      {
        inputs: [{ type: "address", name: "creator" }],
        constant: true,
        name: "getInstantiationCount",
        payable: false,
        outputs: [{ type: "uint256", name: "" }],
        type: "function",
      },
      {
        inputs: [
          { indexed: false, type: "address", name: "sender" },
          { indexed: false, type: "address", name: "instantiation" },
        ],
        type: "event",
        name: "ContractInstantiation",
        anonymous: false,
      },
    ];
    abiDecoder.addABI(testABI);
    const testData =
      "0x53d9d9100000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a6d9c5f7d4de3cef51ad3b7235d79ccc95114de5000000000000000000000000a6d9c5f7d4de3cef51ad3b7235d79ccc95114daa";
    const decodedData = abiDecoder.decodeMethod(testData);
    console.log(decodedData);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {!connector.connected && (
        <TouchableOpacity onPress={connectWallet} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Connect a Wallet</Text>
        </TouchableOpacity>
      )}
      {!!connector.connected && (
        <>
          <Text>{shortenAddress(connector.accounts[0])}</Text>
          <TouchableOpacity onPress={testing} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Contract Call</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={killSession} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Log out</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonStyle: {
    backgroundColor: "#3399FF",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#3399FF",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: "600",
  },
});
