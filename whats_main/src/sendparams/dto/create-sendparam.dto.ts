import { IsNumber, IsNumberString, IsOptional } from "class-validator";

export class CreateSendparamDto {

    @IsOptional()
    minValue: number | string;
   
    @IsOptional()
    maxValue: number | string;
}
