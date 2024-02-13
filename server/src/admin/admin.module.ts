import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtModule } from '@nestjs/jwt';
import { EntityModule } from 'src/entity/entity.module';
import { AdminMiddleware } from './admin.middleware';

@Module({
  imports: [JwtModule.register({ global: true }), EntityModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .forRoutes(
        { path: 'admin/create_product', method: RequestMethod.POST },
        { path: 'admin/update_wages_product', method: RequestMethod.PUT },
        { path: 'admin/create_wages_product', method: RequestMethod.POST },
        { path: 'admin/delete_wages_product', method: RequestMethod.DELETE },
      );
  }
}
