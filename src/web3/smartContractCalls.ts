import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useContext } from "react";
import { Item, Web3Context } from "../util";
import marketplaceInfo from "../contractData/MarketplaceInfo";
import { AbiItem } from "web3-utils";
import Web3 from "web3";
import cUSD from "../contractData/cUSD";
function decodeStatus(status: number) {
  return status == 0
    ? "AVAILABLE"
    : status == 1
    ? "SOLD"
    : status == 2
    ? "RECEIVED"
    : "INACTIVE";
}
export async function getItems(web3: Web3) {
  const contract = new web3.eth.Contract(
    marketplaceInfo.abi as AbiItem[],
    marketplaceInfo.address
  );
  let items = (await contract.methods.getListings().call()) as Item[];
  items = items.map((item) => {
    return {
      ...item,
      status: decodeStatus((item.status as unknown) as number),
    };
  });
  console.log("Received Items", items);
  return items;
}
export async function getBuyersItems(web3: Web3) {
  const contract = new web3.eth.Contract(
    marketplaceInfo.abi as AbiItem[],
    marketplaceInfo.address
  );
  let items = (await contract.methods.getUserListings().call()) as Item[];
  items = items.map((item) => {
    return {
      ...item,
      status: decodeStatus((item.status as unknown) as number),
    };
  });
  console.log("Received Items", items);
  return items;
}
export async function buyItem(
  web3: Web3,
  connector: any,
  id: string,
  address: string,
  itemValue: number
) {
  const resp = await approveFunds(web3, connector, address, 2 * itemValue);
  return await callFunctionWithId("purchase", web3, connector, id, address);
}
export async function receivedItem(
  web3: Web3,
  connector: any,
  id: string,
  address: string
) {
  return await callFunctionWithId(
    "releaseEscrow",
    web3,
    connector,
    id,
    address
  );
}
export async function removeItem(
  web3: Web3,
  connector: any,
  id: string,
  address: string
) {
  return await callFunctionWithId(
    "deactivateListing",
    web3,
    connector,
    id,
    address
  );
}
async function callFunctionWithId(
  functionName: string,
  web3: Web3,
  connector: any,
  id: string,
  address: string
) {
  const data = web3.eth.abi.encodeFunctionCall(
    {
      name: functionName,
      type: "function",
      inputs: [
        {
          type: "uint256",
          name: "listingId",
        },
      ],
    },
    [id]
  );
  const estimatedGas = await web3.eth.estimateGas({
    from: address,
    to: marketplaceInfo.address,
    data: data,
  });
  const txHash = await connector.sendTransaction({
    from: address,
    to: marketplaceInfo.address,
    gas: estimatedGas,
    gasPrice: estimatedGas + estimatedGas * 0.1,
    value: "0x00",
    data: data,
    nonce: await web3.eth.getTransactionCount(marketplaceInfo.address),
  });
  return;
}
export async function listItem(
  web3: Web3,
  connector: any,
  address: string,
  item: Item
) {
  const resp = await approveFunds(web3, connector, address, item.price * 2);
  console.log("Before calls");
  console.log("item", item);
  const data = web3.eth.abi.encodeFunctionSignature({
    name: 'newItem',
    type: 'function',
    inputs: [{
        type: 'uint256',
        name: 'myNumber'
    },{
        type: 'string',
        name: 'myString'
    }]
})
      ],
    },
    [item.title, item.description, item.price.toString(), item.ipfshash]
  );
  console.log("data", data);
  /*const estimatedGas = await web3.eth.estimateGas({
    from: address,
    to: marketplaceInfo.address,
    data: data,
  });*/
  //console.log("estimatedGas", estimatedGas);
  //console.log("Estimated Gas: " + estimatedGas);

  const txHash = await connector.sendTransaction({
    from: address,
    to: marketplaceInfo.address,
    gas: 1000000000000, //estimatedGas//
    gasPrice: 1000000000000, //estimatedGas + estimatedGas * 0.1,
    value: "0x00",
    data: data,
    nonce: await web3.eth.getTransactionCount(marketplaceInfo.address),
  });

  console.log("TX: ");
  console.log(txHash);
  return;
}
async function approveFunds(
  web3: Web3,
  connector: any,
  spender: string,
  amount: number
) {
  console.log("spender", spender);
  console.log("amount", amount);
  const data = web3.eth.abi.encodeFunctionCall(
    {
      name: "approve",
      type: "function",
      inputs: [
        {
          type: "address",
          name: "spender",
        },
        {
          type: "uint256",
          name: "amount",
        },
      ],
    },
    [spender, amount.toString()]
  );
  console.log("data", data);
  const estimatedGas = await web3.eth.estimateGas({
    from: spender,
    to: cUSD.address,
    data: data,
  });
  console.log("gas", estimatedGas);
  const txHash = await connector.sendTransaction({
    from: spender,
    to: cUSD.address,
    gas: estimatedGas,
    gasPrice: estimatedGas + estimatedGas * 0.1,
    value: "0x00",
    data: data,
    nonce: await web3.eth.getTransactionCount(cUSD.address),
  });
  console.log("approve funds", txHash);
  return;
}
