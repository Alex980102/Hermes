import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User {
  @Prop()
  userId: string;

  @Prop()
  phone: number;

  @Prop()
  name: string;

  @Prop()
  region: string;

  @Prop()
  isvalid: boolean;

  @Prop()
  iswhatuser: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);