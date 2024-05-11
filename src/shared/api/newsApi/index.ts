import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { News } from 'shared/store/slices/news-slice';

export const NewsApi = createApi({
  reducerPath: 'NewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (builder) => ({
    getNews: builder.query<News[], unknown>({
      query: () => ({
        url: 'news',
      }),
    }),
  }),
});

export const { useGetNewsQuery } = NewsApi;
