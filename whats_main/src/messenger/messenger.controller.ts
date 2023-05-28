import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { CreateMessengerDto } from './dto/create-messenger.dto';
import { UpdateMessengerDto } from './dto/update-messenger.dto';
import * as phoneGoogle from 'google-libphonenumber';

@Controller('messenger')
export class MessengerController {
  constructor(private readonly messengerService: MessengerService) {}

  @Post('/create')
  create(@Body() messenger: CreateMessengerDto) {
    return this.messengerService.create(
      messenger.phone,
      messenger.botProcessId,
    );
  }

  // TODO: Crear el repository para retornar todos los messengers
  @Get()
  findAll() {
    return this.messengerService.findAll();
  }

  @Get(':phone')
  findOne(@Param('phone') phone: string) {
    const phoneUtil: any = phoneGoogle.PhoneNumberUtil.getInstance();
    const _userPhone = phoneUtil.parseAndKeepRawInput(phone, 'MX');
    const _myPhone = phoneUtil.getNationalSignificantNumber(_userPhone);
    return this.messengerService.findOnePhone(_myPhone);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMessengerDto: UpdateMessengerDto,
  ) {
    return this.messengerService.update(id, updateMessengerDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.messengerService.remove(+id);
  // }

  // TODO: actualizar metodo para borrar el usuario
  // @Delete('/removepm2/:id')
  // removePm2Session(@Param('id') id: string) {
  //   return this.messengerService.remove(id);
  // }
}
