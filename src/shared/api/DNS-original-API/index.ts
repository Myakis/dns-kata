import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICities } from './DNS-original-api.types';

export const DNSOriginalAPI = createApi({
  reducerPath: 'citiesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://restapi.dns-shop.ru/v1' }),
  endpoints: (build) => ({
    getCities: build.query<ICities, unknown>({
      query: () => ({
        url: '/get-city-list',
      }),
    }),
  }),
});
