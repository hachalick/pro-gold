import { Test, TestingModule } from '@nestjs/testing';
import { ViewerService } from './viewer.service';

describe('ViewerService', () => {
  let service: ViewerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ViewerService],
    }).compile();

    service = module.get<ViewerService>(ViewerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
