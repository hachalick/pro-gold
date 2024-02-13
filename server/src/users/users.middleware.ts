import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { RolesEnum } from 'src/common/enum/role.enum';
import { EntityService } from 'src/entity/entity.service';
import { Jwt } from 'src/utils/jwt';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly entityService: EntityService,
  ) {}

  async use(req: any, res: any, next: () => void) {
    req.headers = { ...req.headers, role: RolesEnum.HOUSE_WIFE };
    if (req.headers.access_token) {
      const decodeToken = await new Jwt(this.jwtService).decodeToken(
        req.headers.access_token,
      );
      const user = await this.entityService.findUserByMobile(decodeToken.mobile, decodeToken.mobile_code);
      if(user !== false) (req.headers = { ...req.headers, role: user.role_type })
    }
    next();
  }
}
