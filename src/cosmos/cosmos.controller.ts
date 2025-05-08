import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

@Controller('cosmos')
export class CosmosController {
  @Get('block/:height')
  getBlock(@Param('height', ParseIntPipe) height: number) {
    console.log(height);
  }

  @Get('transactions/:hash')
  getTransactions(@Param('hash') hash: string) {
    console.log(hash);
  }
}
