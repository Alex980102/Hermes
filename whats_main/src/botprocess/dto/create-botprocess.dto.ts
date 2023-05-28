import { IsOptional } from 'class-validator';

export class CreateBotprocessDto {
  @IsOptional()
  port: number;
  @IsOptional()
  status: string;
  @IsOptional()
  pm2_name: string;
  @IsOptional()
  path: string;
}
