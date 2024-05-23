import Career from 'pages/career';
// Импортируем компонент Career из директории pages/career.

import Main from 'pages/main';
// Импортируем компонент Main из директории pages/main.

import NewsListPage from 'pages/news-list';
// Импортируем компонент NewsListPage из директории pages/news-list.

import NewsPage from 'pages/news';
// Импортируем компонент NewsPage из директории pages/news.

import Page404 from 'pages/page-404';
// Импортируем компонент Page404 из директории pages/page-404.

import Stocks from 'pages/stocks';
// Импортируем компонент Stocks из директории pages/stocks.

import { useEffect } from 'react';
// Импортируем хук useEffect из библиотеки React.

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Импортируем функции createBrowserRouter и RouterProvider из библиотеки react-router-dom для создания маршрутизатора.

import { useAppDispatch } from 'shared/hooks/redux';
// Импортируем хук useAppDispatch из директории shared/hooks/redux.

import { currentCitySlice } from 'shared/store/slices/current-city-slice';
// Импортируем currentCitySlice из директории shared/store/slices/current-city-slice.

import Shops from 'widgets/shops';
import ShopCard from 'pages/shopCard';
// Импортируем компонент Shops из директории widgets/shops.

const router = createBrowserRouter([
  // Создаем маршрутизатор с помощью функции createBrowserRouter.

  {
    path: '/',
    element: <Main />,
    // Определяем маршрут для главной страницы, который рендерит компонент Main.

    errorElement: <Page404 />,
    // Определяем компонент Page404 для отображения ошибки (например, если маршрут не найден).
  },
  {
    path: '/shops/:city',
    element: <Shops />,
    // Определяем маршрут для страниц магазинов, который рендерит компонент Shops.
  },
  {
    path: '/shops/:city/:id',
    element: <ShopCard />,
  },
  {
    path: '/stocks',
    element: <Stocks />,
    // Определяем маршрут для страницы акций, который рендерит компонент Stocks.

    errorElement: <Page404 />,
    // Определяем компонент Page404 для отображения ошибки.
  },
  {
    path: '/career',
    element: <Career />,
    // Определяем маршрут для страницы карьеры, который рендерит компонент Career.

    errorElement: <Page404 />,
    // Определяем компонент Page404 для отображения ошибки.
  },
  {
    path: 'news',
    element: <NewsListPage />,
    // Определяем маршрут для страницы списка новостей, который рендерит компонент NewsListPage.

    errorElement: <Page404 />,
    // Определяем компонент Page404 для отображения ошибки.
  },
  {
    path: 'news/:id',
    element: <NewsPage />,
    // Определяем маршрут для страницы отдельной новости, который рендерит компонент NewsPage.

    errorElement: <Page404 />,
    // Определяем компонент Page404 для отображения ошибки.
  },
]);

export const BrowserRouter = () => {
  // Создаем функциональный компонент BrowserRouter.

  const { chooseCurrentCity } = currentCitySlice.actions;
  // Извлекаем действие chooseCurrentCity из currentCitySlice.

  const dispatch = useAppDispatch();
  // Используем хук useAppDispatch для получения функции dispatch из Redux.

  /**
   * useEffect используется для загрузки данных о текущем городе из localStorage.
   * Если данные есть, они передаются в Redux Store.
   * Если при загрузке данных возникает ошибка, localStorage очищается.
   */
  useEffect(() => {
    // Используем хук useEffect для выполнения побочных эффектов при монтировании компонента.

    try {
      const localCity = localStorage.getItem('currentCity');
      // Пытаемся получить данные о текущем городе из localStorage.

      localCity && dispatch(chooseCurrentCity(JSON.parse(localCity)));
      // Если данные есть, парсим их из JSON и передаем в Redux Store с помощью функции dispatch.
    } catch {
      localStorage.removeItem('currentCity');
      // Если возникает ошибка, удаляем данные о текущем городе из localStorage.
    }
  }, [chooseCurrentCity, dispatch]);
  // Указываем зависимости хука useEffect: chooseCurrentCity и dispatch.

  return <RouterProvider router={router} />;
  // Возвращаем компонент RouterProvider, который использует созданный маршрутизатор router.
};
