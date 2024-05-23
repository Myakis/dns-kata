import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// Импортируем функции createApi и fetchBaseQuery из библиотеки @reduxjs/toolkit/query/react.

import { IShop } from 'widgets/shops-page-404/shops-page-404.types';
// Импортируем тип IShop из файла types, находящегося в директории widgets/shops-page-404.

import { IStock } from 'entities/stock/types';
// Импортируем тип IStock из файла types, находящегося в директории entities/stock.

import { IVacancy } from 'pages/career/types';
// Импортируем тип IVacancy из файла types, находящегося в директории pages/career.

import { News } from 'pages/news-list/types';
// Импортируем тип News из файла types, находящегося в директории pages/news-list.

import { IReview } from 'widgets/reviews/components/review/types';
// Импортируем тип IReview из файла types, находящегося в директории widgets/reviews/components/review.

export const DnsAPI = createApi({
  // Создаём API с помощью функции createApi и экспортируем его.

  reducerPath: 'DnsAPI',
  // Задаём путь для редьюсера (reducerPath) как 'DnsAPI'.

  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  // Устанавливаем базовый URL для запросов API - 'http://localhost:8000/'.

  endpoints: (build) => ({
    // Определяем эндпоинты (endpoints) для API.

    getShops: build.query<IShop[], unknown>({
      // Определяем эндпоинт для получения магазинов (getShops), который возвращает массив IShop.
      query: () => ({
        url: 'shops',
        // Устанавливаем URL для запроса - 'shops'.
      }),
    }),

    getStocks: build.query<IStock[], unknown>({
      // Определяем эндпоинт для получения акций (getStocks), который возвращает массив IStock.
      query: () => ({
        url: 'stocks',
        // Устанавливаем URL для запроса - 'stocks'.
      }),
    }),

    getVacancies: build.query<IVacancy[], unknown>({
      // Определяем эндпоинт для получения вакансий (getVacancies), который возвращает массив IVacancy.
      query: () => ({
        url: 'vacancies',
        // Устанавливаем URL для запроса - 'vacancies'.
      }),
    }),

    getNews: build.query<News[], unknown>({
      // Определяем эндпоинт для получения новостей (getNews), который возвращает массив News.
      query: () => ({
        url: 'news',
        // Устанавливаем URL для запроса - 'news'.
      }),
    }),

    getReviews: build.query<IReview[], unknown>({
      // Определяем эндпоинт для получения отзывов (getReviews), который возвращает массив IReview.
      query: () => ({
        url: 'reviews',
        // Устанавливаем URL для запроса - 'reviews'.
      }),
    }),
  }),
});

export const { useGetShopsQuery, useGetStocksQuery, useGetVacanciesQuery, useGetNewsQuery, useGetReviewsQuery } = DnsAPI;
// Экспортируем хуки для запросов: useGetStocksQuery, useGetVacanciesQuery, useGetNewsQuery, useGetReviewsQuery, которые создаются автоматически функцией createApi.
