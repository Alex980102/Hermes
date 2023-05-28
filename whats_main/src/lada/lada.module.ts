import { Module } from '@nestjs/common';
import { LadaService } from './lada.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  exports: [LadaService],
  providers: [LadaService],
})
export class LadaModule {}
