import {
  Controller,
  Post,
  UseInterceptors,
  Body,
  UseGuards,
  UploadedFile,
  HttpException,
  HttpStatus,
  UsePipes,
  HttpCode,
  Get,
  Delete,
  Query,
  Put,
  ParseFloatPipe,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PropImageConst } from 'src/common/constance';
import {
  AddProductPipe,
  ParseIntCreateProductPipe,
  ParseIntUpdateProductPipe,
} from './admin.pipe';
import { AdminService } from './admin.service';
import {
  CreateFileDto,
  CreateProductDto,
  CreateWagesDto,
  DeleteImagesDto,
  DeleteWagesDto,
  UpdateImageProductDto,
  UpdateProductDto,
  UpdateWagesDto,
} from './admin';
import { IReturnUploadImage } from './admin.interface';
import {
  CleanObjectPipe,
  JoiValidationArrayPipe,
  JoiValidationObjectPipe,
  ParseTagToArray,
} from 'src/common/pipes/common.pipe';
import {
  createFilesSchema,
  createProductSchema,
  createWagesSchema,
  deleteImagesSchema,
  deleteWagesSchema,
  updateImageProductSchema,
  updateProductSchema,
  updateWagesSchema,
} from 'src/common/schema/product.joi';
import {
  CreateFileGuard,
  CreateProductGuard,
  CreateWagesGuard,
  DeleteImagesGuard,
  DeleteProductGuard,
  DeleteWagesGuard,
  UpdateImageProductGuard,
  UpdateProductGuard,
  UpdateWagesGuard,
} from './admin.guard';
import {
  FindAllProductGuard,
  FindByIdProductGuard,
} from 'src/users/users.guard';
import { ICreateFile } from 'src/users/users.interface';

@Controller('admin')
// @UseGuards(AccessAdminGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  // @Post('upload_image')
  // @HttpCode(HttpStatus.OK)
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     limits: { fieldSize: PropImageConst.MAX_SIZE_MG },
  //     fileFilter(req, file, cb) {
  //       if (!PropImageConst.MIME_TYPES.includes(file.mimetype)) {
  //         cb(
  //           new HttpException('فرمت فایل پذیرفته نیست', HttpStatus.BAD_REQUEST),
  //           false,
  //         );
  //       }
  //       cb(null, true);
  //     },
  //     storage: diskStorage({
  //       destination: (req, file, cb) => {
  //         cb(null, 'public/images/product');
  //       },
  //       filename: (req, file, cb) => {
  //         const uniqueSuffix =
  //           Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         const ext = extname(file.originalname);
  //         const filename = `${
  //           file.originalname.split('.')[0]
  //         }-${uniqueSuffix}${ext}`;
  //         cb(null, filename);
  //       },
  //     }),
  //   }),
  // )
  // @UsePipes(AddProductPipe)
  // uploadImageProduct(
  //   @UploadedFile()
  //   image: Express.Multer.File,
  // ): Promise<IReturnUploadImage> {
  //   return this.adminService.uploadImageProduct(image);
  // }

  @Post('create_wages_product')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(CreateWagesGuard)
  addWages(
    @Body('', new JoiValidationArrayPipe(createWagesSchema))
    data: CreateWagesDto[],
    @Query('user_id', ParseIntPipe) userId: number,
  ) {
    return this.adminService.createWages(data, userId);
  }

  @Post('create_files')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(CreateFileGuard)
  @UsePipes(new JoiValidationArrayPipe(createFilesSchema))
  addImage(@Body() data: CreateFileDto[]) {
    return this.adminService.createFile(data);
  }

  @Get('uploaded_image')
  @HttpCode(HttpStatus.CREATED)
  getUploadImageProduct() {
    return this.adminService.getUploadImageProduct();
  }

  @Post('create_product')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(CreateProductGuard)
  createProduct(
    @Body('', new JoiValidationObjectPipe(createProductSchema))
    body: CreateProductDto,
    @Query('user_id', ParseIntPipe) userId: number,
  ) {
    return this.adminService.createProduct(body, userId);
  }

  @Delete('delete_product')
  @HttpCode(HttpStatus.OK)
  @UseGuards(DeleteProductGuard)
  deleteProduct(@Query('id', ParseIntPipe) id: number) {
    return this.adminService.deleteProduct(id);
  }

  @Put('update_product')
  @HttpCode(HttpStatus.OK)
  @UseGuards(UpdateProductGuard)
  @UsePipes(new JoiValidationObjectPipe(updateProductSchema))
  @UsePipes(CleanObjectPipe)
  updateProduct(@Body() data: UpdateProductDto) {
    return this.adminService.updateProduct(data);
  }

  @Get('find_product')
  @HttpCode(HttpStatus.OK)
  @UseGuards(FindByIdProductGuard)
  findByIdProduct(@Query('id', ParseIntPipe) id: number) {
    return this.adminService.findByIdProduct(id);
  }

  @Get('find_products')
  @HttpCode(HttpStatus.OK)
  @UseGuards(FindAllProductGuard)
  findAllProducts(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('from', ParseIntPipe) from: number,
  ) {
    return this.adminService.findAllProducts(limit, from);
  }

  @Put('update_wages_product')
  @UseGuards(UpdateWagesGuard)
  updateWages(
    @Body('', new JoiValidationArrayPipe(updateWagesSchema))
    data: UpdateWagesDto[],
    @Query('user_id', ParseIntPipe) userId: number,
  ) {
    return this.adminService.updateWages(data, userId);
  }

  @Put('update_image_product')
  @UseGuards(UpdateImageProductGuard)
  @UsePipes(new JoiValidationObjectPipe(updateImageProductSchema))
  updateImageProduct(@Body() data: UpdateImageProductDto) {
    return this.adminService.updateImageProduct(data);
  }

  @Delete('delete_wages_product')
  @UseGuards(DeleteWagesGuard)
  deleteWages(
    @Body('', new JoiValidationArrayPipe(deleteWagesSchema))
    data: DeleteWagesDto[],
    @Query('user_id', ParseIntPipe) userId: number,
  ) {
    return this.adminService.deleteWages(data, userId);
  }

  @Delete('delete_images_product')
  @UseGuards(DeleteImagesGuard)
  @UsePipes(new JoiValidationArrayPipe(deleteImagesSchema))
  deleteImages(@Body() data: DeleteImagesDto[]) {
    // return this.adminService.deleteImages(data);
  }
}
