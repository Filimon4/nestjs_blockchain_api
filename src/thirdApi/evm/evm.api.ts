import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  EvmRpcClient,
  EvmRpcRequest,
  EvmRpcResponse,
  EvmBlock,
  hex,
  EvmBlockByNumber,
  EvmRpcMethod,
  EvmTransaction,
} from './evm.types';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class EvmApi extends EvmRpcClient {
  private readonly rpcUrl = 'https://evmos-evm-rpc.publicnode.com';

  constructor(private readonly http: HttpService) {
    super();
  }

  // region private

  private async sendRpc<T = any>(
    body: EvmRpcRequest,
  ): Promise<EvmRpcResponse<T>> {
    const response = await firstValueFrom(
      this.http.post<EvmRpcResponse<T>>(this.rpcUrl, body),
    );
    return response.data;
  }

  // region public

  async getLatestBlockNumber(): Promise<hex> {
    const body: EvmRpcRequest = {
      id: '1',
      jsonrpc: '2.0',
      method: EvmRpcMethod.eth_blockNumber,
      params: [],
    };

    const response = await this.sendRpc<hex>(body);
    if (!response.result)
      throw new UnprocessableEntityException('Failed to fetch block number');
    return response.result;
  }

  async getBlockByNumber(blockNumber: hex): Promise<EvmBlockByNumber> {
    const body: EvmRpcRequest = {
      jsonrpc: '2.0',
      method: EvmRpcMethod.eth_getBlockByNumber,
      params: [blockNumber, false],
      id: 2,
    };

    const response = await this.sendRpc<EvmBlock>(body);
    if (!response.result)
      throw new UnprocessableEntityException('Block not found');

    const resultData = response.result;

    return {
      height: resultData.number,
      hash: resultData.hash,
      parentHash: resultData.parentHash,
      gasLimit: resultData.gasLimit,
      gasUsed: resultData.gasUsed,
      size: resultData.size,
      transactionsRoot: resultData.transactionsRoot,
    };
  }

  async getTransactionByHash(hash: hex): Promise<EvmTransaction> {
    const body: EvmRpcRequest = {
      id: '1',
      jsonrpc: '2.0',
      method: EvmRpcMethod.eth_getTransactionByHash,
      params: [hash],
    };
    const response = await this.sendRpc<EvmTransaction>(body);
    if (!response.result)
      throw new UnprocessableEntityException('Transaction not found');
    const resultData = response.result;

    return {
      hash: resultData.hash,
      to: resultData.to,
      from: resultData.from,
      value: resultData.value,
      input: resultData.input,
      maxFeePerGas: resultData.maxFeePerGas,
      maxPriorityFeePerGas: resultData.maxPriorityFeePerGas,
      gasPrice: resultData.gasPrice,
    };
  }
}
