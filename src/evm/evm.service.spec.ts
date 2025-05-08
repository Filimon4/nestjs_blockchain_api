import { Test, TestingModule } from '@nestjs/testing';
import { EvmService } from './evm.service';
import { EvmApi } from '@src/thirdApi/evm/evm.api';

describe('EvmService', () => {
  let service: EvmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvmService,
        {
          provide: EvmApi,
          useValue: {
            someMethod: jest.fn().mockReturnValue('some mock value'),
          },
        },
      ],
    }).compile();

    service = module.get<EvmService>(EvmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
