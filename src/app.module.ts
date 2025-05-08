import { Module } from '@nestjs/common';
import { EvmModule } from './evm/evm.module';
import { CosmosModule } from './cosmos/cosmos.module';
import { AppController } from './app.controller';

@Module({
  imports: [EvmModule, CosmosModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
