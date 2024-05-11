import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { NewsSlice } from 'shared/store/slices/news-slice';
import style from './style.module.scss';
import { filters } from './constants/filters';

const NewsNav: FC = () => {
  const currentFilter = useAppSelector((state) => state.news.type);
  const dispatch = useAppDispatch();
  const { changeFilter } = NewsSlice.actions;

  const renderButtons = (filters: { name: string; filter: string }[]) => {
    return filters.map((item) => {
      return (
        <button
          key={self.crypto.randomUUID()}
          type='button'
          onClick={() => {
            eventClick(item.filter);
          }}
          className={`${style['nav__button']} ${currentFilter === item.filter && style['nav__button--active']}`}
        >
          <p>{item.name}</p>
        </button>
      );
    });
  };

  const eventClick = (tag: string): void => {
    dispatch(changeFilter(tag));
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
