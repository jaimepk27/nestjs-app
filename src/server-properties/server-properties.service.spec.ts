import { Test, TestingModule } from '@nestjs/testing';
import { ServerPropertiesService } from './server-properties.service';

describe('ServerPropertiesService', () => {
  let service: ServerPropertiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServerPropertiesService],
    }).compile();

    service = module.get<ServerPropertiesService>(ServerPropertiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
