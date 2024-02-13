import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import {
  IReturnOtp,
  IOtp,
  IReturnLogin,
  ILogin,
  ICanSignUp,
} from './viewer.interface';
import { createOtp, sendOtp } from 'src/utils/sms';
import { hashPass } from '../utils/hashing';
import { JwtService } from '@nestjs/jwt';
import { Jwt } from '../utils/jwt';
import { EntityService } from 'src/entity/entity.service';
import { ManagerEnum } from 'src/common/enum/role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpEntity } from 'src/common/entities/otp.entity';

enum MessageLoginEnum {
  SU = 'ثبت نام انجام شد',
  SI = 'ورود انجام شد',
}

@Injectable()
export class ViewerService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly entityService: EntityService,
  ) {}

  async Otp(data: IOtp): Promise<IReturnOtp | any> {
    const { mobile, mobile_code } = data;
    const returnMes: IReturnOtp = {
      message: 'کد یکبار مصرف ارسال شد',
      data: {
        expires: +process.env.EXPIRES_OTP,
        existing: false,
      },
    };
    let otp: string = createOtp(6);
    while (otp.length !== 6) {
      otp = createOtp(6);
    }
    const existingOtp = await this.entityService.findOneOtp(
      mobile,
      mobile_code,
    );
    existingOtp
      ? await this.entityService.updateOtp(mobile, mobile_code, otp)
      : await this.entityService.insertOtp(mobile, mobile_code, otp);
    const existingUser = await this.entityService.findUserByMobile(
      mobile,
      mobile_code,
    );
    this.entityService.setUsedOtp(mobile, mobile_code, 0);
    existingUser && (returnMes.data.existing = true);
    if (process.env.NODE_ENV === 'dev') {
      console.log('otp: ' + otp);
    } else if (process.env.NODE_ENV === 'prod') {
      sendOtp(mobile, otp);
    }
    return returnMes;
  }

  async Login(data: ILogin): Promise<IReturnLogin> {
    const { mobile, password, name, mobile_code, family } = data;
    const returnMes: IReturnLogin = {
      message: '',
      data: {
        access_token: '',
        refresh_token: '',
        name: '',
        panel: ManagerEnum.MEMBER,
      },
    };
    this.entityService.setUsedOtp(mobile, mobile_code, 1);
    const token = new Jwt(this.jwtService);
    const existingUser = await this.entityService.findUserByMobile(
      mobile,
      mobile_code,
    );
    if (existingUser === false) {
      returnMes.message = MessageLoginEnum.SU;
      const { access_token, refresh_token } = await token.createToken(
        mobile,
        mobile_code,
        name,
      );
      const insertUser = await this.entityService.insertUser(
        mobile,
        mobile_code,
        name,
        family,
        hashPass(password),
      );
      if (!insertUser)
        throw new HttpException(
          'ساخت حساب کاربری به مشکل خورد',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      returnMes.data = {
        access_token,
        refresh_token,
        name: data.name,
        panel: ManagerEnum.MEMBER,
      };
    } else {
      returnMes.message = MessageLoginEnum.SI;
      const { access_token, refresh_token } = await token.createToken(
        existingUser.mobile,
        existingUser.mobile_code,
        existingUser.name,
      );
      returnMes.data = {
        access_token,
        refresh_token,
        name: existingUser.name,
        panel: ManagerEnum.MEMBER,
      };
    }
    return returnMes;
  }

  async canSignUp(data: ICanSignUp): Promise<boolean> {
    const { mobile, mobile_code } = data;
    const existing = await this.entityService.findUserByMobile(
      mobile,
      mobile_code,
    );
    return existing ? false : true;
  }
}
