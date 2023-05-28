import {
  IsBoolean,
  IsNumber,
  IsObject,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @MinLength(1)
  from: string;

  @IsString()
  @MinLength(1)
  to: string;

  @IsBoolean()
  hasMedia: boolean;

  @IsString()
  type: string;

  @IsBoolean()
  sendFromBot: boolean;

  @IsString()
  body: string;

  @IsObject()
  whatsData: {};
}
