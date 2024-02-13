/*------ body service interface ------*/

import { ManagerEnum } from 'src/common/enum/role.enum';
import { IReturns } from 'src/common/interface/returns.interface';

export interface IOtp {
  mobile: string;
  mobile_code: string;
}

export interface ILogin {
  mobile: string;
  mobile_code: string;
  otp: string;
  name?: string;
  family?: string;
  password?: string;
}

export interface ICanSignUp {
  mobile: string;
  mobile_code: string;
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
    panel: ManagerEnum;
  }
}