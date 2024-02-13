/*------ body controller interface ------*/

export class CreateProductDto {
  readonly category_type_id: number;
  readonly weight: number;
  readonly coefficient_variation: number;
  readonly title: string;
  readonly meta_description: string;
  readonly description: string;
  readonly isAvailable: number;
  readonly can_order: number;
  readonly product_type_id: number;
  readonly metal_type_id: number;
  readonly images: {
    readonly file_id: number;
    readonly color_type_id: number;
    readonly unit_type_id: number;
    readonly size_x: number;
    readonly size_y: number;
  }[];
  readonly wages: {
    readonly wages: number;
    readonly wages_type_id: number;
    readonly for_role: number;
  }[];
}

export interface UpdateProductDto {
  readonly product_id: number;
  readonly category_type_id?: number;
  readonly weight?: number;
  readonly coefficient_variation?: number;
  readonly title?: string;
  readonly meta_description?: string;
  readonly description?: string;
  readonly isAvailable?: number;
  readonly can_order?: number;
  readonly product_type_id?: number;
  readonly metal_type_id?: number;
}

export interface UpdateWagesDto {
  readonly product_id: number;
  readonly for_role: number;
  readonly wages_type_id: number;
  readonly wages: number;
}

export interface DeleteWagesDto {
  readonly product_id: number;
  readonly for_role: number;
  readonly wages_type_id: number;
}

export interface DeleteImagesDto {
  readonly product_id: number;
  readonly file_id: number;
  readonly color_type_id: number;
  readonly unit_type_id: number;
}

export interface CreateWagesDto {
  readonly wages: number;
  readonly wages_type_id: number;
  readonly for_role: number;
  readonly product_id: number;
}

export interface UpdateImageProductDto {
  readonly product_id: number;
  readonly target: {
    readonly file_id: number;
    readonly color_type_id: number;
    readonly unit_type_id: number;
    readonly size_x?: number;
    readonly size_y?: number;
  };
  readonly modify: {
    readonly file_id: number;
    readonly color_type_id: number;
    readonly unit_type_id: number;
    readonly size_x?: number;
    readonly size_y?: number;
  };
}

export interface CreateFileDto {
  readonly file_type_id: number;
  readonly name: string;
  readonly path: string;
  readonly domain: string;
}
