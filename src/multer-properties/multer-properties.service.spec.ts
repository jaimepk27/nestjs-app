import { Test, TestingModule } from '@nestjs/testing';
import { MulterPropertiesService } from './multer-properties.service';

describe('MulterPropertiesService', () => {
  let service: MulterPropertiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MulterPropertiesService],
    }).compile();

    service = module.get<MulterPropertiesService>(MulterPropertiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
