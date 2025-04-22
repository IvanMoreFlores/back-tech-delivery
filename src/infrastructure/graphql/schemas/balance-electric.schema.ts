import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BalanceElectricDocument = BalanceElectric & Document;

@Schema({ timestamps: true })
export class BalanceElectric {
  @Prop({ required: true })
  datetime: string;

  @Prop({ required: true })
  generation: number;
}

export const BalanceElectricSchema =
  SchemaFactory.createForClass(BalanceElectric);
