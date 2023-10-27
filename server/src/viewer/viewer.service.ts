import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import {
  IOtpModel,
  IReturnOtp,
  IOtp,
  IReturnLogin,
  ILogin,
  ICanSignUp,
} from './viewer.interface';
import { createOtp, expiresMin, sendOtp } from 'src/utils/sms';
import { Model } from 'mongoose';
import { hashPass } from '../utils/hashing';
import { IUserModel } from '../common/interface/user.interface';
import { JwtService } from '@nestjs/jwt';
import { Jwt } from '../utils/jwt';
import { PanelEnum, RolesEnum } from 'src/common/enum/role.enum';

enum MessageLoginEnum {
  SU = 'ثبت نام انجام شد',
  SI = 'ورود انجام شد',
}

@Injectable()
export class ViewerService {
  constructor(
    @Inject('OTP_MODEL') private readonly otpModel: Model<IOtpModel>,
    @Inject('USER_MODEL') private readonly userModel: Model<IUserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async Otp(data: IOtp): Promise<IReturnOtp> {
    const returnMes: IReturnOtp = {
      message: 'کد یکبار مصرف ارسال شد',
      data: {
        expires: +process.env.EXPIRES_OTP,
        existing: false,
      },
    };
    const otp = createOtp(6);
    const expires = expiresMin(+process.env.EXPIRES_OTP);
    const existingOtp = await this.otpModel.findOne({ mobile: data.mobile });
    existingOtp
      ? await this.otpModel.updateOne({ mobile: data.mobile }, { expires, otp })
      : await new this.otpModel({ otp, mobile: data.mobile, expires }).save();
    const existingUser = await this.userModel.findOne({ mobile: data.mobile });
    existingUser && (returnMes.data.existing = true);
    if (process.env.NODE_ENV === 'dev') {
      console.log('otp: ' + otp);
    } else if (process.env.NODE_ENV === 'prod') {
      sendOtp(data.mobile, otp);
    }
    return returnMes;
  }

  async Login(data: ILogin): Promise<IReturnLogin> {
    const returnMes: IReturnLogin = {
      message: '',
      data: { access_token: '', refresh_token: '', name: '', panel: PanelEnum.MEMBER },
    };
    const { mobile, password, name } = data;
    const panel = (mobile === process.env.MOBILE_ADMIN) ? PanelEnum.ADMIN : PanelEnum.MEMBER
    const role = (mobile === process.env.MOBILE_ADMIN) ? RolesEnum.SPREADER : RolesEnum.HOUSE_WIFE
    const token = new Jwt(this.jwtService);
    await this.otpModel.deleteOne({ mobile });
    if (name && password) {
      returnMes.message = MessageLoginEnum.SU;
      await new this.userModel({
        mobile,
        password: hashPass(password),
        name,
        panel,
        role
      }).save();
      const { access_token, refresh_token } = await token.createToken(
        mobile,
        name,
        );
        returnMes.data = {
          access_token,
          refresh_token,
          name: data.name,
          panel
        };
      } else {
      const user = await this.userModel.findOne({ mobile });
      returnMes.message = MessageLoginEnum.SI;
      const { access_token, refresh_token } = await token.createToken(
        mobile,
        user.name,
      );
      returnMes.data = {
        access_token,
        refresh_token,
        name: user.name,
        panel: user.panel
      };
    }
    return returnMes;
  }

  async canSignUp(data: ICanSignUp): Promise<boolean> {
    const existing = await this.userModel.findOne({ mobile: data });
    return existing ? false : true;
  }
}
