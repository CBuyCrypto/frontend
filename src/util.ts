import { createContext } from "react";

export const DesktopContext = createContext(false);

export interface Item {
  id: string;
  description: string;
  ipfshash: string;
  title: string;
  price: number;
  seller: string;
  status: "AVAILABLE" | "SOLD" | "RECEIVED" | "INACTIVE";
}
export type navigationProps = {
  ItemList: undefined;
  NewItem: undefined;
  YourItems: undefined;
  BoughtItems: undefined;
};
