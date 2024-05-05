import Main from 'pages/main';
import Page404 from 'pages/page-404';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Shops from 'widgets/shops/shops';

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
]);

export const BrowserRouter = () => {
  return <RouterProvider router={router} />;
};
