import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Lada, LadaDocument } from './entities/lada.entity';

@Injectable()
export class LadaRepository {
  constructor(@InjectModel(Lada.name) private LadaModel: Model<LadaDocument>) {}

  async findOne(ladaFilterQuery: FilterQuery<Lada>): Promise<Lada> {
    return this.LadaModel.findOne(ladaFilterQuery);
  }

  async create(Lada: Lada) {
    const newLada = new this.LadaModel(Lada);
    return newLada.save();
  }

  async createBulk(Ladas: Lada[]) {
    return await this.LadaModel.insertMany(Ladas);
  }
}
