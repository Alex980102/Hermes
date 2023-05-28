import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { LadaRepository } from 'src/user/lada.repository';

@Injectable()
export class LadaService {
  constructor(private readonly ladaRepository: LadaRepository) {}

  async createLadas() {
    try {
      const rawData = fs.readFileSync('assets/seed-data/ladas.json');
      const ladas = JSON.parse(rawData.toString());
      return await this.ladaRepository.createBulk(ladas);
    } catch (error) {
      console.log(error);
    }
  }
}
