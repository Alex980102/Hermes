import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UpdateBotprocessDto } from './dto/update-botprocess.dto';
import { Botprocess, BotprocessDocument } from './entities/botprocess.entity';

@Injectable()
export class BotProcessRepository {
  constructor(
    @InjectModel(Botprocess.name)
    private botProcessModel: Model<BotprocessDocument>,
  ) {}

  async create(botProcess: Botprocess) {
    const newBotProcess = new this.botProcessModel(botProcess);
    return newBotProcess.save();
  }

  async update(id: string, botProcess: UpdateBotprocessDto) {
    try {
      const findBotProcess = await this.botProcessModel.findOne({
        botProcessId: id,
      });
      if (findBotProcess) {
        const updateBotProcess = await this.botProcessModel.findOneAndUpdate(
          { botProcessId: id },
          botProcess,
        );
        const newBotProcess = { ...updateBotProcess['_doc'], ...botProcess };
        return newBotProcess;
      } else {
        return false;
      }
    } catch (error) {}
  }

  async findOne(botProcessFilterQuery: FilterQuery<Botprocess>): Promise<Botprocess>{
    return this.botProcessModel.findOne(botProcessFilterQuery);
  }

  async remove(id: string){
    return this.botProcessModel.findOneAndDelete({botProcessId: id})
  }

  async find(){
    return this.botProcessModel.find()
  }
}
