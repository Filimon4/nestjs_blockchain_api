import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CosmosService } from './cosmos.service';

@Controller('cosmos')
export class CosmosController {
  constructor(private readonly cosmosService: CosmosService) {}

  @Get('block/:height')
  async getBlock(@Param('height', ParseIntPipe) height: number) {
    return await this.cosmosService.getBlockByNumber(height);
  }

  @Get('transactions/:hash')
  async getTransactions(@Param('hash') hash: string) {
    return await this.cosmosService.getTransactionByHash(hash);
  }
}
