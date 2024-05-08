import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const DnsAPI = createApi({
  reducerPath: 'DnsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (build) => ({
    //пока моковый запрос оставил any
    getShops: build.query<any, any>({
      query: () => ({
        url: 'shops',
      }),
    }),
    getStocks: build.query<stock>({
      query: () => ({
        url: 'stocks',
      }),
    }),
  }),
});
