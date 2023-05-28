import { Module } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { MessengerController } from './messenger.controller';
import { MessengerRepository } from './messenger.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Messenger, MessengerSchema } from './entities/messenger.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{name: Messenger.name, schema: MessengerSchema}]), UserModule],
  controllers: [MessengerController],
  providers: [MessengerService, MessengerRepository],
  exports: [MessengerService, MessengerRepository]
})
export class MessengerModule {}
