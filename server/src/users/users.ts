import { EProductCategory, EProductColor, EProductType } from "src/common/enum/product.enum";

export class Users {}

export interface AccurateSearchProductsDto {
    readonly name?: string;
    readonly color?: EProductColor;
    readonly type?: EProductType;
    readonly stone?: string;
    readonly category?: EProductCategory;
    readonly details?: string;
    readonly tags?: string;
  }
  