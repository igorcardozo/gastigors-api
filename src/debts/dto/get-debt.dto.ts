export interface GetDebtDto {
  id: string;
  originUserId: string;
  destinationUserId: string;
  amount: number;
  prevDebt?: string;
  deleted: boolean;
}
