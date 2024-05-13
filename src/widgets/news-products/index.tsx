import { FC } from 'react';

import style from './style.module.scss';

const NewsProductsList: FC = () => {
  return (
    <div className={style['productList']}>
      <div className={style['productList__header']}>
        <p className={style['productList--title']}>Товары</p>
        <a className={style['productList__link']} href='https://www.dns-shop.ru/#' target='__blank'>
          <p>
            Смотреть все<i></i>
          </p>
        </a>
      </div>
      <div className={style['productList__list']}></div>
    </div>
  );
};

export default NewsProductsList;
