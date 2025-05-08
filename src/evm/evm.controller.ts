import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EvmService } from './evm.service';
import { ParseHexPipe } from '@src/shared/pipes/parseHex.pipe';
import { hex } from '@src/thirdApi/evm/evm.types';

@Controller('evm')
export class EvmController {
  constructor(private readonly evmService: EvmService) {}

  @Get('block/all/latest')
  async getLatestBlock() {
    return await this.evmService.getLatestBlock();
  }

  @Get('block/:height')
  async getBlock(@Param('height', ParseIntPipe, ParseHexPipe) height: hex) {
    return await this.evmService.getBlock(height);
  }

  @Get('transactions/:hash')
  async getTransaction(@Param('hash', ParseHexPipe) hash: hex) {
    return await this.evmService.getTransaction(hash);
  }
}
