import { Test, TestingModule } from '@nestjs/testing';
import { MongodbPropertiesService } from './mongodb-properties.service';

describe('MongodbPropertiesService', () => {
  let service: MongodbPropertiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongodbPropertiesService],
    }).compile();

    service = module.get<MongodbPropertiesService>(MongodbPropertiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
