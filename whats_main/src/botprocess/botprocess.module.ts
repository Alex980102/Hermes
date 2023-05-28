import { Module } from '@nestjs/common';
import { BotprocessService } from './botprocess.service';
import { BotprocessController } from './botprocess.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Botprocess, BotprocessSchema } from './entities/botprocess.entity';
import { MessengerSchema } from 'src/messenger/entities/messenger.entity';
import { BotProcessRepository } from './botprocess.repository';
import { MessengerModule } from 'src/messenger/messenger.module';

@Module({
  imports: [MongooseModule.forFeature([{name: Botprocess.name, schema: BotprocessSchema}]), MessengerModule],
  controllers: [BotprocessController],
  providers: [BotprocessService, BotProcessRepository]
})
export class BotprocessModule {}
