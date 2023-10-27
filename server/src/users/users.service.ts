import { Inject, Injectable } from '@nestjs/common';
import mongoose, { Model, ObjectId } from 'mongoose';
import { IProductModel } from 'src/admin/admin.interface';
import { IAccurateSearchProducts } from './users.interface';
import { RolesEnum } from 'src/common/enum/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private readonly productModel: Model<IProductModel>,
  ) {}
  async accurateSearchProducts(data: IAccurateSearchProducts, role: RolesEnum) {
    let showDetails = '$housewifeWages';
    if (role === RolesEnum.HOUSE_WIFE) showDetails = '$housewifeWages';
    else if (role === RolesEnum.SHOPKEEPER) showDetails = '$shopkeeperWages';
    else if (role === RolesEnum.SPREADER) showDetails = '$spreaderWages';
    else if (role === RolesEnum.WHOLESALER) showDetails = '$wholesalerWages';
    if (!Object.keys(data).length) {
      return await this.productModel.aggregate([
        {
          $addFields: {
            wage: showDetails,
          },
        },
        {
          $project: {
            housewifeWages: 0,
            wholesalerWages: 0,
            shopkeeperWages: 0,
            spreaderWages: 0,
            __v: 0,
          },
        },
      ]);
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
    return await this.productModel.aggregate([
      { $match: { $or: search } },
      {
        $addFields: {
          wage: showDetails,
        },
      },
      {
        $project: {
          housewifeWages: 0,
          wholesalerWages: 0,
          shopkeeperWages: 0,
          spreaderWages: 0,
          __v: 0,
        },
      },
    ]);
  }

  async overallSearchProducts(world: string, role: RolesEnum) {
    let showDetails = '$housewifeWages';
    if (role === RolesEnum.HOUSE_WIFE) showDetails = '$housewifeWages';
    else if (role === RolesEnum.SHOPKEEPER) showDetails = '$shopkeeperWages';
    else if (role === RolesEnum.SPREADER) showDetails = '$spreaderWages';
    else if (role === RolesEnum.WHOLESALER) showDetails = '$wholesalerWages';
    if (!world) {
      return await this.productModel.aggregate([
        {
          $addFields: {
            wage: showDetails,
          },
        },
        {
          $project: {
            housewifeWages: 0,
            wholesalerWages: 0,
            shopkeeperWages: 0,
            spreaderWages: 0,
            __v: 0,
          },
        },
      ]);
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
    return await this.productModel.aggregate([
      { $match: { $or: search } },
      {
        $addFields: {
          wage: showDetails,
        },
      },
      {
        $project: {
          housewifeWages: 0,
          wholesalerWages: 0,
          shopkeeperWages: 0,
          spreaderWages: 0,
          __v: 0,
        },
      },
    ]);
  }

  async findByIdProduct(id: ObjectId, role: string) {
    let showDetails = '$housewifeWages';
    if (role === RolesEnum.HOUSE_WIFE) showDetails = '$housewifeWages';
    else if (role === RolesEnum.SHOPKEEPER) showDetails = '$shopkeeperWages';
    else if (role === RolesEnum.SPREADER) showDetails = '$spreaderWages';
    else if (role === RolesEnum.WHOLESALER) showDetails = '$wholesalerWages';
    return (await this.productModel.aggregate([
      { $match: { $expr : { $eq: [ '$_id' , { $toObjectId: id } ] } } },
      {
        $addFields: {
          wage: showDetails,
        },
      },
      {
        $project: {
          housewifeWages: 0,
          wholesalerWages: 0,
          shopkeeperWages: 0,
          spreaderWages: 0,
          __v: 0,
        },
      },
    ])).pop();
  }
}
