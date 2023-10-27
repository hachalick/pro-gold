import {
  EProductCategory,
  EProductColor,
  EProductType,
  EProductTypeSize,
} from "@/enum/product.enum";

export interface IProductAdmin {
  _id: string;
  name: string;
  minWeight: number;
  maxWeight: number;
  spreaderWages: number;
  shopkeeperWages: number;
  wholesalerWages: number;
  housewifeWages: number;
  color: EProductColor;
  type: EProductType;
  stone: string;
  category: EProductCategory;
  size: number;
  typeSize: EProductTypeSize;
  details: string;
  tags: string;
  path: string;
}

export interface IProduct {
  _id: string;
  name: string;
  minWeight: number;
  maxWeight: number;
  wage: number;
  color: EProductColor;
  type: EProductType;
  stone: string;
  category: EProductCategory;
  size: number;
  typeSize: EProductTypeSize;
  details: string;
  tags: string;
  path: string;
}

export interface IClientProduct {
  name: string;
  minWeight: string;
  maxWeight: string;
  shopkeeperWages: string;
  wholesalerWages: string;
  housewifeWages: string;
  spreaderWages: string;
  color: string;
  type: string;
  stone: string;
  category: string;
  size: string;
  typeSize: string;
  tags: string,
  details: string;
  path: string;
}


export interface IShowCategory {
  EARRING: boolean;
  CHAIN: boolean;
  PENDANT: boolean;
  BRACELET: boolean;
  RING: boolean;
  WATCH_PENDING: boolean;
  HALF_SET: boolean;
  SET: boolean;
  PIERCING: boolean;
  ANKLE: boolean;
  BROOCH: boolean;
}