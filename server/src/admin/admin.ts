/*------ body controller interface ------*/

import { ObjectId } from 'mongoose';
import {
  EProductCategory,
  EProductColor,
  EProductType,
  EProductTypeSize,
} from 'src/common/enum/product.enum';

export class CreateProductDto {
  readonly name: string;
  readonly minWeight: number;
  readonly maxWeight: number;
  readonly shopkeeperWages: number;
  readonly spreaderWages: number;
  readonly wholesalerWages: number;
  readonly housewifeWages: number;
  readonly color: EProductColor;
  readonly type: EProductType;
  readonly stone: string;
  readonly category: EProductCategory;
  readonly size: number;
  readonly typeSize: EProductTypeSize;
  readonly details: string;
  readonly tags: string;
  readonly path: string;
}

export interface UpdateProductDto {
  readonly id: ObjectId;
  readonly spreaderWages?: number;
  readonly shopkeeperWages?: number;
  readonly wholesalerWages?: number;
  readonly housewifeWages?: number;
  readonly tags?: string;
  readonly details?: string;
}
