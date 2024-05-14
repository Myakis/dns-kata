import { FC, useState } from 'react';

import { useGetNewsQuery } from 'shared/api/DNS';
import { News } from './types';
import DnsPagination from 'features/pagination';
import NewsNav from 'features/news-nav';
import style from './style.module.scss';
import NewsCard from 'entities/news-card';
import NewsStat from 'entities/news-stat';

const NewsListPage: FC = () => {
  const { data: news, isLoading } = useGetNewsQuery('');
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const [display, setDisplay] = useState(0);

  const handlePage = (page: number) => {
    setPage(page);
    setDisplay(0);
    document.body.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
    setDisplay((prevDisplay) => prevDisplay + 1);
  };

  const handleFilter = (filtr: string) => {
    setFilter(filtr);
    setPage(1);
    setDisplay(0);
  };

  const sortingNews = (news: News[] | undefined) => {
    if (!news) {
      return [];
    }
    const result = news.filter((item) => filter === 'all' || item.type === filter);

    return result.slice((page - 1) * 9 - display * 9, page * 9);
  };

  const articleList = sortingNews(news).map((item) => {
    return (
      <div key={self.crypto.randomUUID()} className={style['page__article']}>
        <NewsCard news={item} />
        <NewsStat stat={{ date: item.date, viewsCount: item.viewsCount, commentsCount: item.commentsCount }} />
      </div>
    );
  });

  if (isLoading) {
    return <div className={style['page--warning']}>Загружаем...</div>;
  }
  if (!articleList) {
    return <div className={style['page--warning']}>Ошибка, таких новостей у нас нету...</div>;
  }

  return (
    <>
      <div className={style['page']}>
        <h1 className={style['page--title']}>Новости</h1>

        <div className={style['page__content']}>
          <div className={style['page__nav']}>
            <NewsNav type={filter} handlerFilter={(filtr) => handleFilter(filtr)} />
          </div>
          <div className={style['page__articles']}>{articleList}</div>
        </div>

        <div className={style['page__pagination']}>
          <DnsPagination handleShowMore={() => handleShowMore()} handlePage={(page) => handlePage(page)} page={page} />
        </div>
      </div>
    </>
  );
};

export default NewsListPage;
