import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class BalanceElectric {
  @Field()
  date: string;

  @Field()
  generation: number;
  // si tenías "datetime", asegúrate que existe y tiene su decorador
  @Field({ nullable: true })
  datetime?: string;
}
