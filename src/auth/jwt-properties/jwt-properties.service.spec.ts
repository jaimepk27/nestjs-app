import { Test, TestingModule } from '@nestjs/testing';
import { JwtPropertiesService } from './jwt-properties.service';

describe('JwtPropertiesService', () => {
  let service: JwtPropertiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtPropertiesService],
    }).compile();

    service = module.get<JwtPropertiesService>(JwtPropertiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
