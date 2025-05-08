import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { EvmApi } from 'src/thirdApi/evm/evm.api';
import { hex } from 'src/thirdApi/evm/evm.types';

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

  async getBlock(id: hex) {
    return await this.evmApi.getBlockByNumber(id);
  }

  async getTransaction(hash: hex) {
    return await this.evmApi.getTransactionByHash(hash);
  }
}
