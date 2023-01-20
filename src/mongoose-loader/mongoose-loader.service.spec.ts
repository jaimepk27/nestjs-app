import { Test, TestingModule } from '@nestjs/testing';
import { MongooseLoaderService } from './mongoose-loader.service';

describe('MongooseLoaderService', () => {
  let service: MongooseLoaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongooseLoaderService],
    }).compile();

    service = module.get<MongooseLoaderService>(MongooseLoaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
