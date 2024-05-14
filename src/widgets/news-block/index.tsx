import { FC } from 'react';

import randomBanner from 'entities/news-card/constants/articles-banners';
import type { News } from 'pages/news-list/types';
import NewsStat from 'entities/news-stat';
import NewsShare from 'features/share-tooltip';
import style from './style.module.scss';

const NewsBlock: FC<{ article: News }> = ({ article: { name, description, date, viewsCount } }) => {
  function formatText(text: string) {
    return text.split('\n').join('\n\n');
  }

  return (
    <article className={style['news']}>
      <div className={style['news__container']}>
        <img className={style['news--img']} src={`${randomBanner()}`} alt='banner' />
        <div className={style['news__title']}>
          <p>
            <b>{name}</b>
          </p>
          <div className={style['news__description']}>{formatText(description)}</div>
          <div className={style['news__stat']}>
            <NewsStat stat={{ date: date, viewsCount: viewsCount }} />
            <NewsShare />
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsBlock;
