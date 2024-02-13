/*------ body controller interface ------*/

export class OtpDto {
  readonly mobile: string;
  readonly mobile_code: string;
}

export class LoginDto {
  readonly mobile: string;
  readonly mobile_code: string;
  readonly otp: string;
  readonly name?: string;
  readonly family?: string;
  readonly password?: string;
}

export class CanSignUpDto {
  readonly mobile: string;
  readonly mobile_code: string;
  readonly name?: string;
  readonly family?: string;
  readonly password?: string;
}
