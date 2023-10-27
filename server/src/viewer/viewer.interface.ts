/*------ body service interface ------*/

import { PanelEnum } from 'src/common/enum/role.enum';
import { IReturns } from 'src/common/interface/returns.interface';

export interface IOtp {
  mobile: string;
}

export interface ILogin {
  mobile: string;
  otp: string;
  name?: string;
  password?: string;
}

export interface ICanSignUp {
  mobile: string;
}

/*------ model interface ------*/

export interface IOtpModel extends Document {
  readonly mobile: string;
  readonly otp: string;
  readonly expires: number;
}

/*------ returns ------*/

export interface IReturnOtp extends IReturns {
  message: string;
  data: {
    expires: number;
    existing: boolean;
  };
}

export interface IReturnLogin extends IReturns {
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    name: string;
    panel: PanelEnum;
  }
}