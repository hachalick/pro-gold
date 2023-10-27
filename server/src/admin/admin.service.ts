import { Inject, Injectable } from '@nestjs/common';
import { Model, ObjectId, isObjectIdOrHexString } from 'mongoose';
import {
  IFileModel,
  IProductModel,
  IReturnCreateProduct,
  IReturnDeleteProduct,
  IReturnListUploadedImageProduct,
  IReturnUpdateProduct,
  IReturnUploadImage,
  IUpdateProduct,
} from './admin.interface';
import { HostConst } from 'src/common/constance';
import path from 'path';
import { unlinkSync } from 'fs';
import { object } from 'joi';
import { IAccurateSearchProducts } from 'src/users/users.interface';
import { IProduct } from 'src/common/interface/product.interface';

@Injectable()
export class AdminService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private readonly productModel: Model<IProductModel>,
    @Inject('FILE_MODEL')
    private readonly fileModel: Model<IFileModel>,
  ) {}

  async getUploadImageProduct(): Promise<IReturnListUploadedImageProduct> {
    const data = await this.fileModel.find();
    const deep = data.map((paths) => paths.path);
    return { message: 'لیست محصولات یافت شده', data: deep };
  }

  async uploadImageProduct(
    image: Express.Multer.File,
  ): Promise<IReturnUploadImage> {
    const returnMes: IReturnUploadImage = {
      message: 'عکس ثبت شد',
      data: {
        path: image.path,
      },
    };
    await new this.fileModel({ path: image.path }).save();
    return returnMes;
  }

  async accurateSearchProducts(data: IAccurateSearchProducts) {
    if (!Object.keys(data).length) {
      return await this.productModel.find();
    }
    Object.keys(data).forEach((key1) => {
      const a = Object.assign({}, data);
      Object.keys(a).forEach((key2) => key1 !== key2 && delete a[key2]);
      data[key1] = { $regex: a[key1] };
      return data;
    });
    const search = Object.keys(data).map((key1) => {
      const a = Object.assign({}, data);
      Object.keys(a).forEach((key2) => {
        key1 !== key2 && delete a[key2];
      });
      return a;
    });
    return await this.productModel.aggregate([{ $match: { $or: search } }]);
  }

  async overallSearchProducts(world: string) {
    if (!world) {
      return await this.productModel.find();
    }
    const titles = {
      category: 0,
      color: 0,
      details: 0,
      name: 0,
      stone: 0,
      tags: 0,
      type: 0,
    };
    Object.keys(titles).forEach((title) => {
      titles[title] = { $regex: world };
    });
    const search = Object.keys(titles).map((title) => {
      const a = Object.assign({}, titles);
      Object.keys(a).forEach((key) => {
        title !== key && delete a[key];
      });
      return a;
    });
    return await this.productModel.aggregate([{ $match: { $or: search } }]);
  }

  async createProduct(data: IProduct): Promise<IReturnCreateProduct> {
    await new this.productModel({ ...data }).save();
    await this.fileModel.deleteOne({ path: data.path });
    await this.fileModel.deleteMany()
    return { message: 'محصول با موفقیت ثبت شد' };
  }

  async updateProduct(data: IUpdateProduct): Promise<IReturnUpdateProduct> {
    const { id, ...value } = data;
    await this.productModel.updateOne({ _id: id }, value);
    return { message: 'تغییر محصول با موفقیت ثبت شد' };
  }

  async deleteProduct(
    data: ObjectId | undefined,
  ): Promise<IReturnDeleteProduct | undefined> {
    const product = await this.productModel.findByIdAndDelete(data);
    const pathImage = 'public' + product.path;
    unlinkSync(pathImage);
    return { message: 'محصول با موفقیت پاک شد' };
  }

  async deleteImageProduct(path: string) {
    try {
      await this.fileModel.deleteOne({ path });
      return { message: 'عکس از لیست با موفقیت پاک شد' };
    } catch (error) {
      
    }
  }
}
