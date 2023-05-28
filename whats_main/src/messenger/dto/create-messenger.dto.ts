import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateMessengerDto {
  @MinLength(1)
  phone: string;

  @MinLength(1)
  botProcessId: string;
}
