import { Module } from '@nestjs/common';
import { CosmosController } from './cosmos.controller';
import { CosmosService } from './cosmos.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CosmosController],
  providers: [CosmosService],
})
export class CosmosModule {}
