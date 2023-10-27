import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ILogin, IOtp, IOtpModel } from './viewer.interface';
import { Model } from 'mongoose';
import { IUserModel } from 'src/common/interface/user.interface';
import { number } from 'joi';

// @Injectable()
// export class ViewerGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     return true;
//   }
// }

/*------ guard send otp ------*/

@Injectable()
export class OtpGuard implements CanActivate {
  constructor(
    @Inject('OTP_MODEL') private readonly otpModel: Model<IOtpModel>,
    @Inject('USER_MODEL') private readonly userModel: Model<IUserModel>,
  ) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const otpBody: IOtp = request.body;
    const existingOtp = await this.otpModel.findOne({ mobile: otpBody.mobile });
    if (existingOtp) {
      const timestamp = existingOtp.expires - new Date().getTime();
      if (timestamp >= 0) {
        throw new HttpException('درخواست کد زودتر از حد مجاز است', HttpStatus.FORBIDDEN);
      }
    }
    return true;
  }
}

/*------ guard login ------*/

export class LoginGuard implements CanActivate {
  constructor(
    @Inject('OTP_MODEL') private readonly otpModel: Model<IOtpModel>,
    @Inject('USER_MODEL') private readonly userModel: Model<IUserModel>,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { mobile, otp, name, password }: ILogin = request.body;
    if (!mobile || !otp) return true;
    const existingOtp = await this.otpModel.findOne({ mobile });
    if (!existingOtp) {
      throw new HttpException('کاربری یافت نشد', HttpStatus.NOT_FOUND);
    }
    else if (existingOtp.otp !== otp) {
      await this.otpModel.deleteOne({ mobile })
      throw new HttpException('کد احراز هویت صحیح نیست', HttpStatus.NOT_FOUND);
    }
    const existingUser = await this.userModel.findOne({ mobile });
    if (!((existingUser && !name && !password) || (!existingUser && name && password))) {
      await this.otpModel.deleteOne({ mobile })
      throw new HttpException('مشخصات صحیح نیست', HttpStatus.BAD_REQUEST);
    }
    await this.otpModel.deleteOne({ mobile })
    return true;
  }
}
