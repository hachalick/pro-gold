import { JwtService } from '@nestjs/jwt';

export class Jwt {
  constructor(private readonly jwtService: JwtService) {}
  async createToken(
    mobile: string,
    name: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const access_token = await this.jwtService.signAsync(
      { mobile },
      {
        expiresIn: process.env.EXPIRES_TOKEN,
        secret: process.env.SECRET_KEY_ACCESS_JWT,
      },
    );
    const refresh_token = await this.jwtService.signAsync(
      { mobile, name },
      {
        expiresIn: process.env.EXPIRES_REFRESH_TOKEN,
        secret: process.env.SECRET_KEY_REFRESH_JWT,
      },
    );
    return { access_token, refresh_token };
  }
  async decodeToken(
    token: string,
  ): Promise<{ expires: number; mobile: string; correct: boolean, name?: string }> {
    const valueToken: any = await this.jwtService.decode(token);
    const correct = valueToken ? true : false;
    return {
      expires: correct && valueToken.exp * 1000,
      mobile: correct && valueToken.mobile,
      correct,
      name: valueToken.name
    };
  }
}
