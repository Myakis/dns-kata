import Main from 'pages/main';
import Page404 from 'pages/page-404';
import Layout from 'pages/layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Компоненты-заглушки для примера
const News: React.FC = () => {
  return (
    <Layout pageTitle={'News'} breadcrumbs='news'>
      <div>News</div>
    </Layout>
  );
};

const Stocks: React.FC = () => {
  return (
    <Layout pageTitle={'Stocks'} breadcrumbs='stocks'>
      {' '}
      <div>Stocks</div>
    </Layout>
  );
};

const PopularQuestions: React.FC = () => {
  return (
    <Layout pageTitle={'PopularQuestions'} breadcrumbs='popularQuestions'>
      {' '}
      <div>PopularQuestions</div>
    </Layout>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <Page404 />,
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
]);

export const BrowserRouter = () => {
  return <RouterProvider router={router} />;
};
