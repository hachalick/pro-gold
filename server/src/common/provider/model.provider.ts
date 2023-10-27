import { Mongoose } from 'mongoose';
import { UserSchema } from '../schema/user.schema';
import { CreateProductSchema } from '../schema/product.schema';
import { FileSchema } from '../schema/file.schema';

export const userProvider = [
  {
    provide: 'USER_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('user', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

export const productProvider = [
  {
    provide: 'PRODUCT_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('product', CreateProductSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

export const fileProvider = [
  {
    provide: 'FILE_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('file', FileSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
