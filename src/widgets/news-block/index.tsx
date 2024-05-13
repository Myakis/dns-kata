import { FC } from 'react';
import { ReactNode } from 'react';
import { useAppSelector } from 'shared/hooks/redux';

import randomBanner from 'entities/news-card/constants/articles-banners';

import NewsStat from 'entities/news-stat';
import ShareTooltip from 'features/share-tooltip';

import style from './style.module.scss';

function formatText(text: string): ReactNode {
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

const NewsBlock: FC = () => {
  const data = useAppSelector((state) => state.news.articleNews);
  const { name, description, date, viewsCount, commentsCount } = data;

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
