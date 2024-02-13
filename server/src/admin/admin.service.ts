import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model, ObjectId, isObjectIdOrHexString } from 'mongoose';
import {
  IReturnCreateProduct,
  IReturnDeleteProduct,
  IReturnListUploadedImageProduct,
  IReturnUpdateProduct,
  IReturnUploadImage,
} from './admin.interface';
import { HostConst } from 'src/common/constance';
import {
  IAccurateSearchProducts,
  ICreateFile,
  ICreateProduct,
  ICreateWages,
  IDeleteImages,
  IDeleteWages,
  IUpdateImageProduct,
  IUpdateProduct,
  IUpdateWages,
} from 'src/users/users.interface';
import { EntityService } from 'src/entity/entity.service';

@Injectable()
export class AdminService {
  constructor(private readonly entityService: EntityService) {}

  async getUploadImageProduct(): Promise<IReturnListUploadedImageProduct> {
    const data = await this.entityService.findImages();
    if (data === false) return { message: 'عکسی یافت نشد', data: [] };
    return { message: 'لیست محصولات یافت شده', data };
  }

  async createProduct(
    data: ICreateProduct,
    userId: number,
  ): Promise<IReturnCreateProduct> {
    const productId = await this.entityService.insertProduct(
      data.category_type_id,
      data.weight,
      data.coefficient_variation,
      data.title,
      data.meta_description,
      data.description,
      data.isAvailable,
      data.can_order,
      data.product_type_id,
      data.metal_type_id,
    );
    console.log(productId);
    if (!productId)
      throw new HttpException(
        'محصول اضافه نشد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    for (let i in data.images) {
      const { color_type_id, file_id, unit_type_id, size_x, size_y } =
        data.images[i];
      const connectImage = await this.entityService.insertImageProduct(
        productId,
        file_id,
        color_type_id,
        unit_type_id,
        size_x,
        size_y,
      );
      if (!connectImage)
        throw new HttpException(
          'ارتباط عکس با محصول انجام نشد',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
    for (let i in data.wages) {
      const { wages, wages_type_id, for_role } = data.wages[i];
      await this.entityService.insertWagesMetal(
        productId,
        wages_type_id,
        userId,
        wages,
        for_role,
      );
    }
    return { message: 'محصول با موفقیت ثبت شد' };
  }

  async updateProduct(data: IUpdateProduct): Promise<IReturnUpdateProduct> {
    const res = await this.entityService.updateProduct(data);
    if (!res)
      throw new HttpException(
        'بروزرسانی محصول انجام نشد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return { message: 'تغییر محصول با موفقیت ثبت شد' };
  }

  async updateImageProduct(
    data: IUpdateImageProduct,
  ): Promise<IReturnUpdateProduct> {
    const updateImageProduct = await this.entityService.updateImageProductById(
      data,
    );
    if (updateImageProduct === false) {
      throw new HttpException(
        'بروزرسانی عکس محصول انجام نشد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else {
      return { message: 'تغییرات عکس محصول با موفقیت ثبت شد' };
    }
  }

  async updateWages(
    data: IUpdateWages[],
    userId: number,
  ): Promise<IReturnUpdateProduct> {
    for (let i in data) {
      const res = await this.entityService.updateWage(data[i], userId);
      if (!res)
        throw new HttpException(
          'بروزرسانی اجرت محصول انجام نشد',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      else return { message: 'تغییر محصول با موفقیت ثبت شد' };
    }
  }

  async deleteProduct(
    productId: number,
  ): Promise<IReturnDeleteProduct | undefined> {
    const deletedProduct = await this.entityService.deleteProductById(
      productId,
    );
    return { message: 'محصول با موفقیت پاک شد' };
  }

  async findByIdProduct(id: number) {
    let returnMes: Object = {};
    const product = await this.entityService.findProductById(id);
    const imagesProduct = await this.entityService.findImagesProductById(id);
    const wagesProduct = await this.entityService.findWagesProductById(id);
    if (product !== false) {
      returnMes = { ...product };
      if (imagesProduct !== false) {
        returnMes = { ...returnMes, images: imagesProduct };
      } else {
        returnMes = { ...returnMes, images: null };
      }
      if (wagesProduct !== false) {
        returnMes = { ...returnMes, wages: wagesProduct };
      } else {
        returnMes = { ...returnMes, wages: null };
      }
    }
    return returnMes;
  }

  async findAllProducts(limit: number, from: number) {
    let returnMes: object = [];
    const product = await this.entityService.findAllProducts(limit, from);
    if (product !== false) {
      returnMes = product;
      for (let i in returnMes) {
        const imagesProduct = await this.entityService.findImagesProductById(
          returnMes[i].product_id,
        );
        if (imagesProduct !== false) {
          returnMes[i] = { ...returnMes[i], images: imagesProduct };
        } else {
          returnMes[i] = { ...returnMes[i], images: null };
        }
        const wagesProduct = await this.entityService.findWagesProductById(
          returnMes[i].product_id,
        );
        if (wagesProduct !== false) {
          returnMes[i] = { ...returnMes[i], wages: wagesProduct };
        } else {
          returnMes[i] = { ...returnMes[i], wages: null };
        }
      }
      return returnMes;
    }
  }

  async createFile(data: ICreateFile[]) {
    for (let i in data) {
      const { domain, file_type_id, name, path } = data[i];
      const createFile = await this.entityService.insertFile(
        name,
        path,
        domain,
        file_type_id,
      );
      if (createFile === false)
        throw new HttpException(
          'فایل اضافه نشد',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      return { message: 'محصول با موفقیت اضافه شد' };
    }
  }

  async createWages(data: ICreateWages[], userId: number) {
    for (let i in data) {
      const { for_role, product_id, wages, wages_type_id } = data[i];
      const result = await this.entityService.insertWagesMetal(
        product_id,
        wages_type_id,
        userId,
        wages,
        for_role,
      );
      if (result === false)
        throw new HttpException(
          `اجرت با مشخصات ${product_id}, ${wages_type_id}, ${for_role} اضافه نشد`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      return { message: 'محصول با موفقیت اضافه شد' };
    }
  }

  async deleteWages(data: IDeleteWages[], userId: number) {
    for (let i in data) {
      const { for_role, product_id, wages_type_id } = data[i];
      const res = await this.entityService.deleteWagesProductById(
        userId,
        for_role,
        product_id,
        wages_type_id,
      );
      if (res === false)
        throw new HttpException(
          `اجرت با مشخصات ${product_id}, ${wages_type_id}, ${for_role} حذف نشد`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      return { message: 'محصول با موفقیت حذف شد' };
    }
  }

  async deleteImages(data: IDeleteImages[]) {
    for (let i in data) {
      const { color_type_id, file_id, product_id } = data[i];
      const res = await this.entityService.deleteImagesProductById(
        color_type_id,
        file_id,
        product_id
      );
      if (res === false)
        throw new HttpException(
          `عکس محصول با مشخصات ${product_id}, ${color_type_id}, ${product_id} حذف نشد`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      return { message: 'عکس محصول با موفقیت حذف شد' };
    }
  }
}
