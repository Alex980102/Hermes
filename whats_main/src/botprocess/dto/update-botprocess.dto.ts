import { PartialType } from '@nestjs/swagger';
import { CreateBotprocessDto } from './create-botprocess.dto';

export class UpdateBotprocessDto extends PartialType(CreateBotprocessDto) {}
