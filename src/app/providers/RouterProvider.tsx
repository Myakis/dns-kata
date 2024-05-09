import Main from 'pages/main';
import Page404 from 'pages/page-404';
import { MainLayout } from 'pages/layout';
import { Outlet } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Компоненты-заглушки для примера
const News: React.FC = () => {
  return <div>News</div>;
};

const Stocks: React.FC = () => {
  return <div>Stocks</div>;
};

const PopularQuestions: React.FC = () => {
  return <div>PopularQuestions</div>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <Page404 />,
    children: [
      {
        path: '/',
        element: <Outlet />,
        children: [
          {
            path: '/',
            element: <Main />,
          },
          {
            path: 'stocks',
            element: <Stocks />,
          },
          {
            path: 'news',
            element: <News />,
          },
          {
            path: 'help',
            children: [
              {
                path: 'popular-questions',
                element: <PopularQuestions />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export const BrowserRouter = () => {
  return <RouterProvider router={router} />;
};
