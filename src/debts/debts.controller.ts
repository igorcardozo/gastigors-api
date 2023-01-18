import { GetDebtDto } from './dto/get-debt.dto';
import { DebtsService } from './debts.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateDebtDto } from './dto/create-debt.dto';

@Controller('debts')
export class DebtsController {
  constructor(private readonly debtService: DebtsService) {}

  @Post()
  async create(@Body() debt: CreateDebtDto) {
    return await this.debtService.createDebt(debt);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GetDebtDto> {
    return await this.debtService.getDebt(id);
  }

  @Get()
  async findAll(): Promise<GetDebtDto[]> {
    return await this.debtService.getDebts();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.debtService.deleteDebt(id);
  }
}
