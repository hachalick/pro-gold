import { Test, TestingModule } from '@nestjs/testing';
import { ViewerController } from './viewer.controller';

describe('ViewerController', () => {
  let controller: ViewerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViewerController],
    }).compile();

    controller = module.get<ViewerController>(ViewerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
