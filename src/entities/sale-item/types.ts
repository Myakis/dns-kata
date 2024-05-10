import { Stock } from 'shared/api/types';

export type StockData = {
  stock: Stock;
  vobler?: { text: string, color: string };
};
