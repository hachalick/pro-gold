import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ViewerModule } from './viewer/viewer.module';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './admin/admin.module';
import { TokenModule } from './token/token.module';
import { MemberModule } from './member/member.module';
import { BloggerModule } from './blogger/blogger.module';
import { UsersModule } from './users/users.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/config/env/.${
        process.env.NODE_ENV
      }.env`,
      isGlobal: true,
    }),
    MulterModule.register({
      dest: '../public',
    }),
    DatabaseModule,
    ViewerModule,
    AdminModule,
    TokenModule,
    MemberModule,
    BloggerModule,
    UsersModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    process.env.NODE_ENV !== 'prod' &&
      consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
