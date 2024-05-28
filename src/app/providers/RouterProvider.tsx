import Career from 'pages/career';
import Main from 'pages/main';
import NewsListPage from 'pages/news-list';
import NewsPage from 'pages/news';
import FeedbackPage from 'pages/feedback';
import Page404 from 'pages/page-404';
import Stocks from 'pages/stocks';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/redux';
import { currentCitySlice } from 'shared/store/slices/current-city-slice';
import Shops from 'widgets/shops';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <Page404 />,
  },
  {
    path: '/shops/:city',
    element: <Shops />,
  },
  {
    path: '/stocks',
    element: <Stocks />,
    errorElement: <Page404 />,
  },
  {
    path: '/career',
    element: <Career />,
    errorElement: <Page404 />,
  },
  {
    path: 'news',
    element: <NewsListPage />,
    errorElement: <Page404 />,
  },
  {
    path: 'news/:id',
    element: <NewsPage />,
    errorElement: <Page404 />,
  },
  {
    path: 'feedback',
    element: <FeedbackPage />,
  },
]);

export const BrowserRouter = () => {
  const { chooseCurrentCity } = currentCitySlice.actions;
  const dispatch = useAppDispatch();

  /**
   * useEffect используется для загрузки данных о текущем городе из localStorage.
   * Если данные есть, они передаются в Redux Store.
   * Если при загрузке данных возникает ошибка, localStorage очищается.
   */
  useEffect(() => {
    try {
      const localCity = localStorage.getItem('currentCity');

      localCity && dispatch(chooseCurrentCity(JSON.parse(localCity)));
    } catch {
      localStorage.removeItem('currentCity');
    }
  }, [chooseCurrentCity, dispatch]);

  return <RouterProvider router={router} />;
};
