import { Inject, Injectable } from '@nestjs/common';
import { IAccurateSearchProducts } from './users.interface';
import { RolesEnum } from 'src/common/enum/role.enum';
import { EntityService } from 'src/entity/entity.service';

@Injectable()
export class UsersService {
  constructor(private readonly entityService: EntityService) {}

  // async accurateSearchProducts(data: IAccurateSearchProducts, role: RolesEnum) {
  //   // let showDetails = '$housewifeWages';
  //   // if (role === RolesEnum.HOUSE_WIFE) showDetails = '$housewifeWages';
  //   // else if (role === RolesEnum.SHOPKEEPER) showDetails = '$shopkeeperWages';
  //   // else if (role === RolesEnum.SPREADER) showDetails = '$spreaderWages';
  //   // else if (role === RolesEnum.WHOLESALER) showDetails = '$wholesalerWages';
  //   // const unShowPropDB = {
  //   //   housewifeWages: 0,
  //   //   wholesalerWages: 0,
  //   //   shopkeeperWages: 0,
  //   //   spreaderWages: 0,
  //   //   __v: 0,
  //   // };
  //   // if (!Object.keys(data).length) {
  //   //   return await this.productModel.aggregate([
  //   //     {
  //   //       $addFields: {
  //   //         wage: showDetails,
  //   //       },
  //   //     },
  //   //     {
  //   //       $project: unShowPropDB,
  //   //     },
  //   //   ]);
  //   // }
  //   // Object.keys(data).forEach((key1) => {
  //   //   const a = Object.assign({}, data);
  //   //   Object.keys(a).forEach((key2) => key1 !== key2 && delete a[key2]);
  //   //   data[key1] = { $regex: a[key1] };
  //   //   return data;
  //   // });
  //   // const search = Object.keys(data).map((key1) => {
  //   //   const a = Object.assign({}, data);
  //   //   Object.keys(a).forEach((key2) => {
  //   //     key1 !== key2 && delete a[key2];
  //   //   });
  //   //   return a;
  //   // });
  //   // return await this.productModel.aggregate([
  //   //   { $match: { $or: search } },
  //   //   {
  //   //     $addFields: {
  //   //       wage: showDetails,
  //   //     },
  //   //   },
  //   //   {
  //   //     $project: unShowPropDB,
  //   //   },
  //   // ]);
  // }

  // async overallSearchProducts(world: string, role: RolesEnum) {
  //   // let showDetails = '$housewifeWages';
  //   // if (role === RolesEnum.HOUSE_WIFE) showDetails = '$housewifeWages';
  //   // else if (role === RolesEnum.SHOPKEEPER) showDetails = '$shopkeeperWages';
  //   // else if (role === RolesEnum.SPREADER) showDetails = '$spreaderWages';
  //   // else if (role === RolesEnum.WHOLESALER) showDetails = '$wholesalerWages';
  //   // const unShowPropDB = {
  //   //   housewifeWages: 0,
  //   //   wholesalerWages: 0,
  //   //   shopkeeperWages: 0,
  //   //   spreaderWages: 0,
  //   //   __v: 0,
  //   // };
  //   // if (!world) {
  //   //   return await this.productModel.aggregate([
  //   //     {
  //   //       $addFields: {
  //   //         wage: showDetails,
  //   //       },
  //   //     },
  //   //     {
  //   //       $project: unShowPropDB,
  //   //     },
  //   //   ]);
  //   // }
  //   // const titles = {
  //   //   category: 0,
  //   //   color: 0,
  //   //   details: 0,
  //   //   name: 0,
  //   //   stone: 0,
  //   //   tags: 0,
  //   //   type: 0,
  //   // };
  //   // Object.keys(titles).forEach((title) => {
  //   //   titles[title] = { $regex: world };
  //   // });
  //   // const search = Object.keys(titles).map((title) => {
  //   //   const a = Object.assign({}, titles);
  //   //   Object.keys(a).forEach((key) => {
  //   //     title !== key && delete a[key];
  //   //   });
  //   //   return a;
  //   // });
  //   // return await this.productModel.aggregate([
  //   //   { $match: { $or: search } },
  //   //   {
  //   //     $addFields: {
  //   //       wage: showDetails,
  //   //     },
  //   //   },
  //   //   {
  //   //     $project: unShowPropDB,
  //   //   },
  //   // ]);
  // }

  async findByIdProduct(id: number, role: string) {
    let returnMes: Object = {};
    const product = await this.entityService.findProductById(id);
    const imagesProduct = await this.entityService.findImagesProductById(id);
    const wagesProduct = await this.entityService.findWagesProductById(
      id,
      role,
    );
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

  async findAllProducts(limit: number, from: number, role: string) {
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
          role,
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

  async numberOfProduct() {
    const count = await this.entityService.findCountProducts();
    return { count };
  }
}
