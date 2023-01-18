import { Debts as XataDebts } from '../xata';

export type Debts = { destination: string; origin: string } & Omit<
  XataDebts,
  'destination' | 'origin'
>;
