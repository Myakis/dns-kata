import { FC } from 'react';

import randomBanner from 'entities/news-card/constants/articles-banners';
import type { News } from 'shared/store/slices/news-slice/types';
import NewsStat from 'entities/news-stat';
import ShareTooltip from 'features/share-tooltip';

import style from './style.module.scss';

const NewsBlock: FC<{ article: News }> = ({ article }) => {
  function formatText(text: string) {
    const arrT = text.split('\n').map((item) => {
      return (
        <div key={self.crypto.randomUUID()}>
          <br />
          <p>{item}</p>
        </div>
      );
    });

    return arrT;
  }

  const { name, description, date, viewsCount, commentsCount } = article;

  return (
    <article className={style['block']}>
      <div className={style['block__container']}>
        <img className={style['block--img']} src={`${randomBanner()}`} alt='banner' />
        <div className={style['block__post']}>
          <p className={style['block__post--title']}>
            <b>{name}</b>
          </p>
          <div className={style['block__description']}>{formatText(description)}</div>
          <div className={style['block__stat']}>
            <NewsStat fullConfig={true} stat={{ date: date, viewsCount: viewsCount, commentsCount: commentsCount }} />
            <ShareTooltip />
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsBlock;
