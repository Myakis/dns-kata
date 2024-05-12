import StatComponent from 'entities/news-stat';
import ShareTooltip from 'features/share-tooltip';
import { FC } from 'react';

import style from './style.module.scss';
import { ReactNode } from 'react';
import { useAppSelector } from 'shared/hooks/redux';
import { News } from 'shared/store/slices/news-slice/types';
import randomBanner from 'entities/news-card/constants/articles-banners';

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
    <article className={style['news']}>
      <div className={style['news__container']}>
        <img className={style['news--img']} src={`${randomBanner()}`} alt='banner' />
        <div className={style['news__post']}>
          <p className={style['news__post--title']}>
            <b>{name}</b>
          </p>
          <div className={style['news__description']}>{formatText(description)}</div>
          <div className={style['news__stat']}>
            <StatComponent
              fullConfig={true}
              stat={{ date: date, viewsCount: viewsCount, commentsCount: commentsCount }}
            />
            <ShareTooltip />
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsBlock;
