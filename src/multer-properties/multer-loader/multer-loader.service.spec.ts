import { Test, TestingModule } from '@nestjs/testing';
import { MulterLoaderService } from './multer-loader.service';

describe('MulterLoaderService', () => {
  let service: MulterLoaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MulterLoaderService],
    }).compile();

    service = module.get<MulterLoaderService>(MulterLoaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
