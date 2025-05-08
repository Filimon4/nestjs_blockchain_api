import { Controller, Get, Param } from '@nestjs/common';
import { EvmService } from './evm.service';

@Controller('evm')
export class EvmController {
  constructor(private readonly evmService: EvmService) {}

  @Get('block/all/latest')
  async getLatestBlock() {
    return await this.evmService.getLatestBlock();
  }

  @Get('block/:height')
  async getBlock(@Param('height') height: number) {
    return await this.evmService.getBlock(height);
  }

  @Get('transactions/:hash')
  async getTransaction(@Param('hash') hash: string) {
    return await this.evmService.getTransaction(hash);
  }
}
