import { Provider } from 'react-redux';
import { setupStore } from 'shared/store';
import Footer from 'widgets/footer';
import './index.scss';

import NewsCard from 'widgets/news-block';
import CommentBlock from 'widgets/comment';

const App = () => {
  const store = setupStore();
  //когда подключу роутинг здесь будет нормальный компонент

  return (
    <Provider store={store}>
      <NewsCard />
      <CommentBlock />
      <Footer />
    </Provider>
  );
};

export default App;
