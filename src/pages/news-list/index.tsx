import NewsList from 'widgets/news-list';
import DnsPagination from 'features/pagination';

import style from './style.module.scss';

const NewsListPage: React.FC = () => {
  return (
    <div className={style['NewsListPage']}>
      <h1 className={style['NewsListPage--title']}>Новости</h1>
      <div className={style['NewsListPage__articles']}>
        <NewsList />
      </div>
      <div className={style['NewsListPage__pagination']}>
        <DnsPagination />
      </div>
    </div>
  );
};

export default NewsListPage;
