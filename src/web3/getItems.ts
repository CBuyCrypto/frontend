import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useContext } from "react";
import { Web3Context } from "../util";
import marketplaceInfo from "../contractData/MarketplaceInfo";
import { AbiItem } from "web3-utils";


const web3 = useContext(Web3Context);

async function getItemIds(){
    const connector = useWalletConnect();
    const address = connector.accounts[0];
    console.log(address);

    const contract = new web3.eth.Contract(
      marketplaceInfo.abi as AbiItem[],
      marketplaceInfo.address
    );

    const listingIds = await contract.methods.getListings().call();
    console.log(listingIds);
    return listingIds;
}