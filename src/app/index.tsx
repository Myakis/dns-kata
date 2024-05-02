import { Provider } from 'react-redux';
import { setupStore } from 'shared/store';
import './index.scss';

const App = () => {
  const store = setupStore();
  //когда подключу роутинг здесь будет нормальный компонент

  return <Provider store={store}>hello wrold</Provider>;
};

export default App;
