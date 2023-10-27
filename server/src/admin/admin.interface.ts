import { Document, ObjectId } from 'mongoose';
import {
  EProductCategory,
  EProductColor,
  EProductType,
  EProductTypeSize,
} from 'src/common/enum/product.enum';
import { IReturns } from 'src/common/interface/returns.interface';

/*------ body service interface ------*/

export interface IProductAdmin {
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

export interface IUpdateProduct {
  id: ObjectId;
  spreaderWages?: number;
  shopkeeperWages?: number;
  wholesalerWages?: number;
  housewifeWages?: number;
  tags?: string;
  details?: string;
}


/*------ model interface ------*/

export interface IProductModel extends Document {
  readonly name: string;
  readonly minWeight: number;
  readonly maxWeight: number;
  readonly spreaderWages: number;
  readonly shopkeeperWages: number;
  readonly wholesalerWages: number;
  readonly housewifeWages: number;
  readonly color: EProductColor;
  readonly type: EProductType;
  readonly stone: string;
  readonly category: EProductCategory;
  readonly size: number;
  readonly typeSize: EProductTypeSize;
  readonly details: string;
  readonly tags: Array<string>;
  readonly path: string;
}

export interface IFileModel extends Document {
  readonly path: string;
}

/*------ returns ------*/

export interface IReturnUploadImage extends IReturns {
  message: string;
  data?: { path: string };
}

export interface IReturnDeleteProduct extends IReturns {
  message: string;
}

export interface IReturnCreateProduct extends IReturns {
  message: string;
}

export interface IReturnUpdateProduct extends IReturns {
  message: string;
}

export interface IReturnListUploadedImageProduct extends IReturns {
  message: string;
  data: string[];
}
