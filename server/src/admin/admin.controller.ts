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
  Param,
  Put,
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
import { CreateProductDto, UpdateProductDto } from './admin';
import { IReturnUploadImage } from './admin.interface';
import { CleanObjectPipe, JoiValidationPipe } from 'src/common/pipes/common.pipe';
import {
  createProductSchema,
  accurateSearchProductsSchema,
  updateProductSchema,
} from 'src/common/schema/product.schema';
import { CreateProductGuard, DeleteProductGuard, UpdateProductGuard } from './admin.guard';
import { ObjectId } from 'mongoose';
import { AccurateSearchProductsDto } from 'src/users/users';
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('upload_image')
  @HttpCode(HttpStatus.OK)
  getUploadImageProduct() {
    return this.adminService.getUploadImageProduct();
  }

  @Post('upload_image')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fieldSize: PropImageConst.MAX_SIZE_MG },
      fileFilter(req, file, cb) {
        if (!PropImageConst.MIME_TYPES.includes(file.mimetype)) {
          cb(
            new HttpException('فرمت فایل پذیرفته نیست', HttpStatus.BAD_REQUEST),
            false,
          );
        }
        cb(null, true);
      },
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'public/images/product');
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${
            file.originalname.split('.')[0]
          }-${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  @UsePipes(AddProductPipe)
  uploadImageProduct(
    @UploadedFile()
    image: Express.Multer.File,
  ): Promise<IReturnUploadImage> {
    return this.adminService.uploadImageProduct(image);
  }

  @Post('create_product')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(CreateProductGuard)
  @UsePipes(new JoiValidationPipe(createProductSchema))
  @UsePipes(ParseIntCreateProductPipe)
  createProduct(@Body() body: CreateProductDto) {
    return this.adminService.createProduct(body);
  }
  
  @Delete('delete_product')
  @HttpCode(HttpStatus.OK)
  @UseGuards(DeleteProductGuard)
  deleteProduct(@Query('id') id: ObjectId | undefined) {
    return this.adminService.deleteProduct(id);
  }
  
  @Put('update_product')
  @HttpCode(HttpStatus.OK)
  @UseGuards(UpdateProductGuard)
  @UsePipes(new JoiValidationPipe(updateProductSchema))
  @UsePipes(ParseIntUpdateProductPipe)
  @UsePipes(CleanObjectPipe)
  updateProduct(@Body() product: UpdateProductDto) {
    return this.adminService.updateProduct(product);
  }
  
  @Get('accurate_search_product')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new JoiValidationPipe(accurateSearchProductsSchema))
  @UsePipes(CleanObjectPipe)
  accurateSearchProducts(@Query() query: AccurateSearchProductsDto) {
    return this.adminService.accurateSearchProducts(query);
  }

  @Get('overall_search_product')
  @HttpCode(HttpStatus.OK)
  overallSearchProducts(@Query('key') key : string ) {
    return this.adminService.overallSearchProducts(key);
  }
}
