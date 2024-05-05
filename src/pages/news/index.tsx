import NewsCard from 'widgets/news-block';
import CommentBlock from 'widgets/comment';
import NewsProductsList from 'widgets/news-products';

import style from './style.module.scss';

const Proba = {
  id: 1,
  name: 'Delego vix sequi stipes verto videlicet cedo.',
  description: 'Assumenda torqueo undique expedita.\nDegero arto tero peior depromo coma.',
  type: 'commonInfo',
  date: '2023-09-26T07:14:26.055Z',
  viewsCount: 503,
  commentsCount: 6892,
};

const NewsPage: React.FC = () => {
  return (
    <div className={style['news']}>
      <div className={style['news__path']}>типо хлебные крошки</div>
      <h1 className={style['news--title']}>{Proba.name}</h1>
      <div className={style['news__content']}>
        <section className={style['news__article']}>
          <NewsCard />
        </section>
        <section className={style['news__comment']}>
          <CommentBlock />
        </section>
        <section className={style['news__product']}>
          <NewsProductsList />
        </section>
      </div>
    </div>
  );
};

export default NewsPage;
