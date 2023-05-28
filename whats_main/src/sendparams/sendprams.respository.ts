import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UpdateSendparamDto } from './dto/update-sendparam.dto';
import { Sendparam, SendparamDocument } from './entities/sendparam.entity';

@Injectable()
export class SendparamRepository {
  constructor(
    @InjectModel(Sendparam.name)
    private sendParamModel: Model<SendparamDocument>,
  ) {}

  async findAll() {
    return this.sendParamModel.find({ seq: 0 });
  }

  async update(id: number, updateSendparamDto: UpdateSendparamDto) {
    const findSendParam = await this.sendParamModel.findOne({ seq: id });
    console.log(findSendParam);
    console.log(`updateSendParam: ${updateSendparamDto}`);

    const updateSendParam = await this.sendParamModel.updateOne(
      { seq: id },
      updateSendparamDto,
    );
    return updateSendParam;
  }

  async create(sendParam: Sendparam) {
    const newSendParam = new this.sendParamModel(sendParam);
    return newSendParam.save();
  }
}
