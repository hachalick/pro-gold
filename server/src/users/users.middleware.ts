import { Injectable, NestMiddleware } from '@nestjs/common';
import { RolesEnum } from 'src/common/enum/role.enum';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    req.headers = {...req.headers, role: RolesEnum.WHOLESALER};
    next();
  }
}
