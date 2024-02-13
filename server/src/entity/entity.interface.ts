export interface SQL_USER {
  user_id: number;
  mobile: string;
  mobile_code: string;
  name: string;
  family: string;
  password: string;
  profile: number;
  path: string;
  mime_type: string;
  file_type: string;
  birth_date: Date | null;
  city_code: string | null;
  address: string | null;
  email: string | null;
  role_type: string;
  manager: SQL_MANAGER_USERS[];
}

export interface SQL_OTP {
  mobile: string;
  mobile_code: string;
  otp: string;
  expires: Date;
  isUsed: number;
}

export interface SQL_FILE {
  file_id: number;
  path: string;
  name: string;
  mime_type: string;
  file_type: string;
}

export interface SQL_PRODUCT {
  product_id: number;
  weight: number;
  coefficient_variation: number;
  title: string;
  meta_description: string;
  description: string;
  isAvailable: number;
  can_order: number;
  metal_type: string;
  product_type: string;
  category_type: string;
}

export interface SQL_IMAGE_PRODUCT {
  product_id: number;
  size: number;
  path: string;
  name: string;
  mime_type: string;
  file_type: string;
  unit_type: string;
  color_type: string;
}

export interface SQL_WAGES_PRODUCT {
  product_id: number;
  wages_type_id: number;
  user_is: number;
  wages: number;
  wages_type: string;
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
}

export interface SQL_MANAGER_USERS {
  manager_type: string;
  responsibility: string;
}

export interface SQL_WAGES_TYPE {
  wages_type_id: number;
  wages_type: string;
}

export interface SQL_WAGES_METAL {
  product_id: number;
  wages_type_id: number;
  user_id: number;
  for_role: number;
  wages: number;
}

export interface SQL_COLOR_TYPE {
  color_type_id: number;
  color_type: string;
}

export interface SQL_UNIT_TYPE {
  unit_type_id: number;
  unit_type: string;
}

export interface SQL_METAL_TYPE {
  metal_type_id: number;
  metal_type: string;
}

export interface SQL_CATEGORY_TYPE {
  category_type_id: number;
  category_type: string;
}

export interface SQL_PRODUCT_TYPE {
  product_type_id: number;
  product_type: string;
}

export interface SQL_ROLE_TYPE {
  role_type_id: number;
  role_type: string;
}

export interface SQL_IMAGES_PRODUCT {
  product_id: number;
  file_id: string;
  color_type_id: string;
  unit_type_id: string;
  size_x: string | null;
  size_y: string | null;
}

export interface SQL_FILE_TYPE {
  file_id: number;
  file_type_id: number;
  name: string;
  path: string;
  domain: string;
}

