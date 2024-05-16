import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IShop } from 'widgets/shops-page-404/shops-page-404.types';
import { IStock } from 'entities/stock/types';
import { News } from 'pages/news-list/types';

export const DnsAPI = createApi({
  reducerPath: 'DnsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (build) => ({
    getShops: build.query<IShop[], unknown>({
      query: () => ({
        url: 'shops',
      }),
    }),
    getStocks: build.query<IStock[], unknown>({
      query: () => ({
        url: 'stocks',
      }),
    }),
    getNews: build.query<News[], unknown>({
      query: () => ({
        url: 'news',
      }),
    }),
  }),
});

export const { useGetStocksQuery } = DnsAPI;

export const { useGetNewsQuery } = DnsAPI;
