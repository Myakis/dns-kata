import { ICities } from './original-dns.types';

export async function getCities(): Promise<ICities> {
  const response = await fetch('https://restapi.dns-shop.ru/v1/get-city-list');

  if (!response.status) {
    throw new Error(response.statusText);
  }

  const data = response.json();

  return data;
}
