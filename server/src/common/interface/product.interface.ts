import {
  EProductCategory,
  EProductColor,
  EProductType,
  EProductTypeSize,
} from '../enum/product.enum';

export interface IProduct {
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