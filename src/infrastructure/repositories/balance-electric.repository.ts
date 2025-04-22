import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BalanceElectric } from '../../domain/models/balance-electric.model';

@Injectable()
export class BalanceElectricRepository {
  constructor(
    @InjectModel(BalanceElectric.name)
    private balanceElectricModel: Model<BalanceElectric>,
  ) {}

  async save(data: BalanceElectric[]): Promise<BalanceElectric[]> {
    return this.balanceElectricModel.insertMany(data);
  }
}
