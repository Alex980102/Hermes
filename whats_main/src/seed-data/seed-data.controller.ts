import { Controller, Get } from '@nestjs/common';
import { SeedDataService } from './seed-data.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('seed-data')
@Controller('seed-data')
export class SeedDataController {
  constructor(private readonly seedDataService: SeedDataService) {}

  @Get()
  async seedData() {
    const createLadas = await this.seedDataService.seedData();
    return {
      ok: true,
      message: 'seed data',
    };
  }
}
