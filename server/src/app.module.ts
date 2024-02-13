import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ViewerModule } from './viewer/viewer.module';
import { AdminModule } from './admin/admin.module';
import { TokenModule } from './token/token.module';
import { MemberModule } from './member/member.module';
import { BloggerModule } from './blogger/blogger.module';
import { UsersModule } from './users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import { MysqlModule } from 'nest-mysql';
import { EntityModule } from './entity/entity.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    MysqlModule.forRoot({
      host: '127.0.0.1',
      database: 'talajalali',
      password: process.env.PASSWORD_MYSQL,
      user: 'root',
      port: 3306,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: '127.0.0.1',
    //   port: 3306,
    //   username: 'root',
    //   password: process.env.PASSWORD_MYSQL,
    //   database: 'testnode',
    //   entities: ["dist/common/entities/*.entity.{ts,js}"],
    //   synchronize: true,
    // }),
    ViewerModule,
    AdminModule,
    // TokenModule,
    // MemberModule,
    // BloggerModule,
    UsersModule,
    EntityModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    process.env.NODE_ENV !== 'prod' &&
      consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
