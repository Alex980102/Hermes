import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { UpdateSendparamDto } from './dto/update-sendparam.dto';
import { SendparamRepository } from './sendprams.respository';

@Injectable()
export class SendparamsService {
  constructor(private readonly sendParamRepository: SendparamRepository) {}

  findAll() {
    return this.sendParamRepository.findAll();
  }

  update(id: number, updateSendparamDto: UpdateSendparamDto) {
    this.sendParamRepository.update(id, updateSendparamDto);
  }

  async createFromJson() {
    try {
      const rawData = fs.readFileSync('assets/seed-data/sendparams.json');
      const sendParam = JSON.parse(rawData.toString());
      return await this.sendParamRepository.create(sendParam);
    } catch (error) {
      console.log(error);
    }
  }
}
