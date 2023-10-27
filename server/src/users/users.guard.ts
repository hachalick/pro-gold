import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { IProductModel } from 'src/admin/admin.interface';

@Injectable()
export class UsersGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}

@Injectable()
export class FindByIdProductGuard implements CanActivate {
  constructor(
    @Inject('PRODUCT_MODEL')
    private readonly productModel: Model<IProductModel>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.query
    try {
      if(!id) throw new Error()
      await this.productModel.findById(id);
    } catch (error) {
      throw new HttpException('شناسه محصول یافت نشد', HttpStatus.NOT_FOUND);
    }
    return true;
  }
}
