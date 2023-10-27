import { EProductCategory, EProductColor, EProductType, EProductTypeSize } from "src/common/enum/product.enum";
  
export interface IAccurateSearchProducts {
    name?: string;
    color?: EProductColor;
    type?: EProductType;
    stone?: string;
    category?: EProductCategory;
    details?: string;
    tags?: string;
  }
  