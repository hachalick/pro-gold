import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { HydratedDocument } from 'mongoose';

/*------ body controller joi ------*/

export const otpSchema = Joi.object({
  mobile: Joi.string()
    .trim()
    .length(11)
    .message('تعداد اعداد 11 نیست')
    .pattern(/^09[0-9]{9}$/)
    .message('شکل شماره اشتباه است')
    .required()
    .messages({ 'any.required': 'فیلد موبایل وجود ندارد' }),
});

export const loginSchema = Joi.object({
  mobile: Joi.string()
    .trim()
    .length(11)
    .message('تعداد اعداد 11 نیست')
    .pattern(/^09[0-9]{9}$/)
    .message('شکل شماره اشتباه است')
    .required()
    .messages({ 'any.required': 'فیلد موبایل وجود ندارد' }),

  otp: Joi.string()
    .trim()
    .length(6)
    .message('تعداد اعداد صحیح نمی باشد')
    .pattern(/^[0-9]{6}$/)
    .message('محتوا ارسالی صحیح نمی باشد')
    .required()
    .messages({ 'any.required': 'فیلد کد احراز هویت وجود ندارد' }),

  password: Joi.string()
    .trim()
    .min(3)
    .message('رمز کمتر از ۳ حرف پذیرفته نیست')
    .max(35)
    .message('رمز بیشتر از ۳۵ حرف پذیرفته نیست')
    .pattern(/^([a-z]|[A-Z])(\w|#|&|%|@|\$){5,}$/)
    .message('فرمت رمز عبور صحیح نیست'),

  name: Joi.string()
    .trim()
    .min(2)
    .message('نام کمتر از ۲ حرف پذیرفته نیست')
    .max(35)
    .message('نام بیشتر از ۳۵ حرف پذیرفته نیست')
    .pattern(/[\u0600-\u06FF]{2,35}/)
    .message('فیلد کد نام صحیح نیست')
})

export const canSignUpSchema = Joi.object({
  mobile: Joi.string()
    .trim()
    .length(11)
    .message('تعداد اعداد 11 نیست')
    .pattern(/^09[0-9]{9}$/)
    .message('شکل شماره اشتباه است')
    .required()
    .messages({ 'any.required': 'فیلد موبایل وجود ندارد' }),
});

/*------ schema otp mongodb ------*/

@Schema()
export class Otp {
  @Prop({ required: true })
  mobile: string;

  @Prop({ required: true })
  otp: string;

  @Prop({ required: true })
  expires: number;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
export type TypeOtpSchema = HydratedDocument<Otp>;
