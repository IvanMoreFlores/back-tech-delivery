import { Test, TestingModule } from '@nestjs/testing';
import { BalanceElectricResolver } from '../balance-electric.resolver';
import { BalanceElectricService } from '../../services/balance-electric.service';
import { BalanceElectric } from '../../../domain/models/balance-electric.model';

describe('BalanceElectricResolver', () => {
  let resolver: BalanceElectricResolver;
  let service: BalanceElectricService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BalanceElectricResolver,
        {
          provide: BalanceElectricService,
          useValue: {
            getBalanceElectric: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<BalanceElectricResolver>(BalanceElectricResolver);
    service = module.get<BalanceElectricService>(BalanceElectricService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getBalanceElectric', () => {
    it('should return an array of BalanceElectric', async () => {
      const mockResult: BalanceElectric[] = [
        {
          date: '2025-04-22',
          generation: 1000,
        } as BalanceElectric,
      ];

      jest
        .spyOn(service, 'getBalanceElectric')
        .mockResolvedValueOnce(mockResult);

      const startDate = '2025-04-01';
      const endDate = '2025-04-22';
      const result = await resolver.getBalanceElectric(startDate, endDate);

      expect(service.getBalanceElectric).toHaveBeenCalledWith(
        startDate,
        endDate,
      );
      expect(result).toEqual(mockResult);
    });
  });
});
