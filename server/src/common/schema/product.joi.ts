import { CreateProductDto } from 'src/admin/admin';
import * as Joi from 'joi';

/*------ body controller joi ------*/

export const createProductSchema = Joi.object<CreateProductDto>({
  category_type_id: Joi.number()
    .min(1)
    .integer()
    .required()
    .messages({ 'any.required': 'فیلد کد دسته بندی وجود ندارد' }),
  weight: Joi.number()
    .min(0)
    .required()
    .messages({ 'any.required': 'فیلد وزن وجود ندارد' }),
  coefficient_variation: Joi.number()
    .min(0)
    .required()
    .messages({ 'any.required': 'فیلد ضریب خطا وجود ندارد' }),
  title: Joi.string()
    .min(1)
    .max(70)
    .required()
    .messages({ 'any.required': 'فیلد نام وجود ندارد' }),
  meta_description: Joi.string()
    .min(0)
    .required()
    .messages({ 'any.required': 'فیلد توضیح متا تگ وجود ندارد' }),
  description: Joi.string()
    .min(0)
    .required()
    .messages({ 'any.required': 'فیلد توضیح وجود ندارد' }),
  isAvailable: Joi.number()
    .min(0)
    .max(1)
    .required()
    .messages({ 'any.required': 'فیلد موجود بودن وجود ندارد' }),
  can_order: Joi.number()
    .min(0)
    .max(1)
    .required()
    .messages({ 'any.required': 'فیلد قابل سفارش وجود ندارد' }),
  product_type_id: Joi.number()
    .min(1)
    .integer()
    .required()
    .messages({ 'any.required': 'فیلد کد نوع محصول وجود ندارد' }),
  metal_type_id: Joi.number()
    .min(1)
    .integer()
    .required()
    .messages({ 'any.required': 'فیلد کد نوع فلز وجود ندارد' }),
  images: Joi.array()
    .items(
      Joi.object({
        file_id: Joi.number()
          .min(1)
          .integer()
          .required()
          .messages({ 'any.required': 'فیلد کد فایل وجود ندارد' }),
        color_type_id: Joi.number()
          .min(1)
          .integer()
          .required()
          .messages({ 'any.required': 'فیلد کد نوع رنگ وجود ندارد' }),
        unit_type_id: Joi.number()
          .min(1)
          .integer()
          .required()
          .messages({ 'any.required': 'فیلد کد نوع اندازه گیری وجود ندارد' }),
        size_x: Joi.number().min(0),
        size_y: Joi.number().min(0),
      }),
    )
    .required()
    .messages({ 'any.required': 'فیلد لیست عکس وجود ندارد' }),
  wages: Joi.array()
    .items(
      Joi.object({
        wages: Joi.number()
          .min(0)
          .required()
          .messages({ 'any.required': 'فیلد اجرت وجود ندارد' }),
        wages_type_id: Joi.number()
          .min(1)
          .integer()
          .required()
          .messages({ 'any.required': 'فیلد کد نوع اجرت وجود ندارد' }),
        for_role: Joi.number()
          .min(1)
          .integer()
          .required()
          .messages({ 'any.required': 'فیلد کد نوع اجرت وجود ندارد' }),
      }),
    )
    .required()
    .messages({ 'any.required': 'فیلد لیست اجرت وجود ندارد' }),
});

export const updateProductSchema = Joi.object({
  product_id: Joi.number()
    .min(1)
    .integer()
    .required()
    .messages({ 'any.required': 'فیلد کد محصول وجود ندارد' }),
  category_type_id: Joi.number().min(1).integer(),
  weight: Joi.number().min(0),
  coefficient_variation: Joi.number().min(0),
  title: Joi.string().min(1).max(70),
  meta_description: Joi.string().min(0),
  description: Joi.string().min(0),
  isAvailable: Joi.number().min(0).max(1).integer(),
  can_order: Joi.number().min(0).max(1).integer(),
  product_type_id: Joi.number().min(1).integer(),
  metal_type_id: Joi.number().min(1).integer(),
});

export const updateWagesSchema = Joi.array().items(
  Joi.object({
    for_role: Joi.number()
      .min(1)
      .integer()
      .required()
      .messages({ 'any.required': 'فیلد کد نوع اجرت وجود ندارد' }),
    product_id: Joi.number()
      .min(1)
      .integer()
      .required()
      .messages({ 'any.required': 'فیلد کد محصول وجود ندارد' }),
    wages_type_id: Joi.number()
      .min(1)
      .integer()
      .required()
      .messages({ 'any.required': 'فیلد کد نوع اجرت وجود ندارد' }),
    wages: Joi.number()
      .min(0)
      .required()
      .messages({ 'any.required': 'فیلد اجرت وجود ندارد' }),
  }),
);

export const updateImageProductSchema = Joi.object({
  product_id: Joi.number()
    .min(1)
    .integer()
    .required()
    .messages({ 'any.required': 'فیلد کد محصول وجود ندارد' }),
  target: Joi.object({
    file_id: Joi.number()
      .min(1)
      .integer()
      .required()
      .messages({ 'any.required': 'فیلد کد فایل وجود ندارد' }),
    color_type_id: Joi.number()
      .min(1)
      .integer()
      .required()
      .messages({ 'any.required': 'فیلد کد نوع رنگ وجود ندارد' }),
    unit_type_id: Joi.number()
      .min(1)
      .integer()
      .required()
      .messages({ 'any.required': 'فیلد کد نوع اندازه گیری وجود ندارد' }),
    size_x: Joi.number().min(0).allow(null),
    size_y: Joi.number().min(0).allow(null),
  }),
  modify: Joi.object({
    file_id: Joi.number()
      .min(1)
      .integer()
      .required()
      .messages({ 'any.required': 'فیلد کد فایل وجود ندارد' }),
    color_type_id: Joi.number()
      .min(1)
      .integer()
      .required()
      .messages({ 'any.required': 'فیلد کد نوع رنگ وجود ندارد' }),
    unit_type_id: Joi.number()
      .min(1)
      .integer()
      .required()
      .messages({ 'any.required': 'فیلد کد نوع اندازه گیری وجود ندارد' }),
    size_x: Joi.number().min(0).allow(null),
    size_y: Joi.number().min(0).allow(null),
  }),
});

export const createFilesSchema = Joi.array().items(
  Joi.object({
    name: Joi.string().min(0),
    path: Joi.string().min(0),
    domain: Joi.string().min(0).max(120),
    file_type_id: Joi.number().integer().min(1),
  }),
);

export const createWagesSchema = Joi.array().items(
  Joi.object({
    product_id: Joi.number()
      .min(1)
      .integer()
      .required()
      .messages({ 'any.required': 'فیلد کد محصول وجود ندارد' }),
    wages: Joi.number()
      .min(0)
      .required()
      .messages({ 'any.required': 'فیلد اجرت وجود ندارد' }),
    wages_type_id: Joi.number()
      .min(1)
      .integer()
      .required()
      .messages({ 'any.required': 'فیلد کد نوع اجرت وجود ندارد' }),
    for_role: Joi.number()
      .min(1)
      .integer()
      .required()
      .messages({ 'any.required': 'فیلد کد نوع اجرت وجود ندارد' }),
  }),
);

export const deleteWagesSchema = Joi.array().items(
  Joi.object({
    product_id: Joi.number()
      .min(1)
      .integer()
      .required()
      .messages({ 'any.required': 'فیلد کد محصول وجود ندارد' }),
    wages_type_id: Joi.number()
      .min(1)
      .integer()
      .required()
      .messages({ 'any.required': 'فیلد کد نوع اجرت وجود ندارد' }),
    for_role: Joi.number()
      .min(1)
      .integer()
      .required()
      .messages({ 'any.required': 'فیلد کد نوع اجرت وجود ندارد' }),
  }),
);

export const deleteImagesSchema = Joi.array().items(
  Joi.object({
    product_id: Joi.number()
      .min(1)
      .integer()
      .required()
      .messages({ 'any.required': 'فیلد کد محصول وجود ندارد' }),
    file_id: Joi.number()
      .min(1)
      .integer()
      .required()
      .messages({ 'any.required': 'فیلد کد فایل وجود ندارد' }),
    color_type_id: Joi.number()
      .min(1)
      .integer()
      .required()
      .messages({ 'any.required': 'فیلد کد نوع رنگ وجود ندارد' }),
    unit_type_id: Joi.number()
      .min(1)
      .integer()
      .required()
      .messages({ 'any.required': 'فیلد کد نوع اندازه گیری وجود ندارد' }),
  }),
);
