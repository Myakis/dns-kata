import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IShop } from 'widgets/shops-page-404/shops-page-404.types';
import { IStock } from 'entities/stock/types';
import { IVacancy } from 'pages/career/types';
import { IReview } from 'widgets/reviews/components/review/types';

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
    getVacancies: build.query<IVacancy[], unknown>({
      query: () => ({
        url: 'vacancies',
      }),
    }),
    getReviews: build.query<IReview[], unknown>({
      query: () => ({
        url: 'reviews',
      }),
    }),
  }),
});

export const { useGetStocksQuery, useGetVacanciesQuery, useGetReviewsQuery } = DnsAPI;
