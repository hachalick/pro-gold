import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  EProductCategory,
  EProductColor,
  EProductType,
  EProductTypeSize,
} from '../enum/product.enum';
import * as Joi from 'joi';

/*------ body controller joi ------*/

export const createProductSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .message('نام کمتر از ۲ حرف پذیرفته نیست')
    .max(35)
    .message('نام بیشتر از ۳۵ حرف پذیرفته نیست')
    .required()
    .messages({ 'any.required': 'فیلد نام وجود ندارد' }),

  minWeight: Joi.number()
    .min(0)
    .message('وزن پایین کمتر از 0 پذیرفته نیست')
    .required()
    .messages({ 'any.required': 'فیلد وزن پایین وجود ندارد' }),

  maxWeight: Joi.number()
    .min(0)
    .message('وزن بالا کمتر از 0 پذیرفته نیست')
    .required()
    .messages({ 'any.required': 'فیلد وزن بالا وجود ندارد' }),

  spreaderWages: Joi.number()
    .min(0)
    .required()
    .messages({ 'any.required': 'فیلد اجرت پخش کننده وجود ندارد' }),

  shopkeeperWages: Joi.number()
    .min(0)
    .required()
    .messages({ 'any.required': 'فیلد اجرت مغازه دار وجود ندارد' }),

  wholesalerWages: Joi.number()
    .min(0)
    .required()
    .messages({ 'any.required': 'فیلد اجرت بنکدار وجود ندارد' }),

  housewifeWages: Joi.number()
    .min(0)
    .required()
    .messages({ 'any.required': 'فیلد اجرت خانگی وجود ندارد' }),

  color: Joi.string()
    .valid(...Object.values(EProductColor))
    .required()
    .messages({ 'any.required': 'فیلد رنگ وجود ندارد' }),

  type: Joi.string()
    .valid(...Object.values(EProductType))
    .required()
    .messages({ 'any.required': 'فیلد نوع کار وجود ندارد' }),

  stone: Joi.string()
    .min(2)
    .required()
    .messages({ 'any.required': 'فیلد سنگ وجود ندارد' }),

  category: Joi.string()
    .valid(...Object.values(EProductCategory))
    .required()
    .messages({ 'any.required': 'فیلد دسته بندی وجود ندارد' }),

  size: Joi.number().allow('').allow(null),

  typeSize: Joi.string().valid(...Object.values(EProductTypeSize)).allow(''),

  tags: Joi.string()
    .pattern(
      /^(#([a-zA-Z0-9\u0600-\u06FF]+_){0,}([a-zA-Z0-9\u0600-\u06FF]+)){0,}$/,
    )
    .allow(''),

  details: Joi.string().allow(''),

  path: Joi.string()
    .required()
    .messages({ 'any.required': 'فیلد نشانی عکس وجود ندارد' }),
});

export const updateProductSchema = Joi.object({
  id: Joi.string()
    .required()
    .messages({ 'any.required': 'شناسه محصول وجود ندارد' }),
  spreaderWages: Joi.number().min(0).allow('').optional(),
  shopkeeperWages: Joi.number().min(0).allow('').optional(),
  wholesalerWages: Joi.number().min(0).allow('').optional(),
  housewifeWages: Joi.number().min(0).allow('').optional(),
  tags: Joi.string()
    .pattern(
      /^(#([a-zA-Z0-9\u0600-\u06FF]+_){0,}([a-zA-Z0-9\u0600-\u06FF]+))+$/,
    )
    .allow('')
    .optional(),
  details: Joi.string(),
});

export const accurateSearchProductsSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .message('نام کمتر از ۲ حرف پذیرفته نیست')
    .max(35)
    .message('نام بیشتر از ۳۵ حرف پذیرفته نیست')
    .allow('')
    .optional(),

  color: Joi.string()
    .valid(...Object.values(EProductColor))
    .allow('')
    .optional(),

  type: Joi.string()
    .valid(...Object.values(EProductType))
    .allow('')
    .optional(),

  stone: Joi.string().min(2).allow('').optional(),

  category: Joi.string()
    .valid(...Object.values(EProductCategory))
    .allow('')
    .optional(),

  tags: Joi.string()
    .pattern(/^(#([a-zA-Z0-9]+_){0,}([a-zA-Z0-9]+))+$/)
    .allow('')
    .optional(),

  details: Joi.string().min(1).allow('').optional(),
});

/*------ schema product mongodb ------*/

@Schema()
export class CreateProduct {
  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  minWeight: number;

  @Prop({ required: false })
  maxWeight: number;

  @Prop({ required: false })
  spreaderWages: number;

  @Prop({ required: false })
  shopkeeperWages: number;

  @Prop({ required: false })
  wholesalerWages: number;

  @Prop({ required: false })
  housewifeWages: number;

  @Prop({ required: false })
  color: EProductColor;

  @Prop({ required: false })
  type: EProductType;

  @Prop({ required: false })
  stone: string;

  @Prop({ required: false })
  category: EProductCategory;

  @Prop({ required: false })
  size: number;

  @Prop({ required: false })
  typeSize: EProductTypeSize;

  @Prop({ required: false })
  details: string;

  @Prop({ required: false })
  tags: Array<string>;

  @Prop({ required: false })
  path: string;
}

export const CreateProductSchema = SchemaFactory.createForClass(CreateProduct);
export type TypeCreateProductSchema = HydratedDocument<CreateProduct>;
