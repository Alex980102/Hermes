import { Injectable } from '@nestjs/common';
import { spawnSync, SpawnSyncReturns } from 'child_process';
import * as detect from 'detect-port';
import { CreateBotprocessDto } from './dto/create-botprocess.dto';
import { UpdateBotprocessDto } from './dto/update-botprocess.dto';
import { v4 as uuid } from 'uuid';
import { BotProcessRepository } from './botprocess.repository';
import { MessengerRepository } from 'src/messenger/messenger.repository';

@Injectable()
export class BotprocessService {
  constructor(
    private readonly botProcessRepository: BotProcessRepository,
    private readonly messengerRepository: MessengerRepository,
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

  async create(prompt: string) {
    // Local variables
    const main_url = 'http://localhost:3000';
    const repo = 'https://github.com/Alex980102/hermes-whatsapp-api.git';
    const port = await detect(3001);
    const name = `api-${port}`;
    const my_pat = `${this.path}/${name}`;
    const _botProcessId = uuid();
    const _messengerEnvFile = `PROMPT=${prompt}\nESCLAVOPORT=${port}\nBOT_PROCESS_ID=${_botProcessId}\nMAIN_URL=http://localhost:${process.env.PORT}\nCREATE_MESSENGER_URL=/api/messenger/create\nUPDATE_BOT_PROCESS_URL=/api/botprocess`;
    console.log(_botProcessId);
    // Local variables

    // Ejecutar los Procesos para crear el esclavo
    this.runProcess(`git clone ${repo} ${my_pat}`);
    this.runProcess(`echo "${_messengerEnvFile}" > ${my_pat}/.env`);
    this.runProcess(`cd ${my_pat} ; yarn install`);
    this.runProcess(`cd ${my_pat} ; pm2 start 'yarn start' --name ${name}`);
    // Ejecutar los Procesos para crear el esclavo

    try {
      // Guardar en la base de datos el botProcess
      const createbotProcess = this.botProcessRepository.create({
        botProcessId: _botProcessId,
        port: port,
        status: 'inactive',
        pm2_name: name,
        path: my_pat,
      });
      // Guardar en la base de datos el botProcess
      if (!createbotProcess) {
        return {
          ok: false,
          msg: 'Checar logs',
        };
      }
      return { ok: true, msg: `http://localhost:${port}/api/whatsapp/qr` };
    } catch (error) {
      console.log(error);
      return { ok: false, msg: 'Error masivo' };
    }
  }

  async update(id: string, updateBotprocessDto: UpdateBotprocessDto) {
    const checkBotProcess = await this.botProcessRepository.update(
      id,
      updateBotprocessDto,
    );
    return { ok: true, msg: checkBotProcess };
  }

  async remove(id: string) {
    const checkUser = await this.botProcessRepository.findOne({
      botProcessId: id,
    });
    console.log(checkUser);
    const { pm2_name, path } = checkUser;
    this.runProcess(`pm2 delete ${pm2_name}`);
    this.runProcess(`rm -rf ${path}`);
    const { messengerId } = await this.messengerRepository.findOnePort({
      botProcessId: id,
    });
    console.log(messengerId);
    const updateMessenger = this.messengerRepository.update(messengerId, {
      botProcessId: null,
    });
    const _removeProcess = this.botProcessRepository.remove(id);

    return _removeProcess;
  }

  findAll() {
    return this.botProcessRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} botprocess`;
  // }

  // update(id: number, updateBotprocessDto: UpdateBotprocessDto) {
  //   return `This action updates a #${id} botprocess`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} botprocess`;
  // }
}
