import { Module } from '@nestjs/common';
import { MessageWsService } from './message-ws.service';
import { MessageWsGateway } from './message-ws.gateway';
import { SendparamsModule } from 'src/sendparams/sendparams.module';

@Module({
  imports: [SendparamsModule],
  providers: [MessageWsGateway, MessageWsService]
})
export class MessageWsModule {}
