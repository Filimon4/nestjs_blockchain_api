export type CosmosResponse = CosmosBlock | CosmosTransaction;

export interface CosmosBlock {
  block_id: {
    hash: string;
    parts: {
      total: number;
      hash: string;
    };
  };
  block: {
    header: {
      time: string;
      proposer_address: string;
      height: string;
    };
  };
}

export interface CosmosTransaction {
  data: {
    hash: string;
    height: string;
    time: string;
    gasUsed: boolean;
    gasWanted: boolean;
    fee: string;
    sender: string;
  };
}

export interface CosmosTransactionByHash {
  hash: string;
  height: string;
  time: Date;
  gasUsed: boolean;
  gasWanted: boolean;
  fee: string;
  sender: string;
}

export interface CosmosBlockByNumber {
  height: string;
  time: Date;
  hash: string;
  proposedAddress: string;
}

export abstract class CosmosRpcClient {
  abstract getBlockByNumber(blockNumber: number): Promise<CosmosBlockByNumber>;
  abstract getTransactionByHash(hash: string): Promise<CosmosTransactionByHash>;
}
