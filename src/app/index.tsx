import { Provider } from 'react-redux';
import { setupStore } from 'shared/store';
import Footer from 'widgets/footer';
import './index.scss';

import NewsPage from 'pages/news';

const App = () => {
  const store = setupStore();
  //когда подключу роутинг здесь будет нормальный компонент

  return (
    <Provider store={store}>
      <NewsPage />
      <Footer />
    </Provider>
  );
};

export default App;
