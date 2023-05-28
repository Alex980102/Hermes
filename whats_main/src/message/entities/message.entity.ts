import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({timestamps: true})
export class Message {

  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  hasMedia: boolean;

  @Prop()
  type: string;

  @Prop()
  sendFromBot: boolean

  @Prop()
  body: string;

  @Prop({type: {}})
  whatsData: {};
}

export const MessageSchema = SchemaFactory.createForClass(Message);
