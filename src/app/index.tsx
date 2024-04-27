import './reset.scss';
import './index.scss';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from 'pages/layouts/Layout';
import { getPageTitle } from 'shared/utils';

const App = () => {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <Routes>
      <Route path='/' element={<Layout pageTitle={pageTitle} breadcrumbs={['Главная']} />}>
        <Route path='news' element={<div>News</div>}></Route>
      </Route>
    </Routes>
  );
};

export default App;
