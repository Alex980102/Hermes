import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuid } from 'uuid';
import { User } from './entities/user.entity';
import { ApiOperation, ApiParam, ApiProperty } from '@nestjs/swagger';
import * as phoneGoogle from 'google-libphonenumber';

interface GetUserResponse {
  ok: boolean;
  msg: any;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ tags: ['User'] })
  @Get(':phone')
  async getUser(@Param('phone') phone: number): Promise<GetUserResponse> {
    return this.userService.findOne(phone);
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<GetUserResponse> {
    console.log(user.phone);

    const lada = await this.userService.getLadaNumber(user.phone.toString());
    try {
      const region = (await this.getLada(lada.lada)).id.ciudad;
      return this.userService.createOne(
        // user.name,
        // user.phone,
        // region,
        // lada.isPosibleNumber,
        user.name,
        user.phone,
        region,
        lada.isPosibleNumber,
      );
    } catch (error) {
      return this.userService.createOne(
        user.name,
        user.phone,
        lada.lada,
        lada.isPosibleNumber,
      );
    }
  }

  @Get('lada/:lada')
  async getLada(@Param('lada') lada: number) {
    return this.userService.findManyLadas(lada);
  }

  // Create UserByBot
  @Get('botmessage/:phone/:name?')
  async createUserByBot(@Param('phone') phone: string, @Param('name') name: string) {
    try {
      const phoneUtil: any = phoneGoogle.PhoneNumberUtil.getInstance();
      const _userPhone = phoneUtil.parseAndKeepRawInput(phone, 'MX');
      const _myPhone = phoneUtil.getNationalSignificantNumber(_userPhone);
      const _thisUserExist = this.userService.findOne(_myPhone);
      console.log('Logear name');
      console.log(name);
      if(name === undefined){
        name = null;
      }
      
      if ((await _thisUserExist).ok) {
        console.log('Crear Usuario');
        const createUserLocal = this.createUser({phone: _myPhone, name: name});
        return {ok: true, msg: (await createUserLocal).msg};
      } else {
        console.log('Retornar id del usuario existente');
        return{ok: true, msg: (await _thisUserExist).id}
      }
    } catch (error) {}
  }
  // Create UserByBot


  // Update UserByBot
  @Patch(':id')
  async updateUserByBot(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
  // Update UserByBot
}
