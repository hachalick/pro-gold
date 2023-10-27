import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UsePipes,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { CanSignUpDto, LoginDto, OtpDto } from './viewer';
import { ViewerService } from './viewer.service';
import {
  JoiValidationExistingPipe,
  JoiValidationPipe,
} from 'src/common/pipes/common.pipe';
import { LoginGuard, OtpGuard } from './viewer.guard';
import { canSignUpSchema, loginSchema, otpSchema } from './viewer.schema';
import { IReturnLogin, IReturnOtp } from './viewer.interface';

@Controller('viewer')
export class ViewerController {
  constructor(private viewerService: ViewerService) {}

  @Post('otp')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(OtpGuard)
  @UsePipes(new JoiValidationPipe(otpSchema))
  async otp(@Body() OtpDto: OtpDto): Promise<IReturnOtp> {
    return this.viewerService.Otp(OtpDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(LoginGuard)
  @UsePipes(new JoiValidationPipe(loginSchema))
  async login(@Body() loginDto: LoginDto): Promise<IReturnLogin> {
    return this.viewerService.Login(loginDto);
  }

  @Get('can-signup')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new JoiValidationExistingPipe(canSignUpSchema))
  async canSignUp(
    @Query('mobile') canSignUpDto: CanSignUpDto,
  ): Promise<boolean> {
    return this.viewerService.canSignUp(canSignUpDto);
  }
}
