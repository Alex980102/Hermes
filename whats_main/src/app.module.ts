import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { MessengerModule } from './messenger/messenger.module';
import { MessageModule } from './message/message.module';
import { ConfigModule } from '@nestjs/config';
import { MessageWsModule } from './message-ws/message-ws.module';
import { BotprocessModule } from './botprocess/botprocess.module';
import { SendparamsModule } from './sendparams/sendparams.module';
import { SeedDataModule } from './seed-data/seed-data.module';
import { LadaModule } from './lada/lada.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      // useCreateIndex: true,
      // useUnifiedTopology: true,
      // useNewUrlParser: true,
    }),
    // MongooseModule.forRoot(
    // 'mongodb+srv://user_node_cafe:K2ARxLx4CbL8dGi@cluster0.pcsz9.mongodb.net/test',
    // `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.pcsz9.mongodb.net/${process.env.NAME_DB}`,

    // ),
    UserModule,
    MessengerModule,
    MessageModule,
    MessageWsModule,
    BotprocessModule,
    SendparamsModule,
    SeedDataModule,
    LadaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
