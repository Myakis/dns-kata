import { FC } from 'react';

import { News } from 'pages/news-list/types';
import NewsCardArticle from 'entities/news-card';

import style from './style.module.scss';

const NewsList: FC<{ articleList: News[] }> = ({ articleList }) => {
  console.log(articleList);
  const list = articleList.map((item) => {
    return <NewsCardArticle key={self.crypto.randomUUID()} newsData={item} />;
  });

  return (
    <section>
      <div className={style['list__articles']}>{list}</div>
    </section>
  );
};

export default NewsList;
