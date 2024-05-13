import { FC } from 'react';
import { useAppSelector } from 'shared/hooks/redux';

import NewsNav from 'features/news-nav';
import NewsCardArticle from 'entities/news-card';

import style from './style.module.scss';

const NewsList: FC = () => {
  const newsData = useAppSelector((state) => state.news.sortedNews);

  const renderNewsList = () => {
    if (newsData) {
      const ArticleList = newsData.map((item) => {
        return <NewsCardArticle key={self.crypto.randomUUID()} newsData={item} />;
      });

      return ArticleList;
    }
    return;
  };

  return (
    <section className={style['list']}>
      <div className={style['list__nav']}>
        <NewsNav />
      </div>
      <div className={style['list__articles']}>{renderNewsList()}</div>
    </section>
  );
};

export default NewsList;
