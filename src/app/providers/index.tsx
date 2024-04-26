import { FC } from 'react';
import { Provider } from 'react-redux';
import { setupStore } from 'shared/store/store';
import { BrowserRouter } from './RouterProvider';

const Providers: FC = () => {
  const store = setupStore();

  return (
    <Provider store={store}>
      <BrowserRouter />
    </Provider>
  );
};

export const AppProvider: FC = () => {
  return <Providers />;
};
