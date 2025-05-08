export enum EvmRpcMethod {
  'eth_blockNumber' = 'eth_blockNumber',
  'eth_getBlockByNumber' = 'eth_getBlockByNumber',
  'eth_getTransactionByHash' = 'eth_getTransactionByHash',
}

export interface EvmRpcRequest<T = unknown[]> {
  jsonrpc: '2.0';
  method: EvmRpcMethod;
  params: T;
  id: number | string;
}

export interface EvmRpcResponse<T = unknown> {
  jsonrpc: '2.0';
  id: number | string;
  result: T | null;
  error?: {
    code: number;
    message: string;
  };
}

export interface EvmBlock {
  number: hex;
  hash: hex;
  parentHash: hex;
  gasLimit: hex;
  gasUsed: hex;
  size: hex;
  transactionsRoot: hex;
}

export interface EvmTransaction {
  hash: hex;
  to: hex;
  from: hex;
  value: hex;
  input: hex;
  maxFeePerGas: hex;
  maxPriorityFeePerGas: hex;
  gasPrice: hex;
}

export interface EvmBlockByNumber extends Omit<EvmBlock, 'number'> {
  height: hex;
}

export type hex = `0x${string}`;

export abstract class EvmRpcClient {
  abstract getLatestBlockNumber(): Promise<hex>;
  abstract getBlockByNumber(blockNumber: hex): Promise<EvmBlockByNumber>;
  abstract getTransactionByHash(hash: hex): Promise<EvmTransaction>;
}
