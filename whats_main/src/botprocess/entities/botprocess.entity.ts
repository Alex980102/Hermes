import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BotprocessDocument = Botprocess & Document;

@Schema({timestamps: true})
export class Botprocess {
  @Prop()
  botProcessId: string;

  @Prop()
  port: number;

  @Prop()
  status: string;

  @Prop()
  pm2_name: string;

  @Prop()
  path: string;
}

export const BotprocessSchema = SchemaFactory.createForClass(Botprocess);
