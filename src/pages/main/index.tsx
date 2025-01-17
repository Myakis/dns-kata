import Product from 'entities/product';
import Layout from 'pages/layout';
import React, { useState } from 'react';
const Main: React.FC = () => {
  const [isHorizontal, setIsHorizontal] = useState<boolean>(true);

  return (
    <Layout pageTitle='Главная' breadcrumbs='Главная'>
      <button type='button' onClick={() => setIsHorizontal((prev) => !prev)}>
        Change Layout
      </button>
      <Product
        data={{
          code: 1455489,
          vobler: { text: 'Купи или сдохнеш', color: 'red' },
          avails: { shops: 0 },
          name: 'Айпхон 100 мегажесткий телефончик для крутых жмыхов, Саня, купи и на районе респектнут!',
          price: { price: 114488, sale: 10 },
          statistic: { rate: 3.4, comments: 32, reviews: 1200 },
        }}
        isHorizontal={isHorizontal}
      />
      <Product
        data={{
          code: 2356489,
          photo:
            'https://c.dns-shop.ru/thumb/st4/fit/200/200/1e543c9fd945b965edd47d66ed1217bb/e71cd6c7689a6546600811edde88d43dda2ab240f1ab2774363f374477e97bc5.png.webp',
          vobler: { text: 'Купи или не купи', color: '#00ff00' },
          avails: { delivery: 'за час', pvz: true, shops: 10 },
          name: 'Ля какой аппарат: бабушке позвони, маме позвони, мама святое',
          price: { price: 45678, sale: 15 },
          statistic: { rate: 4.5, comments: 85, reviews: 12 },
        }}
        isHorizontal={isHorizontal}
      />
    </Layout>
  );
};

export default Main;
