import { Provider } from 'react-redux';
import { setupStore } from 'shared/store';
import Footer from 'widgets/footer';
import './index.scss';

import NewsList from 'widgets/news-list';

const App = () => {
  const store = setupStore();
  //когда подключу роутинг здесь будет нормальный компонент

  return (
    <Provider store={store}>
      <NewsList />
      <Footer />
    </Provider>
  );
};

export default App;
