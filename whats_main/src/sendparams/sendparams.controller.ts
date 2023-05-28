import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { SendparamsService } from './sendparams.service';
import { UpdateSendparamDto } from './dto/update-sendparam.dto';

@Controller('sendparams')
export class SendparamsController {
  constructor(private readonly sendparamsService: SendparamsService) {}

  @Get()
  findAll() {
    return this.sendparamsService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSendparamDto: UpdateSendparamDto,
  ) {
    console.log(id);
    console.log(updateSendparamDto);
    return this.sendparamsService.update(+id, updateSendparamDto);
  }
}
