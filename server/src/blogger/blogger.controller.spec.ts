import { Test, TestingModule } from '@nestjs/testing';
import { BloggerController } from './blogger.controller';

describe('BloggerController', () => {
  let controller: BloggerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BloggerController],
    }).compile();

    controller = module.get<BloggerController>(BloggerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
