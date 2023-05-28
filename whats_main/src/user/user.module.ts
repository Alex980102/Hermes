import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { Lada, LadaSchema } from './entities/lada.entity';
import { LadaRepository } from './lada.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Lada.name, schema: LadaSchema }])],
  controllers: [UserController],
  providers: [UserService, UserRepository, LadaRepository],
  exports: [UserService, UserRepository, LadaRepository]
})
export class UserModule { }
