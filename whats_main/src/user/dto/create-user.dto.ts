import { ApiParam, ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    
    @IsNumber()
    phone: number
    
    @ApiProperty({example: 'Juan', description: 'Nombre del usuario', required:false})
    @IsOptional()
    @IsString()
    @MinLength(1)
    name?: string
    
    @IsBoolean()
    @IsOptional()
    iswhatuser?: boolean
}
