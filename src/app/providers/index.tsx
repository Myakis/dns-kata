import { FC } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { setupStore } from 'shared/store/store';
import { BrowserRouter } from './RouterProvider';

const Providers: FC = () => {
  const store = setupStore();

  return (
    <StoreProvider store={store}>
      <BrowserRouter />
    </StoreProvider>
  );
};

const AppProvider: FC = () => {
  return <Providers />;
};

export default AppProvider;
