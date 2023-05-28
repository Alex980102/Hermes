import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SendparamDocument = Sendparam & Document;

@Schema({ timestamps: true })
export class Sendparam {
  @Prop({ type: Number, default: 0 })
  seq: number;

  @Prop({ default: 5 })
  minValue: number;

  @Prop({ default: 12 })
  maxValue: number;
}

export const SendparamSchema = SchemaFactory.createForClass(Sendparam);
