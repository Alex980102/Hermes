import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BotprocessService } from './botprocess.service';
import { CreateBotprocessDto } from './dto/create-botprocess.dto';
import { UpdateBotprocessDto } from './dto/update-botprocess.dto';
import { CreateBotInstanceDto } from './dto/create-bot-instance.dto';

@Controller('botprocess')
export class BotprocessController {
  constructor(private readonly botprocessService: BotprocessService) {}

  // @Get('create')
  // createProcess() {
  //   return this.botprocessService.create();
  // }

  @Post('create')
  createProcess(@Body() createBotInstanceDto: CreateBotInstanceDto) {
    return this.botprocessService.create(createBotInstanceDto.prompt);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBotprocessDto: UpdateBotprocessDto,
  ) {
    return this.botprocessService.update(id, updateBotprocessDto);
  }

  @Delete('/removepm2/:id')
  removePm2Session(@Param('id') id: string) {
    return this.botprocessService.remove(id);
  }

  @Get()
  findAll() {
    return this.botprocessService.findAll();
  }
}
