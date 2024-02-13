import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ILogin, IOtp } from './viewer.interface';
import { EntityService } from 'src/entity/entity.service';

/*------ guard send otp ------*/

@Injectable()
export class OtpGuard implements CanActivate {
  constructor(private readonly entityService: EntityService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { mobile, mobile_code }: IOtp = request.body;
    const existingOtp = await this.entityService.findOneOtp(
      mobile,
      mobile_code,
    );
    if (existingOtp && typeof existingOtp === 'object') {
      const timestamp = new Date().getTime() - existingOtp.expires.getTime();
      if (timestamp <= +process.env.EXPIRES_OTP * 60000) {
        throw new HttpException(
          'درخواست کد زودتر از حد مجاز است',
          HttpStatus.FORBIDDEN,
        );
      }
    }
    return true;
  }
}

/*------ guard login ------*/

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private readonly entityService: EntityService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { mobile, otp, name, password, mobile_code, family }: ILogin =
      request.body;
    const existingOtp = await this.entityService.findOneOtp(
      mobile,
      mobile_code,
    );
    if (!(mobile && mobile_code) || !otp) return true;
    if (!existingOtp) {
      throw new HttpException('کاربری یافت نشد', HttpStatus.NOT_FOUND);
    } else if (existingOtp.otp !== otp) {
      throw new HttpException(
        'کد احراز هویت صحیح نیست',
        HttpStatus.BAD_REQUEST,
      );
    } else if (existingOtp.isUsed === 1) {
      throw new HttpException(
        'کد احراز هویت استفاده شده',
        HttpStatus.BAD_REQUEST,
      );
    } else if (
      new Date().getTime() - existingOtp.expires.getTime() >=
      +process.env.EXPIRES_OTP * 60000
    ) {
      throw new HttpException(
        'کد احراز هویت منقضی شده',
        HttpStatus.BAD_REQUEST,
      );
    }
    const existingUser = await this.entityService.findUserByMobile(
      mobile,
      mobile_code,
    );
    if (
      !(
        (existingUser && !name && !password && !family) ||
        (!existingUser && name && password && family)
      )
    ) {
      throw new HttpException('مشخصات صحیح نیست', HttpStatus.BAD_REQUEST);
    }
      return true;
  }
}