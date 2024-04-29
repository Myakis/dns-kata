import './reset.scss';
import './index.scss';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from 'pages/layout';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='news' element={<div>News</div>}></Route>
      </Route>
    </Routes>
  );
};

export default App;
