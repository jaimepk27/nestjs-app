import { Test, TestingModule } from '@nestjs/testing';
import { JwtLoaderService } from './jwt-loader.service';

describe('JwtLoaderService', () => {
  let service: JwtLoaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtLoaderService],
    }).compile();

    service = module.get<JwtLoaderService>(JwtLoaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
