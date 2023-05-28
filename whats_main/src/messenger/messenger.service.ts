import { Injectable } from '@nestjs/common';
import { UpdateMessengerDto } from './dto/update-messenger.dto';
import * as detect from 'detect-port';
//var fs = require('fs');
import { spawnSync, SpawnSyncReturns } from 'child_process';
import { MessengerRepository } from './messenger.repository';
import { v4 as uuid } from 'uuid';
import { Messenger } from './entities/messenger.entity';
import { UserService } from 'src/user/user.service';
import rimraf from 'rimraf';

@Injectable()
export class MessengerService {
  constructor(
    private readonly messengerRepository: MessengerRepository,
    private readonly userService: UserService,
  ) {}

  path = `${__dirname}/../../..`;
  // path = '/Users/alejandro/DevProjects/Projects/Zintech/Whats-app-proyect';

  private runProcess = (command: string) => {
    try {
      const executeCommand: SpawnSyncReturns<Buffer> = spawnSync(command, {
        shell: true,
      });
      const commandReturns = executeCommand.stdout.toString().split('\n');
      commandReturns.splice(-1);
      return { ok: true, msg: { commandReturns } };
    } catch (error) {
      console.log(error);
      return { ok: false, msg: 'Checar Logs' };
    }
  };
  // TODO: Crear interface del tipo de retorno de la función create
  async create(phone: string, botProcessId: string): Promise<any> {
    try {
      const _thisUserExist = await this.messengerRepository.findOnePort({
        phone,
      });
      if (_thisUserExist) {
        const createMessenge: Promise<Messenger> =
          await this.messengerRepository.update(_thisUserExist.messengerId, {
            botProcessId: botProcessId,
          });
        console.log(_thisUserExist.messengerId);

        return { ok: true, msg: _thisUserExist.messengerId };
      } else {
        const _userID = uuid();
        const lada = await (await this.userService.getLadaNumber(phone)).lada;
        const region = (await this.userService.findManyLadas(lada)).id.ciudad;
        const createMessenge = await this.messengerRepository.create({
          messengerId: _userID,
          phone: phone,
          region: region,
          botProcessId: botProcessId,
        });
        if (!createMessenge) {
          return {
            ok: false,
            msg: 'Checar logs',
          };
        }
        return { ok: true, msg: _userID };
      }
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        msg: 'Error Fatal checar logs',
      };
    }
  }

  findAll() {
    return `This action returns all messenger`;
  }

  async findOnePhone(phone: string) {
    const messengerid = await this.messengerRepository.findOnePort({
      phone: phone,
    });
    if (messengerid) {
      return { ok: true, msg: messengerid.messengerId, user: messengerid };
    } else {
      return { ok: false, msg: 'No se encontro usuario' };
    }
  }

  async update(id: string, updateMessengerDto: UpdateMessengerDto) {
    // return `This action updates a #${id} messenger`;
    const checkUser = await this.messengerRepository.update(
      id,
      updateMessengerDto,
    );
    console.log(checkUser);

    return {
      id: id,
      body: updateMessengerDto,
      retu: checkUser,
    };
  }

  // async remove(id: string) {
  //   const checkUser = await this.messengerRepository.findOnePort({messengerId: id})
  //   const {pm2_name, path} = checkUser;

  //   console.log(`pm2 delete --name ${pm2_name}`);
  //   this.runProcess(`pm2 delete ${pm2_name}`);
  //   console.log(path);
  //   this.runProcess(`rm -rf ${path}`)

  //   const updateUser: Promise<Messenger> = await this.messengerRepository.update(id, {status: "disconnected", port: null, pm2_name: null, path: null});

  //   return `This action removes a #${id} messenger`;
  // }
}
