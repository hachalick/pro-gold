/*------ body controller interface ------*/

export class OtpDto {
  readonly mobile: string;
}

export class LoginDto {
  readonly mobile: string;
  readonly otp: string;
  readonly name?: string;
  readonly password?: string;
}

export class CanSignUpDto {
  readonly mobile: string;
}
