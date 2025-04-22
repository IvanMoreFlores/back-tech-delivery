import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BalanceElectricResolver } from './balance-electric.resolver';
import { BalanceElectricService } from '../services/balance-electric.service';
import { BalanceElectricRepository } from '../repositories/balance-electric.repository';
import {
  BalanceElectric,
  BalanceElectricSchema,
} from './schemas/balance-electric.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BalanceElectric.name, schema: BalanceElectricSchema },
    ]),
  ],
  providers: [
    BalanceElectricResolver, // GraphQL resolver
    BalanceElectricService, // Application service
    BalanceElectricRepository, // Repository (MUST be included!)
  ],
})
export class BalanceElectricModule {}
