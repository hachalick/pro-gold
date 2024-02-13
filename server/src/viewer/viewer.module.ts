import { Module } from '@nestjs/common';
import { ViewerController } from './viewer.controller';
import { ViewerService } from './viewer.service';
import { JwtModule } from '@nestjs/jwt';
import { EntityModule } from 'src/entity/entity.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from 'src/common/entities/otp.entity';

@Module({
  imports: [
    JwtModule.register({ global: true }),
    EntityModule,
  ],
  controllers: [ViewerController],
  providers: [ViewerService],
})
export class ViewerModule {}
