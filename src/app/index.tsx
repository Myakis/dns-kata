import Product from 'entities/product';
import '../shared/main.css';
import './index.scss';
import { useState } from 'react';

const App = () => {
  const [isHorizontal, setIsHorizontal] = useState<boolean>(true);

  return (
    <>
      <button type='button' onClick={() => setIsHorizontal((prev) => !prev)}>
        ChangeLayout
      </button>
      <Product isHorizontal={isHorizontal} vobler={{ text: 'Big long text for vobler', color: '#000' }} />
    </>
  );
};

export default App;
