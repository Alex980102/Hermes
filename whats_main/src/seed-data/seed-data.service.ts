import { Injectable } from '@nestjs/common';
import { LadaService } from 'src/lada/lada.service';
import { SendparamsService } from 'src/sendparams/sendparams.service';

@Injectable()
export class SeedDataService {
  constructor(
    private readonly ladaService: LadaService,
    private readonly sendparamsService: SendparamsService,
  ) {}
  async seedData() {
    await this.ladaService.createLadas();
    await this.sendparamsService.createFromJson();
    return {
      ok: true,
      message: 'seed data',
    };
  }
}
