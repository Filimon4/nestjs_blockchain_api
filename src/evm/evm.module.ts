import { Module } from '@nestjs/common';
import { EvmController } from './evm.controller';
import { EvmService } from './evm.service';
import { EvmApi } from '../thirdApi/evm/evm.api';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [EvmController],
  providers: [EvmService, EvmApi],
})
export class EvmModule {}
