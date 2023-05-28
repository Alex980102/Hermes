import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { CreateMessengerDto } from './create-messenger.dto';

export class UpdateMessengerDto {

    @MinLength(1)
    @IsOptional()
    phone: string

    @IsString()
    @IsOptional()
    status?: string

    @IsOptional()
    port: number | null

    @IsOptional()
    pm2_name: string | null

    @IsOptional()
    path: string


}
