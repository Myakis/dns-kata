import NewsCard from 'widgets/news-block';
import CommentBlock from 'widgets/comment';
import NewsProductsList from 'widgets/news-products';

import style from './style.module.scss';

const Proba = {
  id: 1,
  name: 'Facere stips damnatio benigne verto civitas aptus bellum.',
  description:
    'Bellum tametsi porro colligo audentia trepide.\nTotam depromo subnecto victoria celer deripio aqua.\nNulla fugit sonitus quidem sed voveo caecus.\nAegrotatio tergo aurum titulus quisquam comedo.\nCunctatio creo theologus claudeo cunabula alius aegre speculum.\nArx advoco commodo suffoco cruentus.\nSpeciosus cervus beatae certe stillicidium aggredior inventore clarus magni angelus.',
  type: 'commonInfo',
  date: '2023-09-24T00:31:38.697Z',
  viewsCount: 3755,
  commentsCount: 2198,
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
