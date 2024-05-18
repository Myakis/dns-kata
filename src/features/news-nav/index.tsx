import { FC } from 'react';
import clsx from 'clsx';

import { filters } from './constants/filters';
import style from './style.module.scss';

interface INewsNav {
  type: string;
  handlerFilter: (filtr: string) => void;
}

const NewsNav: FC<INewsNav> = ({ type, handlerFilter }) => {
  const renderButtons = (filters: { name: string; filter: string }[]) => {
    return filters.map((item) => {
      return (
        <button
          key={self.crypto.randomUUID()}
          type='button'
          onClick={() => handlerFilter(item.filter)}
          className={clsx(style.nav__button, type === item.filter && style['nav__button_active'])}
        >
          <p>{item.name}</p>
        </button>
      );
    });
  };

  const buttons = renderButtons(filters);

  return (
    <div className={style['container__scroll']}>
      <div className={style['container__shadow']}>
        <div className={style['nav']}>{buttons}</div>
      </div>
      <span className={style['nav--shadow']}></span>
    </div>
  );
};

export default NewsNav;
