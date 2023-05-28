import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MessengerDocument = Messenger & Document;

@Schema({timestamps: true})
export class Messenger {
  @Prop()
  messengerId: string;

  @Prop()
  phone: string;

  @Prop()
  region: string;

  @Prop()
  botProcessId: string | null;
}

export const MessengerSchema = SchemaFactory.createForClass(Messenger);