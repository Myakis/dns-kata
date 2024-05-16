export interface IStock {
  id: number;
  productId: number;
  name: string;
  startDate: string;
  endDate: string;
  type: string[];
  image: string;
  isPopular: boolean;
}

export type StockData = {
  stock: IStock;
  vobler?: { text: string; color: string };
};
