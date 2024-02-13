import {
  EProductCategory,
  EProductColor,
  EProductType,
  EProductTypeSize,
} from 'src/common/enum/product.enum';

export interface IAccurateSearchProducts {
  name?: string;
  color?: EProductColor;
  type?: EProductType;
  stone?: string;
  category?: EProductCategory;
  details?: string;
  tags?: string;
}

export interface ICreateProduct {
  category_type_id: number;
  weight: number;
  coefficient_variation: number;
  title: string;
  meta_description: string;
  description: string;
  isAvailable: number;
  can_order: number;
  product_type_id: number;
  metal_type_id: number;
  images: {
    file_id: number;
    color_type_id: number;
    unit_type_id: number;
    size_x?: number;
    size_y?: number;
  }[];
  wages: {
    wages: number;
    wages_type_id: number;
    for_role: number;
  }[];
}

export interface IUpdateProduct {
  product_id: number;
  category_type_id?: number;
  wages?: number;
  coefficient_variation?: number;
  title?: string;
  meta_description?: string;
  description?: string;
  isAvailable?: number;
  can_order?: number;
  product_type_id?: number;
  metal_type_id?: number;
}

export interface IUpdateWages {
  product_id: number;
  for_role: number;
  wages_type_id: number;
  wages: number;
}

export interface IUpdateImageProduct {
  product_id: number;
  target: {
    file_id: number;
    color_type_id: number;
    unit_type_id: number;
    size_x?: number;
    size_y?: number;
  };
  modify: {
    file_id: number;
    color_type_id: number;
    unit_type_id: number;
    size_x?: number;
    size_y?: number;
  };
}

export interface ICreateFile {
  file_type_id: number;
  name: string;
  path: string;
  domain: string;
}

export interface ICreateWages {
  wages: number;
  wages_type_id: number;
  for_role: number;
  product_id: number;
}

export interface IDeleteWages {
  wages_type_id: number;
  for_role: number;
  product_id: number;
}

export interface IDeleteImages {
  color_type_id: number;
  file_id: number;
  product_id: number;
  unit_type_id: number;
}
