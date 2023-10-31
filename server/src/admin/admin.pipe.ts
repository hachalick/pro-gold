import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import path from 'path';
import { HostConst } from 'src/common/constance';

@Injectable()
export class AdminPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}

@Injectable()
export class AddProductPipe implements PipeTransform {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    const pathImg = value.path.split('\\').join('/');
    value.path = pathImg.split('public')[1];
    return value;
  }
}

@Injectable()
export class ParseIntCreateProductPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (
      value.minWeight &&
      value.maxWeight &&
      value.spreaderWages &&
      value.shopkeeperWages &&
      value.wholesalerWages &&
      value.housewifeWages &&
      value.size &&
      !isNaN(value.minWeight) &&
      !isNaN(value.maxWeight) &&
      !isNaN(value.spreaderWages) &&
      !isNaN(value.shopkeeperWages) &&
      !isNaN(value.wholesalerWages) &&
      !isNaN(value.housewifeWages) &&
      !isNaN(value.size)
    ) {
      value = {
        ...value,
        minWeight: parseFloat(value.minWeight),
        maxWeight: parseFloat(value.maxWeight),
        spreaderWages: parseFloat(value.spreaderWages),
        shopkeeperWages: parseFloat(value.shopkeeperWages),
        wholesalerWages: parseFloat(value.wholesalerWages),
        housewifeWages: parseFloat(value.housewifeWages),
        size: parseFloat(value.size),
      };
    }
    console.log(2)
    return value;
  }
}

@Injectable()
export class ParseIntUpdateProductPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.spreaderWages && !isNaN(value.spreaderWages)) {
      value = {
        ...value,
        spreaderWages: parseFloat(value.spreaderWages),
      };
    }
    if (value.shopkeeperWages && !isNaN(value.shopkeeperWages)) {
      value = {
        ...value,
        shopkeeperWages: parseFloat(value.shopkeeperWages),
      };
    }
    if (value.wholesalerWages && !isNaN(value.wholesalerWages)) {
      value = {
        ...value,
        wholesalerWages: parseFloat(value.wholesalerWages),
      };
    }
    if (value.housewifeWages && !isNaN(value.housewifeWages)) {
      value = {
        ...value,
        housewifeWages: parseFloat(value.housewifeWages),
      };
    }
    return value;
  }
}
