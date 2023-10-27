import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Document, Model, Types } from 'mongoose';
import {
  IFileModel,
  IProductAdmin,
  IProductModel,
  IUpdateProduct,
} from './admin.interface';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;
  }
}

@Injectable()
export class CreateProductGuard implements CanActivate {
  constructor(
    @Inject('FILE_MODEL')
    private readonly fileModel: Model<IFileModel>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const {
      path,
      housewifeWages,
      shopkeeperWages,
      spreaderWages,
      wholesalerWages,
    } = request.body;
    if (
      parseFloat(housewifeWages) > parseFloat(shopkeeperWages) &&
      parseFloat(shopkeeperWages) > parseFloat(wholesalerWages) &&
      parseFloat(wholesalerWages) > parseFloat(spreaderWages) &&
      !isNaN(spreaderWages) &&
      !isNaN(shopkeeperWages) &&
      !isNaN(wholesalerWages) &&
      !isNaN(housewifeWages)
    ) {
      const result = await this.fileModel.find({ path });
      if (!result.length)
        throw new HttpException('نشانی عکس یافت نشد', HttpStatus.NOT_FOUND);
    } else if (parseFloat(housewifeWages) <= parseFloat(shopkeeperWages)) {
      throw new HttpException(
        'اجرت خانگی از اجرت مغازه دار باید بیشتر باشد',
        HttpStatus.BAD_REQUEST,
      );
    } else if (parseFloat(shopkeeperWages) <= parseFloat(wholesalerWages)) {
      throw new HttpException(
        'اجرت مغازه دار از اجرت بنکدار باید بیشتر باشد',
        HttpStatus.BAD_REQUEST,
      );
    } else if (parseFloat(wholesalerWages) <= parseFloat(spreaderWages)) {
      throw new HttpException(
        'اجرت بنکدار از اجرت پخش کننده باید بیشتر باشد',
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }
}

@Injectable()
export class UpdateProductGuard implements CanActivate {
  constructor(
    @Inject('PRODUCT_MODEL')
    private readonly productModel: Model<IProductModel>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const {
      id,
      housewifeWages,
      shopkeeperWages,
      spreaderWages,
      wholesalerWages,
    }: IUpdateProduct = request.body;
    let product: Document<unknown, {}, IProductModel> &
      IProductModel & {
        _id: Types.ObjectId;
      };
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new HttpException('شناسه محصول وجود ندارد', HttpStatus.NOT_FOUND);
    }
    const nw = {
      housewifeWages: housewifeWages || product.housewifeWages,
      shopkeeperWages: shopkeeperWages || product.shopkeeperWages,
      spreaderWages: spreaderWages || product.spreaderWages,
      wholesalerWages: wholesalerWages || product.wholesalerWages,
    };
    if (nw.housewifeWages <= nw.shopkeeperWages) {
      throw new HttpException(
        'اجرت خانگی از اجرت مغازه دار باید بیشتر باشد',
        HttpStatus.BAD_REQUEST,
      );
    } else if (nw.shopkeeperWages <= nw.wholesalerWages) {
      throw new HttpException(
        'اجرت مغازه دار از اجرت بنکدار باید بیشتر باشد',
        HttpStatus.BAD_REQUEST,
      );
    } else if (nw.wholesalerWages <= nw.spreaderWages) {
      throw new HttpException(
        'اجرت بنکدار از اجرت پخش کننده باید بیشتر باشد',
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }
}

@Injectable()
export class DeleteProductGuard implements CanActivate {
  constructor(
    @Inject('PRODUCT_MODEL')
    private readonly productModel: Model<IProductModel>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.query;
    if (!id)
      throw new HttpException('شناسه محصول وجود ندارد', HttpStatus.BAD_REQUEST);
    const existing = await this.productModel.findById(id);
    if (!existing)
      throw new HttpException('شناسه محصول وجود ندارد', HttpStatus.NOT_FOUND);
    return true;
  }
}
