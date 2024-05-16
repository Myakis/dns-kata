import { FC } from 'react';

import style from './style.module.scss';

interface INewsStat {
  stat: {
    date: string;
    viewsCount: number;
    commentsCount?: number | null;
  };
}

const NewsStat: FC<INewsStat> = ({ stat }) => {
  const formatDate = (date: string): string => {
    const newDate: Date = new Date(date);
    const dateArr: number[] = [newDate.getDate(), newDate.getMonth() + 1];

    return `${dateArr.map((item) => (item < 10 ? `0${item}` : item)).join('.')}.${newDate.getFullYear()}`;
  };

  return (
    <>
      <div className={`${style['stat']} ${!stat.commentsCount ? style['off-border'] : null}`}>
        <div className={style['stat__container']}>
          <p>{formatDate(stat.date)}</p>
        </div>

        <div className={style['stat__container']}>
          <p className={`${style['stat__icon']} ${style['stat__icon-views']}`}>{stat.viewsCount}</p>
        </div>

        <div className={style['stat__container']}>
          {stat.commentsCount && (
            <p className={`${style['stat__icon']} ${style['stat__icon-comments']}`}>{stat.commentsCount}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsStat;
