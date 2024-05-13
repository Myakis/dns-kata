import { useAppSelector } from 'shared/hooks/redux';
import NewsNav from 'features/news-nav';
import NewsCardArticle from 'entities/news-card';
import style from './style.module.scss';

const NewsList: React.FC = () => {
  const newsData = useAppSelector((state) => state.news.sortedNews);

  let ArticleList;

  if (newsData) {
    ArticleList = newsData.map((item) => {
      return <NewsCardArticle key={self.crypto.randomUUID()} newsData={item} />;
    });
  }

  return (
    <section className={style['newslist']}>
      <div className={style['newslist__nav']}>
        <NewsNav />
      </div>
      <div className={style['newslist__articles']}>{ArticleList}</div>
    </section>
  );
};

export default NewsList;
