import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { v4 as uuid } from 'uuid';
import { LadaRepository } from './lada.repository';
import * as phone from 'google-libphonenumber';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly ladaRepository: LadaRepository,
  ) {}
  async findOne(userPhoneNumber: any) {
    console.log(userPhoneNumber);
    
    console.log(`telefono: ${userPhoneNumber}`);
    console.log(`tipo de dato telefono: ${typeof userPhoneNumber}`);

    try {
      console.log(userPhoneNumber);

      const db_response = await this.userRepository.findOne({
        phone: Number(userPhoneNumber),
      });

      if (!db_response) {
        console.log('no existe');

        return {
          ok: true,
          msg: 'El usuario no existe',
        };
      }

      return {
        ok: false,
        msg: 'El usuario existe',
        id: db_response.userId,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        msg: 'Checar Logs',
      };
    }
  }

  async findManyLadas(number: number) {
    try {
      if (!number) {
        return {
          ok: true,
          msg: 'El usuario existe',
          id: null,
        };
      }
      const db_response = await this.ladaRepository.findOne({
        lada: number.toString(),
      });
      console.log(db_response);

      return {
        ok: true,
        msg: 'El usuario existe',
        id: db_response,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async createOne(name: string,phone: number, region: string, isvalid: boolean) {
    if (!(await this.findOne(phone)).ok) {
      return {
        ok: false,
        msg: 'El usuario ya existe',
      };
    } else {
      try {
        const userId = uuid();
        const createUser = await this.userRepository.create({
          userId: userId,
          phone,
          name: name,
          region,
          isvalid,
          iswhatuser: null,
        });
        if (!createUser) {
          return {
            ok: false,
            msg: 'Error al crear usuario',
          };
        }
        return {
          ok: true,
          msg: userId,
        };
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          msg: error,
        };
      }
    }
  }

  async getLadaNumber(phoneNumber: any) {
    let posibleNumber: boolean;

    let lenNumber = phoneNumber.toString().replace(/\s/g, '').length;
    const phoneUtil: any = phone.PhoneNumberUtil.getInstance();
    let number: any = phoneUtil.parseAndKeepRawInput(phoneNumber, 'MX');
    if (lenNumber == 10) {
      posibleNumber = true;
      posibleNumber = phoneUtil.isPossibleNumber(number);
    } else {
      posibleNumber = false;
    }

    console.log(posibleNumber);
    // console.log(phoneUtil.formatInOriginalFormat(number));

    number = phoneUtil.formatInOriginalFormat(number);
    const number_list = number.trim().split(/\s+/);

    if (!posibleNumber) {
      return { lada: null, isPosibleNumber: posibleNumber };
    }
    return { lada: number_list[0], isPosibleNumber: posibleNumber };
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const checkUserProcess = await this.userRepository.update(userId, updateUserDto);
  }
}
