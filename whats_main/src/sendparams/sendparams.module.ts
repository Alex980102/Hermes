import { Module } from '@nestjs/common';
import { SendparamsService } from './sendparams.service';
import { SendparamsController } from './sendparams.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sendparam, SendparamSchema } from './entities/sendparam.entity';
import { SendparamRepository } from './sendprams.respository';

@Module({
  imports: [MongooseModule.forFeature([{name: Sendparam.name, schema: SendparamSchema}])],
  controllers: [SendparamsController],
  providers: [SendparamsService, SendparamRepository],
  exports: [SendparamsService, SendparamRepository] 
})
export class SendparamsModule {}
