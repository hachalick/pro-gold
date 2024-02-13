import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { EntityService } from 'src/entity/entity.service';
import { JwtService } from '@nestjs/jwt';
import { Jwt } from 'src/utils/jwt';
import { ManagerEnum } from 'src/common/enum/role.enum';
import {
  ICreateFile,
  ICreateProduct,
  ICreateWages,
  IDeleteImages,
  IDeleteWages,
  IUpdateImageProduct,
  IUpdateProduct,
  IUpdateWages,
} from 'src/users/users.interface';
import { Request } from 'express';
import { number } from 'joi';

// @Injectable()
// export class AdminGuard implements CanActivate {
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     return true;
//   }
// }
interface RequestHeader extends Request {
  headers: {
    access_token: string;
  };
}

@Injectable()
export class AccessAdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly entityService: EntityService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestHeader = context.switchToHttp().getRequest();
    const headers = request.headers;
    if (!headers.access_token)
      throw new HttpException('دسترسی وجود ندارد', HttpStatus.UNAUTHORIZED);
    const decodeToken = await new Jwt(this.jwtService).decodeToken(
      headers.access_token,
    );
    if (decodeToken.expires - new Date().getTime() < 0) {
      throw new HttpException('توکن منقضی شده', HttpStatus.NOT_ACCEPTABLE);
    }
    const user = await this.entityService.findUserByMobile(
      decodeToken.mobile,
      decodeToken.mobile_code,
    );
    if (!user) throw new HttpException('کاربری یافت نشد', HttpStatus.NOT_FOUND);
    else if (
      !user.manager.find((manage) => manage.manager_type === ManagerEnum.ADMIN)
    )
      throw new HttpException('دسترسی وجود ندارد', HttpStatus.UNAUTHORIZED);
    return true;
  }
}

@Injectable()
export class CreateProductGuard implements CanActivate {
  constructor(private readonly entityService: EntityService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const body: ICreateProduct = request.body;
    const { category_type_id, images, metal_type_id, product_type_id, wages } =
      body;
    if (
      !!!category_type_id ||
      !!!images ||
      !!!metal_type_id ||
      !!!product_type_id ||
      !!!wages
    )
      return true;
    for (let i in wages) {
      const { for_role, wages_type_id } = wages[i];
      if (!!!for_role || !!!wages_type_id) return true;
      const existWagesType = await this.entityService.findWagesTypeById(
        wages_type_id,
      );
      if (!existWagesType)
        throw new HttpException(
          `کد نوع ${wages_type_id} اجرت وجود ندارد`,
          HttpStatus.BAD_REQUEST,
        );
      const existRoleType = await this.entityService.findRoleTypeById(for_role);
      if (!existRoleType)
        throw new HttpException(
          `کد نوع شخصیت ${for_role} وجود ندارد`,
          HttpStatus.BAD_REQUEST,
        );
    }
    for (let i in images) {
      const { color_type_id, file_id, unit_type_id } = images[i];
      if (!!!color_type_id || !!!file_id || !!!unit_type_id) return true;
      const existColorType = await this.entityService.findColorTypeById(
        color_type_id,
      );
      if (!existColorType)
        throw new HttpException(
          `کد نوع رنگ ${color_type_id} وجود ندارد`,
          HttpStatus.BAD_REQUEST,
        );
      const existUnitType = await this.entityService.findUnitTypeById(
        unit_type_id,
      );
      if (!existUnitType)
        throw new HttpException(
          `کد نوع اندازه ${unit_type_id} وجود ندارد`,
          HttpStatus.BAD_REQUEST,
        );
      const existFileId = await this.entityService.findImageById(file_id);
      if (!existFileId)
        throw new HttpException(
          `کد فایل ${file_id} وجود ندارد`,
          HttpStatus.BAD_REQUEST,
        );
    }
    const existMetalType = await this.entityService.findMetalTypeById(
      metal_type_id,
    );
    if (!existMetalType)
      throw new HttpException(
        `کد نوع فلز ${metal_type_id} وجود ندارد`,
        HttpStatus.BAD_REQUEST,
      );
    const existProductType = await this.entityService.findProductTypeById(
      product_type_id,
    );
    if (!existProductType)
      throw new HttpException(
        `کد نوع محصول ${product_type_id} وجود ندارد`,
        HttpStatus.BAD_REQUEST,
      );
    const existCategoryType = await this.entityService.findCategoryTypeById(
      category_type_id,
    );
    if (!existCategoryType)
      throw new HttpException(
        `کد نوع دسته بندی ${category_type_id} وجود ندارد`,
        HttpStatus.BAD_REQUEST,
      );
    return true;
  }
}

@Injectable()
export class UpdateProductGuard implements CanActivate {
  constructor(private readonly entityService: EntityService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const {
      product_id,
      metal_type_id,
      product_type_id,
      category_type_id,
    }: IUpdateProduct = request.body;
    if (
      !!!product_id ||
      !!!metal_type_id ||
      !!!product_type_id ||
      !!!category_type_id
    )
      return true;
    const existProduct = await this.entityService.findProductById(product_id);
    if (!existProduct)
      throw new HttpException(
        `شناسه محصول ${product_id} وجود ندارد`,
        HttpStatus.NOT_FOUND,
      );
    const existMetalType = await this.entityService.findMetalTypeById(
      metal_type_id,
    );
    if (!existMetalType)
      throw new HttpException(
        `کد نوع فلز ${metal_type_id} وجود ندارد`,
        HttpStatus.BAD_REQUEST,
      );
    const existProductType = await this.entityService.findProductTypeById(
      product_type_id,
    );
    if (!existProductType)
      throw new HttpException(
        `کد نوع محصول ${product_type_id} وجود ندارد`,
        HttpStatus.BAD_REQUEST,
      );
    const existCategoryType = await this.entityService.findCategoryTypeById(
      category_type_id,
    );
    if (!existCategoryType)
      throw new HttpException(
        `کد نوع دسته بندی ${category_type_id} وجود ندارد`,
        HttpStatus.BAD_REQUEST,
      );
    return true;
  }
}

@Injectable()
export class DeleteProductGuard implements CanActivate {
  constructor(private readonly entityService: EntityService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.query;
    if (!id)
      throw new HttpException(
        `شناسه محصول ${id} وجود ندارد`,
        HttpStatus.BAD_REQUEST,
      );
    const existProduct = await this.entityService.findProductById(id);
    if (existProduct !== false)
      throw new HttpException(
        `شناسه محصول ${existProduct.product_id} یافت نشد`,
        HttpStatus.NOT_FOUND,
      );
    return true;
  }
}

@Injectable()
export class UpdateWagesGuard implements CanActivate {
  constructor(private readonly entityService: EntityService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const body: IUpdateWages[] = request.body;
    const query: { user_id?: string } = request.query;
    if (query.user_id !== undefined)
      for (let i in body) {
        const { for_role, product_id, wages_type_id } = body[i];
        if (!!!for_role || !!!product_id || !!!wages_type_id) return true;
        const existWagesMetal = await this.entityService.findWagesMetalById(
          parseInt(query.user_id),
          product_id,
          for_role,
          wages_type_id,
        );
        if (!existWagesMetal)
          throw new HttpException(
            `شناسه محصول ${product_id} یافت نشد`,
            HttpStatus.NOT_FOUND,
          );
      }
    return true;
  }
}

@Injectable()
export class UpdateImageProductGuard implements CanActivate {
  constructor(private readonly entityService: EntityService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { product_id, target, modify }: IUpdateImageProduct = request.body;
    if (!!!product_id || !!!target || !!!modify) return true;
    const existImageProductBefore =
      await this.entityService.findImageProductById(
        product_id,
        target.file_id,
        target.color_type_id,
        target.unit_type_id,
        target.size_x,
        target.size_y,
      );
    if (!existImageProductBefore)
      throw new HttpException(
        'مشخصات ارسالی تصاویر عکس موجود نمی باشد',
        HttpStatus.NOT_FOUND,
      );
    const existImageProductAfter =
      await this.entityService.findImageProductById(
        product_id,
        modify.file_id,
        modify.color_type_id,
        modify.unit_type_id,
        modify.size_x,
        modify.size_y,
      );
    if (existImageProductAfter)
      throw new HttpException(
        'مشخصات ارسالی تصاویر عکس موجود می باشد',
        HttpStatus.NOT_FOUND,
      );
    return true;
  }
}

@Injectable()
export class CreateFileGuard implements CanActivate {
  constructor(private readonly entityService: EntityService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const files: ICreateFile[] = request.body;
    for (let i in files) {
      const { domain, file_type_id, name, path } = files[i];
      if (!!!domain || !!!file_type_id || !!!name || !!!path) return true;
      const existFile = await this.entityService.findFile(
        name,
        path,
        domain,
        file_type_id,
      );
      if (existFile)
        throw new HttpException(
          'مشخصات ارسالی تصاویر عکس تکراری می باشد',
          HttpStatus.BAD_REQUEST,
        );
      const fileType = await this.entityService.findFileTypeById(file_type_id);
      if (!fileType)
        throw new HttpException(
          `کد نوع فایل ${file_type_id} وجود ندارد`,
          HttpStatus.BAD_REQUEST,
        );
    }
    return true;
  }
}

@Injectable()
export class CreateWagesGuard implements CanActivate {
  constructor(private readonly entityService: EntityService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const query: { user_id?: string } = request.query;
    const files: ICreateWages[] = request.body;
    if (query.user_id) {
      for (let i in files) {
        const { for_role, product_id, wages_type_id } = files[i];
        if (!!!for_role || !!!product_id || !!!wages_type_id) return true;
        const existProduct = await this.entityService.findProductById(
          product_id,
        );
        if (!existProduct)
          throw new HttpException(
            `شناسه محصول ${product_id} وجود ندارد`,
            HttpStatus.BAD_REQUEST,
          );
        const existWagesType = await this.entityService.findWagesTypeById(
          wages_type_id,
        );
        if (!existWagesType)
          throw new HttpException(
            `کد نوع ${wages_type_id} اجرت وجود ندارد`,
            HttpStatus.BAD_REQUEST,
          );
        const existRoleType = await this.entityService.findRoleTypeById(
          for_role,
        );
        if (!existRoleType)
          throw new HttpException(
            `کد نوع شخصیت ${for_role} وجود ندارد`,
            HttpStatus.BAD_REQUEST,
          );
        const existWagesMetal = await this.entityService.findWagesMetalById(
          parseInt(query.user_id),
          product_id,
          for_role,
          wages_type_id,
        );
        if (existWagesMetal)
          if (
            existWagesMetal.for_role == for_role &&
            existWagesMetal.product_id == product_id &&
            existWagesMetal.wages_type_id == wages_type_id &&
            existWagesMetal.user_id == parseInt(query.user_id)
          )
            throw new HttpException(
              `شناسه ${product_id}, ${wages_type_id}, ${for_role} وجود دارد`,
              HttpStatus.NOT_FOUND,
            );
      }
    }
    return true;
  }
}

@Injectable()
export class DeleteWagesGuard implements CanActivate {
  constructor(private readonly entityService: EntityService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const query: { user_id?: string } = request.query;
    const wages: IDeleteWages[] = request.body;
    if (query.user_id) {
      for (let i in wages) {
        const { for_role, product_id, wages_type_id } = wages[i];
        if (!!!for_role || !!!product_id || !!!wages_type_id) return true;
        const existWagesMetal = await this.entityService.findWagesMetalById(
          parseInt(query.user_id),
          product_id,
          for_role,
          wages_type_id,
        );
        if (!existWagesMetal)
          throw new HttpException(
            `شناسه ${product_id}, ${wages_type_id}, ${for_role} وجود ندارد`,
            HttpStatus.NOT_FOUND,
          );
      }
    }
    return true;
  }
}

@Injectable()
export class DeleteImagesGuard implements CanActivate {
  constructor(private readonly entityService: EntityService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const wages: IDeleteImages[] = request.body;
    for (let i in wages) {
      const { color_type_id, file_id, product_id, unit_type_id } = wages[i];
      if (!!!color_type_id || !!!file_id || !!!unit_type_id || !!!unit_type_id)
        return true;
      const existWagesMetal = await this.entityService.findImageProductById(
        product_id,
        file_id,
        color_type_id,
        unit_type_id,
      );
      if (!existWagesMetal)
        throw new HttpException(
          `شناسه ${product_id}, ${color_type_id}, ${file_id}, ${unit_type_id} وجود ندارد`,
          HttpStatus.NOT_FOUND,
        );
    }
    return true;
  }
}
