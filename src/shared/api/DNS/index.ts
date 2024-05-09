import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IShop } from 'widgets/shops-page-404/shops-page-404.types';

export const DnsAPI = createApi({
  reducerPath: 'DnsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (build) => ({
    getShops: build.query<IShop[], unknown>({
      query: () => ({
        url: 'shops',
      }),
    }),
  }),
});
