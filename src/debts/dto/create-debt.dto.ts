import { IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateDebtDto {
  @IsNotEmpty()
  originUserId: string;

  @IsNotEmpty()
  destinationUserId: string;

  @IsNotEmpty()
  @IsDecimal()
  amount: number;
}
