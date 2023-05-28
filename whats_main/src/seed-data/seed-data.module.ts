import { Module } from '@nestjs/common';
import { SeedDataService } from './seed-data.service';
import { SeedDataController } from './seed-data.controller';
import { LadaModule } from 'src/lada/lada.module';
import { SendparamsModule } from 'src/sendparams/sendparams.module';

@Module({
  imports: [LadaModule, SendparamsModule],
  controllers: [SeedDataController],
  providers: [SeedDataService],
})
export class SeedDataModule {}
