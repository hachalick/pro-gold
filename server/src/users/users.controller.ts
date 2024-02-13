import {
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { FindAllProductGuard, FindByIdProductGuard } from './users.guard';
import { ObjectId } from 'mongoose';
import { UsersService } from './users.service';
import {
  CleanObjectPipe,
  JoiValidationObjectPipe,
} from 'src/common/pipes/common.pipe';
import { RolesEnum } from 'src/common/enum/role.enum';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('find_product')
  @HttpCode(HttpStatus.OK)
  @UseGuards(FindByIdProductGuard)
  findByIdProduct(
    @Query('id', ParseIntPipe) id: number,
    @Headers('role') role: RolesEnum,
  ) {
    return this.userService.findByIdProduct(id, role);
  }

  @Get('find_products')
  @HttpCode(HttpStatus.OK)
  @UseGuards(FindAllProductGuard)
  findAllProducts(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('from', ParseIntPipe) from: number,
    @Headers('role') role: RolesEnum,
  ) {
    return this.userService.findAllProducts(limit, from, role);
  }

  @Get('count_products')
  numberOfProduct() {
    return this.userService.numberOfProduct()
  }


  // @Get('accurate_search_product')
  // @HttpCode(HttpStatus.OK)
  // @UsePipes(new JoiValidationObjectPipe(accurateSearchProductsSchema))
  // @UsePipes(CleanObjectPipe)
  // accurateSearchProducts(
  //   @Query() query: AccurateSearchProductsDto,
  //   @Headers('role') role: RolesEnum,
  // ) {
  //   return this.userService.accurateSearchProducts(query, role);
  // }

  // @Get('overall_search_product')
  // @HttpCode(HttpStatus.OK)
  // overallSearchProducts(
  //   @Query('key') key: string,
  //   @Headers('role') role: RolesEnum,
  // ) {
  //   return this.userService.overallSearchProducts(key, role);
  // }
}
