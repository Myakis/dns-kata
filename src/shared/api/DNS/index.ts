import { IShop } from 'widgets/page-404-shops/page-404-shops.types';

export const getShops = async () => {
  const response = await fetch('http://localhost:8000/shops');

  if (!response.status) {
    throw new Error(response.statusText);
  }

  const data: IShop[] = await response.json();

  return data;
};
