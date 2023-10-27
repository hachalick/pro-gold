import { Test, TestingModule } from '@nestjs/testing';
import { BloggerService } from './blogger.service';

describe('BloggerService', () => {
  let service: BloggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BloggerService],
    }).compile();

    service = module.get<BloggerService>(BloggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
