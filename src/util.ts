import { createContext } from "react";
import Web3 from "web3";

export const DesktopContext = createContext(false);
export const Web3Context = createContext({} as Web3);

export interface Item {
  itemId: string;
  description: string;
  ipfshash: string;
  title: string;
  price: number;
  seller: string;
  status: "AVAILABLE" | "SOLD" | "RECEIVED" | "INACTIVE";
  createdOn: number;
}
export type navigationProps = {
  ItemList: undefined;
  NewItem: undefined;
  YourItems: undefined;
  BoughtItems: undefined;
};
