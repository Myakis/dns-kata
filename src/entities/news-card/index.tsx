import { FC } from 'react';
import { Link } from 'react-router-dom';
import NewsStat from 'entities/news-stat'; /* --- */
import { News } from 'shared/store/slices/news-slice/types';
import { shortingText } from 'shared/util/shortingText';
import randomBanner from './constants/articles-banners';
import style from './style.module.scss';

const NewsCardArticle: FC<{ newsData: News }> = ({ newsData }) => {
  const tagColor = (tag: string): string => {
    const colorsBase: { [key in string]: string } = {
      new: style['tag--new'],
      commonInfo: style['tag--commonInfo'],
      exclusives: style['tag--exclusives'],
      services: style['tag--services'],
      shops: style['tag--services'],
      advertising: style['tag--advertising'],
    };

    return colorsBase[tag];
  };

  return (
    <article className={style['card']}>
      <div className={style['card__banner']}>
        <Link to={`${newsData.id}`}>
          <img src={randomBanner(true)} alt='banner' /> {/* рандомный баннер */}
        </Link>
      </div>

      <div className={style['card__title']}>
        <Link to={`${newsData.id}`}>{newsData.name}</Link>
      </div>

      <div className={style['card__discription']}>
        <p>{shortingText(newsData.description, 250, true)}</p>
      </div>

      <div className={style['card__tags']}>
        <div className={`${style['card__tag']} ${tagColor(newsData.type)}`}>
          <p>{newsData.type}</p>
        </div>
      </div>

      <div className={style['card__stat']}>
        <NewsStat
          stat={{ date: newsData.date, commentsCount: newsData.commentsCount, viewsCount: newsData.viewsCount }}
        />
      </div>
    </article>
  );
};

export default NewsCardArticle;
