import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PanelEnum, RolesEnum } from 'src/common/enum/role.enum';
import { GenderEnum } from 'src/common/enum/gender.enum';

/*------ schema user mongodb ------*/

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  mobile: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: '' })
  province: string;

  @Prop({ default: '' })
  city: string;

  @Prop({ default: '' })
  birthDate: string;

  @Prop({ default: '' })
  address: string;

  @Prop({ default: RolesEnum.HOUSE_WIFE })
  role: RolesEnum;

  @Prop({ default: PanelEnum.MEMBER })
  panel: PanelEnum;

  @Prop({ default: new Date(), immutable: true })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type TypeUserSchema = HydratedDocument<User>;