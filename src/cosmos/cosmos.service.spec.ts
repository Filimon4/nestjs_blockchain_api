import { Test, TestingModule } from '@nestjs/testing';
import { CosmosService } from './cosmos.service';
import { CosmosApi } from '@src/thirdApi/cosmos/cosmos.api';

describe('CosmosService', () => {
  let service: CosmosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CosmosService,
        {
          provide: CosmosApi,
          useValue: {
            someMethod: jest.fn().mockReturnValue('some mock value'),
          },
        },
      ],
    }).compile();

    service = module.get<CosmosService>(CosmosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
