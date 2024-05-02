import { FC, useState } from 'react';
import ProductHorizontal from './product-horizontal';
import ProductVertical from './product-vertical';
import './variables.css';

const Product: FC = () => {
  const [isSimple, setIsSimple] = useState<boolean>(true);

  if (isSimple) {
    return (
      <>
        <button type='button' onClick={() => setIsSimple(false)}>
          ChangeLayout
        </button>
        <ProductHorizontal />
      </>
    );
  }

  return (
    <>
      <button type='button' onClick={() => setIsSimple(true)}>
        ChangeLayout
      </button>
      <ProductVertical />
    </>
  );
};

export default Product;
