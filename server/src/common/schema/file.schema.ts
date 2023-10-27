import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

/*------ schema file mongodb ------*/

@Schema()
export class File {
  @Prop({ required: false })
  path: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
export type TypeFileSchema = HydratedDocument<File>;
