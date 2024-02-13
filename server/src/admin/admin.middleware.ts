import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { EntityService } from 'src/entity/entity.service';
import { Jwt } from 'src/utils/jwt';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly entityService: EntityService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const access_token = req.headers?.access_token;
    if (access_token && typeof access_token === 'string') {
      const decodeToken = await new Jwt(this.jwtService).decodeToken(
        access_token,
      );
      const user = await this.entityService.findUserByMobile(
        decodeToken.mobile,
        decodeToken.mobile_code,
      );
      if (user !== false) req.query = { user_id: '' + user.user_id };
    }
    next();
  }
}
