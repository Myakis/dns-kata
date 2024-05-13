import { FC } from 'react';

import { StatTypes } from './types';
import { formatDate } from 'shared/util/formateDate';

import style from './style.module.scss';

const NewsStat: FC<StatTypes> = ({ fullConfig, stat }) => {
  return (
    <>
      <div className={`${style['stat']} ${fullConfig ? style['off-border'] : null}`}>
        <div className={style['stat__container']}>
          <p>{formatDate(stat.date)}</p>
        </div>

        <div className={style['stat__container']}>
          <p className={`${style['stat__icon']} ${style['stat__icon-views']}`}>{stat.viewsCount}</p>
        </div>

        <div className={style['stat__container']}>
          {!fullConfig && (
            <p className={`${style['stat__icon']} ${style['stat__icon-comments']}`}>{stat.commentsCount}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsStat;
