import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Messenger, MessengerDocument } from './entities/messenger.entity';

@Injectable()
export class MessengerRepository {
  constructor(
    @InjectModel(Messenger.name)
    private messengerModel: Model<MessengerDocument>,
  ) {}

  async findOnePort(messengerFilterQuery: FilterQuery<Messenger>): Promise<Messenger>{
    return this.messengerModel.findOne(messengerFilterQuery);
  }

  async create(messenger: Messenger){
    const newMessenger = new this.messengerModel(messenger);
    return newMessenger.save()
  }

  async update(id: string, messenger: Partial<Messenger>) {
    const findUser = await this.messengerModel.findOne({messengerId:id});
    // console.log(findUser);
    if (findUser) {
      const updateUser = await this.messengerModel.findOneAndUpdate({messengerId:id}, messenger);
      console.log({...messenger});
      const newUser = { ...updateUser['_doc'], ...messenger }
      // console.log({...newUser, status: "inactive"});
      return newUser;

      
    } else {
      return 'no se encontro numero';      
    }
  }
}
