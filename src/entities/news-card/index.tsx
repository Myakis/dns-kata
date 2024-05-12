import { FC } from 'react';
import StatComponent from 'entities/news-stat'; /* --- */
import { News } from 'shared/store/slices/news-slice/types';
import { shortingText } from 'shared/util/shortingText';
import randomBanner from './constants/articles-banners';
import { Link } from 'react-router-dom';

import style from './style.module.scss';

const ArticleNewsCard: FC<{ article: News }> = ({ article }) => {
  const renderTagColor = (tag: string): string => {
    const clrs: { [key in string]: string } = {
      new: style['tag--green'],
      commonInfo: style['tag--bruh'],
      exclusives: style['tag--pomodoro'],
      services: style['tag--blue'],
      shops: style['tag--purple'],
      advertising: style['tag--lightBlue'],
    };

    return clrs[tag];
  };

  return (
    <article className={style['card']}>
      <div className={style['card__banner']}>
        <Link to={`${article.id}`}>
          <img src={randomBanner(true)} alt='banner' /> {/* рандомный баннер */}
        </Link>
      </div>

      <div className={style['card__title']}>
        <Link to={`${article.id}`}>{article.name}</Link>
      </div>

      <div className={style['card__discription']}>
        <p>{shortingText(article.description, 250, true)}</p>
      </div>

      <div className={style['card__tags']}>
        <div className={`${style['card__tag']} ${renderTagColor(article.type)}`}>
          <p>{article.type}</p>
        </div>
      </div>

      <div className={style['card__stat']}>
        <StatComponent
          stat={{ date: article.date, commentsCount: article.commentsCount, viewsCount: article.viewsCount }}
        />
      </div>
    </article>
  );
};

export default ArticleNewsCard;
