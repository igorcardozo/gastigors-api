import { DeleteDebtDto } from './dto/delete-debt.dto';
import { GetDebtDto } from './dto/get-debt.dto';
import { Debts } from './../database/interfaces/debt.model';
import { DatabaseService } from '../database/database.service';

import { Injectable } from '@nestjs/common';
import { CreateDebtDto } from './dto/create-debt.dto';

@Injectable()
export class DebtsService {
  constructor(private databaseService: DatabaseService<Debts>) {
    databaseService.setModel('Debts');
  }

  async createDebt(data: CreateDebtDto) {
    const createdDebt = await this.databaseService.create({
      amount: data.amount,
      origin: data.originUserId,
      destination: data.destinationUserId,
      deleted: false,
    });
    return createdDebt;
  }

  //TODO: Use serializer for this
  private serializeDebt = (debt: Debts): GetDebtDto => ({
    id: debt.id,
    amount: debt.amount,
    deleted: debt.deleted,
    prevDebt: debt.prevDebt.id,
    originUserId: debt.origin,
    destinationUserId: debt.destination,
  });

  async getDebt(id: string): Promise<GetDebtDto> {
    const debt = await this.databaseService.getById(id);
    return this.serializeDebt(debt);
  }

  async getDebts(): Promise<GetDebtDto[]> {
    const debts = await this.databaseService.getAll();
    return debts.map((d) => this.serializeDebt(d));
  }

  async deleteDebt(id: string): Promise<DeleteDebtDto> {
    const deleted = await this.databaseService.deleteById(id);
    return { deleted };
  }
}
