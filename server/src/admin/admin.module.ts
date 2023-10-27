import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { fileProvider, productProvider } from 'src/common/provider/model.provider';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ global: true }), DatabaseModule],
  controllers: [AdminController],
  providers: [AdminService, ...productProvider, ...fileProvider]
})
export class AdminModule {}
