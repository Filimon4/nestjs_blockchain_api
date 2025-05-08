import { HttpService } from '@nestjs/axios';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  CosmosBlock,
  CosmosBlockByNumber,
  CosmosResponse,
  CosmosRpcClient,
  CosmosTransaction,
  CosmosTransactionByHash,
} from './cosmos.types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CosmosApi extends CosmosRpcClient {
  private readonly rpcUrl = 'https://sei-m.rpc.n0ok.net';

  constructor(private readonly http: HttpService) {
    super();
  }
  // region private

  private async sendRpc<T extends CosmosResponse>(
    endpoint: string,
    body: Record<string, string | number>,
    params: Record<string, string | number | boolean>,
  ): Promise<T> {
    const response = await firstValueFrom(
      this.http.post<T>(`${this.rpcUrl}/${endpoint}`, body, {
        params: params,
      }),
    );
    return response.data;
  }

  // region public

  async getBlockByNumber(blockNumber: number): Promise<CosmosBlockByNumber> {
    const endpoint = 'block';
    const params = {
      height: blockNumber,
    };

    const response = await this.sendRpc<CosmosBlock>(endpoint, {}, params);
    if (!response?.block)
      throw new UnprocessableEntityException('Cannot get block');

    return {
      hash: response.block_id.hash,
      height: response.block.header.height,
      proposedAddress: response.block.header.proposer_address,
      time: new Date(response.block.header.time),
    };
  }

  async getTransactionByHash(hash: string): Promise<CosmosTransactionByHash> {
    const endpoint = 'tx';
    const params = {
      hash: hash,
      prove: false,
    };

    const response = await this.sendRpc<CosmosTransaction>(
      endpoint,
      {},
      params,
    );
    if (!response.data?.hash)
      throw new UnprocessableEntityException('Cannot get transaction');

    return {
      fee: response.data.fee,
      gasUsed: response.data.gasUsed,
      gasWanted: response.data.gasWanted,
      hash: response.data.hash,
      height: response.data.height,
      sender: response.data.sender,
      time: new Date(response.data.time),
    };
  }
}
