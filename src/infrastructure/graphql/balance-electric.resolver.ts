import { Resolver, Query, Args } from '@nestjs/graphql';
import { BalanceElectricService } from '../services/balance-electric.service';
import { BalanceElectric } from '../../domain/models/balance-electric.model';

@Resolver(() => BalanceElectric)
export class BalanceElectricResolver {
  constructor(
    private readonly balanceElectricService: BalanceElectricService,
  ) {}

  @Query(() => [BalanceElectric])
  async getBalanceElectric(
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ) {
    return this.balanceElectricService.getBalanceElectric(startDate, endDate);
  }
}
