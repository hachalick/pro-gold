import { Module } from '@nestjs/common';
import { ViewerController } from './viewer.controller';
import { ViewerService } from './viewer.service';
import { DatabaseModule } from 'src/database/database.module';
import { otpProvider } from './viewer-model.provider';
import { userProvider } from 'src/common/provider/model.provider';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ global: true }), DatabaseModule],
  controllers: [ViewerController],
  providers: [ViewerService, ...otpProvider, ...userProvider],
})
export class ViewerModule {}
