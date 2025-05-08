import { Module } from '@nestjs/common';
import { CosmosController } from './cosmos.controller';
import { CosmosService } from './cosmos.service';
import { HttpModule } from '@nestjs/axios';
import { CosmosApi } from 'src/thirdApi/cosmos/cosmos.api';

@Module({
  imports: [HttpModule],
  controllers: [CosmosController],
  providers: [CosmosService, CosmosApi],
})
export class CosmosModule {}
