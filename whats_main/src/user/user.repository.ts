import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(userFilterQuery);
  }

  async create(user: User) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async update(id: string, user: UpdateUserDto) {
    try {
      const updateUser = await this.userModel.findOneAndUpdate(
        { userId: id },
        user,
      );
      const newUser = { ...updateUser['_doc'], ...user };
      return newUser;
    } catch (error) {
        console.log(error);
        
    }
  }
}
