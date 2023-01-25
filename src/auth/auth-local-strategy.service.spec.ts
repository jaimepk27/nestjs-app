import { Test, TestingModule } from '@nestjs/testing';
import { AuthLocalStrategyService } from './auth-local-strategy.service';

describe('AuthLocalStrategyService', () => {
  let service: AuthLocalStrategyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthLocalStrategyService],
    }).compile();

    service = module.get<AuthLocalStrategyService>(AuthLocalStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
