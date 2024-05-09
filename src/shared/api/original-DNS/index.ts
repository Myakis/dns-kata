import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICities } from './original-DNS.types';

export const OriginalDNSApi = createApi({
  reducerPath: 'OriginalDNSApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://restapi.dns-shop.ru/v1/' }),
  endpoints: (build) => ({
    getCities: build.query<ICities, unknown>({
      query: () => ({
        url: 'get-city-list',
      }),
    }),
  }),
});
