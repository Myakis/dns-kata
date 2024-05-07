import NewsNav from 'features/news-nav';
import NewsCard from 'entities/news-card';

import style from './style.module.scss';
// import api from './test api';

const NewsList: React.FC = () => {
  return (
    <section className={style['newslist']}>
      <div className={style['newslist__nav']}>
        <NewsNav />
      </div>
      <div className={style['newslist__articles']}>
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </div>
    </section>
  );
};

export default NewsList;
