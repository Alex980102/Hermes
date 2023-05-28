import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateSendparamDto } from './create-sendparam.dto';

export class UpdateSendparamDto extends PartialType(CreateSendparamDto) {
    @IsOptional()
    minValue: number | string;
   
    @IsOptional()
    maxValue: number | string;
}
