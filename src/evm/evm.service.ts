import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { EvmApi } from 'src/thirdApi/evm/evm.api';

@Injectable()
export class EvmService {
  constructor(
    private readonly httpService: HttpService,
    private readonly evmApi: EvmApi,
  ) {}

  async getLatestBlock() {
    const latestBlockHex = await this.evmApi.getLatestBlockNumber();
    const latestBlockNumber = Number(latestBlockHex);
    return {
      latestHex: latestBlockHex,
      latestNumber: latestBlockNumber,
    };
  }

  async getBlock(id: number) {
    const idHex = EvmApi.praseHex(id);
    return await this.evmApi.getBlockByNumber(idHex);
  }

  async getTransaction(hash: string) {
    EvmApi.assertHex(hash);
    return await this.evmApi.getTransactionByHash(hash);
  }
}
