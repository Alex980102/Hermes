import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBotInstanceDto {
  @ApiProperty({
    description: 'The prompt to be used for the bot instance',
    type: String,
    example: 'The quick brown fox jumps over the lazy dog',
  })
  @IsString()
  prompt: string;
}
