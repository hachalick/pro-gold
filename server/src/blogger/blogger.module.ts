import { Module } from '@nestjs/common';
import { BloggerController } from './blogger.controller';
import { BloggerService } from './blogger.service';

@Module({
  controllers: [BloggerController],
  providers: [BloggerService]
})
export class BloggerModule {}
