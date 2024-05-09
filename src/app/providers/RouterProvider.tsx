import Main from 'pages/main';
import Page404 from 'pages/page-404';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <Page404 />,
  },
]);

export const BrowserRouter = () => {
  return <RouterProvider router={router} />;
};
