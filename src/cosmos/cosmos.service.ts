import { Injectable } from '@nestjs/common';
import { CosmosApi } from '@src/thirdApi/cosmos/cosmos.api';

@Injectable()
export class CosmosService {
  constructor(private readonly cosmosApi: CosmosApi) {}

  async getBlockByNumber(id: number) {
    return await this.cosmosApi.getBlockByNumber(id);
  }

  async getTransactionByHash(hash: string) {
    return await this.cosmosApi.getTransactionByHash(hash);
  }
}
