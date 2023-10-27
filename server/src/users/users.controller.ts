import {
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { FindByIdProductGuard } from './users.guard';
import { ObjectId } from 'mongoose';
import { UsersService } from './users.service';
import {
  CleanObjectPipe,
  JoiValidationPipe,
} from 'src/common/pipes/common.pipe';
import { accurateSearchProductsSchema } from 'src/common/schema/product.schema';
import { AccurateSearchProductsDto } from './users';
import { RolesEnum } from 'src/common/enum/role.enum';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('find_id_product')
  @HttpCode(HttpStatus.OK)
  @UseGuards(FindByIdProductGuard)
  findByIdProduct(@Query('id') id: ObjectId, @Headers('role') role: RolesEnum) {
    return this.userService.findByIdProduct(id, role);
  }

  @Get('accurate_search_product')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new JoiValidationPipe(accurateSearchProductsSchema))
  @UsePipes(CleanObjectPipe)
  accurateSearchProducts(
    @Query() query: AccurateSearchProductsDto,
    @Headers('role') role: RolesEnum,
  ) {
    return this.userService.accurateSearchProducts(query, role);
  }

  @Get('overall_search_product')
  @HttpCode(HttpStatus.OK)
  overallSearchProducts(
    @Query('key') key: string,
    @Headers('role') role: RolesEnum,
  ) {
    return this.userService.overallSearchProducts(key, role);
  }
}
