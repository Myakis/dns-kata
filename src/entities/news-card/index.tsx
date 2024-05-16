import { FC } from 'react';
import { Link } from 'react-router-dom';

import { News } from 'pages/news-list/types';
import randomBanner from './constants/articles-banners';
import style from './style.module.scss';

const NewsCard: FC<{ news: News }> = ({ news }) => {
  const renderTagColor = (tag: string): string => {
    const colorsBase: { [key in string]: string } = {
      new: style['tag--new'],
      commonInfo: style['tag--commonInfo'],
      exclusives: style['tag--exclusives'],
      services: style['tag--services'],
      shops: style['tag--shops'],
      advertising: style['tag--advertising'],
    };

    return colorsBase[tag];
  };

  const shortingText: (prevText: string, limit: number) => string = (prevText, limit) => {
    const arrd = prevText.split('');
    const newText = arrd.slice(0, arrd.indexOf(' ', limit));

    return `${newText.join('')}...`;
  };

  const handlerLinkScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <article className={style['card']}>
      <div className={style['card__banner']}>
        <Link to={`${news.id}`} onClick={() => handlerLinkScroll()}>
          <img src={randomBanner(true)} alt='banner' />
        </Link>
      </div>

      <div className={style['card__title']}>
        <Link to={`${news.id}`} onClick={() => handlerLinkScroll()}>
          {news.name}
        </Link>
      </div>

      <div className={style['card__discription']}>
        <p>{shortingText(news.description, 200)}</p>
      </div>

      <div className={style['card__tags']}>
        <div className={`${style['card__tag']} ${renderTagColor(news.type)}`}>
          <p>{news.type}</p>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
