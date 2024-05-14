import { FC, useState } from 'react';

import { useGetNewsQuery } from 'shared/api/DNS';
import { News } from './types';
import NewsList from 'widgets/news-list';
import DnsPagination from 'features/pagination';
import NewsNav from 'features/news-nav';
import style from './style.module.scss';

const NewsListPage: FC = () => {
  const { data, isLoading } = useGetNewsQuery('');
  const [page, setPage] = useState(1);
  const [type, setType] = useState('all');
  const [display, setDisplay] = useState(9);

  if (isLoading) {
    return <div className={style['page__isLoading']}>Loading...</div>;
  } else if (!data) {
    return <div className={style['page__isLoading']}>Error, please try again later...</div>;
  }

  const sortingNews = (data: News[]) => {
    const res = data.filter((item) => {
      if (type === 'all' || item.type === type) {
        return item;
      }
    });

    return res.slice((page - 1) * 9, (page - 1) * 9 + display);
  };

  const articleList = sortingNews(data);

  return (
    <>
      <div className={style['page']}>
        <h1 className={style['page--title']}>Новости</h1>
        <div className={style['page__articles']}>
          <div className={style['page__nav']}>
            <NewsNav
              type={type}
              handlerType={(type) => {
                setType(type);
              }}
            />
          </div>
          {!articleList && <div className={style['page__isLoading']}>Таких билетов у нас нет</div>}
          {articleList && <NewsList articleList={articleList} />}
        </div>
        <div className={style['page__pagination']}>
          <DnsPagination buttonEvent={() => console.log(1)} paginationEvent={() => console.log(1)} page={page} />
        </div>
      </div>
    </>
  );
};

export default NewsListPage;
