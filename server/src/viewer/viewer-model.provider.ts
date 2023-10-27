import { Mongoose } from 'mongoose';
import { OtpSchema } from './viewer.schema';

export const otpProvider = [
  {
    provide: 'OTP_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('otp', OtpSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
