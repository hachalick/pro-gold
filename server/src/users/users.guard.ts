import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { EntityService } from 'src/entity/entity.service';

// @Injectable()
// export class UsersGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     return true;
//   }
// }

@Injectable()
export class FindByIdProductGuard implements CanActivate {
  constructor(private readonly entityService: EntityService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.query;
    if (!id)
      throw new HttpException('شناسه محصول یافت نشد', HttpStatus.BAD_REQUEST);
    const existingProduct = await this.entityService.findProductById(
      parseInt(id),
    );
    if (!existingProduct)
      throw new HttpException('محصولی یافت نشد', HttpStatus.NOT_FOUND);
    return true;
  }
}

@Injectable()
export class FindAllProductGuard implements CanActivate {
  constructor(private readonly entityService: EntityService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { limit, from } = request.query;
    if (!limit || parseInt(limit) <= 0)
      throw new HttpException('تعداد رکورد یافت نشد', HttpStatus.BAD_REQUEST);
    else if (!from || parseInt(from) < 0)
      throw new HttpException('شروع بازه یافت نشد', HttpStatus.BAD_REQUEST);
    const countProduct = await this.entityService.findCountProducts();
    if (countProduct !== false) {
      if (countProduct < parseInt(limit) + parseInt(from))
        throw new HttpException(
          'بازه تعداد در خواست بیش از سقف مجاز می باشد',
          HttpStatus.BAD_REQUEST,
        );
    }
    return true;
  }
}
