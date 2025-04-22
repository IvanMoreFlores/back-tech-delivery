import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { BalanceElectric } from '../../domain/models/balance-electric.model';
import { BalanceElectricRepository } from '../repositories/balance-electric.repository';

@Injectable()
export class BalanceElectricService {
  constructor(
    private readonly balanceElectricRepository: BalanceElectricRepository,
  ) {}

  async getBalanceElectric(
    startDate: string,
    endDate: string,
  ): Promise<BalanceElectric[]> {
    try {
      const { data } = await axios.get(
        `https://apidatos.ree.es/es/datos/balance/balance-electrico?start_date=${startDate}&end_date=${endDate}&time_trunc=day`,
      );
      const balanceElectricData = this.transformData(data);
      return this.balanceElectricRepository.save(balanceElectricData);
    } catch (error) {
      console.error('Error fetching balance electric data:', error);
      throw new Error('Failed to fetch and save balance electric data');
    }
  }

  private transformData(apiResponse: any): BalanceElectric[] {
    if (!apiResponse.included || apiResponse.included.length === 0) {
      throw new Error('Missing data in API response');
    }

    const renewableContent = apiResponse.included.find(
      (item: any) => item.type === 'Renovable',
    );

    if (
      !renewableContent ||
      !renewableContent.attributes ||
      !renewableContent.attributes.content
    ) {
      throw new Error('Missing content in Renewable data');
    }

    const generationData = renewableContent.attributes.content.find(
      (item: any) => item.type === 'Generación renovable',
    )?.attributes.values;

    if (!generationData) {
      throw new Error('Missing generation values in Renewable content');
    }

    return generationData.map((item: any) => ({
      datetime: item.datetime,
      generation: item.value,
    }));
  }
}
