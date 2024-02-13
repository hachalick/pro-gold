import {
  EProductCategory,
  EProductColor,
  EProductType,
  EProductTypeSize,
} from 'src/common/enum/product.enum';
import { IReturns } from 'src/common/interface/returns.interface';
import { SQL_FILE } from 'src/entity/entity.interface';

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
  data: SQL_FILE[];
}
