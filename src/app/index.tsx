import './index.scss';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from 'pages/layout';
import { Provider } from 'react-redux';
import { setupStore } from 'shared/store';

const App = () => {
  const store = setupStore();
  //когда подключу роутинг здесь будет нормальный компонент

  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='news' element={<div>News</div>}></Route>
        </Route>
      </Routes>
    </Provider>
  );
};

export default App;
