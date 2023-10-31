import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}
  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}

@Injectable()
export class JoiValidationExistingPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}
  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate({ mobile: value });
    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}

@Injectable()
export class CommonPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}

@Injectable()
export class CleanObjectPipe implements PipeTransform {
  transform(value: Object, metadata: ArgumentMetadata) {
    Object.keys(value).forEach((key) => {
      if (
        value[key] === undefined ||
        value[key] === null ||
        value[key] === ''
      ) {
        delete value[key];
      }
    });
    return value;
  }
}

@Injectable()
export class ParseTagToArray implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, 1);
    const arr = value.tags.split('#');
    arr.shift()
    const newArrTags = arr.map((tag) => '#' + tag);
    value.tags = newArrTags;
    return value;
  }
}
