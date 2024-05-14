import { FC } from 'react';

import { filters } from './constants/filters';

import style from './style.module.scss';

const NewsNav: FC<{ type: string; handlerType: (type: string) => void }> = ({ type, handlerType }) => {
  const renderButtons = (filters: { name: string; filter: string }[]) => {
    return filters.map((item) => {
      return (
        <button
          key={self.crypto.randomUUID()}
          type='button'
          onClick={() => {
            eventClick(item.filter);
          }}
          className={`${style['nav__button']} ${type === item.filter && style['nav__button--active']}`}
        >
          <p>{item.name}</p>
        </button>
      );
    });
  };

  const eventClick = (tag: string): void => {
    handlerType(tag);
  };

  return (
    <div className={style['container--scroll']}>
      <div className={style['container--shadow']}>
        <div className={style['nav']}>{renderButtons(filters)}</div>
      </div>
      <span className={style['nav--shadow']}></span>
    </div>
  );
};

export default NewsNav;
